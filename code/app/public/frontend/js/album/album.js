var albumApp = angular.module('albumApp', []);

albumApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/albums', {
      templateUrl:  templateVersion('frontend/js/album/album.html'),
      controller: 'AlbumCtrl'
    }).
    when('/albums/:type', {
      templateUrl:  templateVersion('frontend/js/album/album.html'),
      controller: 'AlbumCtrl'
    }).
    when('/album/:album_id', {
      templateUrl:  templateVersion('frontend/js/album/album.html'),
      controller: 'AlbumCtrl'
    })
}]);

albumApp.factory('Albums', ['$resource','$cookies',
function($resource,$cookies){
  return $resource( 'albums' , {}, {
    query: {method:'GET'},
    post: { method:'POST', headers: {'x-csrf-token': csrf}},
    update: {method:'PUT'}
    //, headers: {'x-csrf-token': $cookies.csrftoken , 'UUID':uuid}
  });
}]);


albumApp.controller('AlbumCtrl', 
  function ($scope, $http, $location,$window, $dialogs, 
    Albums,$timeout, $routeParams, Page, fSharedService) {
  

  $scope.init = function(){
    
    $scope.pending_add_album = false;
    $scope.resetValue();
    $scope.albums = null;
    $scope.current_album_id = null;
    $scope.type = $routeParams.type;
    if ($scope.type == "public"){
      $scope.filter_album = "!";
      $scope.navigation_name ="public_album";
    }
    else{
     $scope.navigation_name ="album"; 
    }
    Page.setTitle("Browse album");

    
    var get_params = {};

    if ( $routeParams.album_id ){
      $scope.share_album_id = $routeParams.album_id;
      get_params.id = $routeParams.album_id;
    }

    Albums.get(get_params, function(res){
      $scope.processRetrieveData(res,function(data){
        log("Data", data);
        $scope.albums = data;
        if ( $routeParams.album_id ){
          //Active share album
          $scope.activeAlbum($scope.albums[0]);
        }
      });
    });
  }

 $scope.$on('handleBroadcast', function() {

    log("listen broad cast on player page");

    var broadcast_data = fSharedService.message.data;
    switch(fSharedService.message.cmd){

      case 'load-songs-done':
        var album_id = broadcast_data.album_id;
        if ( angular.isDefined($scope.share_album_id)  && $scope.share_album_id ==album_id){
          log("let play it");
          //Prevent auto play later
          delete $scope.share_album_id;
          //Send to player controler
          fSharedService.prepForBroadcast({cmd:'play-songs',data: broadcast_data });
        }
        break;
    }
  });

  $scope.activeAlbum = function(album){
    $scope.current_album = album;
    $scope.current_album_id = $scope.current_album._id;
  }

  $scope.showAddModel = function(){
    $scope.resetValue();
    $scope.show_form = true;
    //$scope.initTag();
  }

  $scope.initTag = function(){
    $timeout(function(){
      $('#album-tags').tagsInput({
        width:'auto',
        height:50
      });
    },100);
    
  }

  $scope.removeAlbum = function(remove_album){
    var title = "Are you sure to remove the album: " + remove_album.title;
    $dialogs.confirm( title, function(){
      Albums.remove({id:remove_album._id},function(res){
        $scope.processRetrieveData(res,function(data){
          $scope.removeItemInList( $scope.albums, remove_album._id );
          if ( $scope.current_album && $scope.current_album._id == remove_album._id ){
            $scope.current_album_id = null;
            $scope.current_album = null;            
          }
        });
      })
    });
  }

  $scope.shareAlbum = function(album){
    var title = "After you share this album, other user can browse this album and listen to, Do you want to continue ?";
    $dialogs.confirm( title, function(){
      Albums.update({action:"share"}, album,function(res){
        $scope.processRetrieveData(res,function(data){
          $dialogs.success("Your album is shared to public, You can unshare it whenever you want")
          $scope.updateItemInList( $scope.albums, data );
        });
      });
    });  
  }

  $scope.unShareAlbum = function(album){
    Albums.update({action:"unshare"}, album,function(res){
      $scope.processRetrieveData(res,function(data){
        $scope.updateItemInList( $scope.albums, data );
        $dialogs.success("Your album is unshared")
      });
    });
  }

  $scope.showPublicLink = function(album){
    log("tasi sao");
    $scope.show_public_link = true;
    log($scope.show_public_link);
    $scope.share_album = album;
    $scope.public_link = document.location.origin +"#/album/"+album._id;
  }

  $scope.resetValue = function(){

    $scope.show_form      = false;
    $scope.album_title    = "";
    $scope.album_cover    = "";
    $scope.album_tags     = "";
    $scope.is_edit_album  = null;

  }
  $scope.submitAlbum = function(){


    log("submit album");
    var post_data = {
      title:$scope.album_title,
      cover:$scope.album_cover,
      tags: $('#album-tags').val()
    };
    log("post_data", post_data);

    if ( $scope.is_edit_album ){
      $scope.doEditAlbum(post_data);
    }
    else{
      $scope.doAddAlbum(post_data);
    }
  }

  $scope.doAddAlbum = function(post_data){
    $scope.pending_add_album = true;
    Albums.post({}, post_data, function(res){
      $scope.pending_add_album = false;
      $scope.processRetrieveData(res,function(data){
        $scope.albums.push(data);
        $dialogs.success("You added new album");
        $scope.resetValue();
      });
    });
  }

  $scope.editAlbum = function(edit_album){
    $scope.show_form = true;
    $scope.is_edit_album = true;
    $scope.album_title = edit_album.title;
    $scope.edit_album = angular.copy(edit_album);
    $scope.album_tags =  _.map( edit_album.tags, function(tag){ return tag.name });
    log( $scope.album_tags );
    //$scope.initTag();
  }
  $scope.doEditAlbum = function(post_data){
    log("post_data in editAlbum", post_data );
    var copy_album = angular.copy( $scope.edit_album );
    //$scope.is_edit_album = null;
    $scope.pending_edit_album = true;
    
    copy_album = _.extend( copy_album, post_data );
    log("copy_album", copy_album);

    Albums.update({}, copy_album, function(res){
      $scope.pending_edit_album = false;
      $scope.processRetrieveData(res,function(data){
        $scope.updateItemInList( $scope.albums, data );
        //$scope.current_album = data;
        $dialogs.success("The album is updated");
        log( $scope.albums );
        $scope.resetValue();
      });
    });
  }
});