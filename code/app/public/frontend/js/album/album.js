var albumApp = angular.module('albumApp', []);

albumApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/albums', {
      templateUrl:  templateVersion('frontend/js/album/album.html'),
      controller: 'AlbumCtrl'
    });
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
  function ($scope, $http, $location,$window, $dialogs, Albums,$timeout) {
  
  $scope.mediaLink = function(media_id){
    return "/media/" + media_id;
  }

  $scope.init = function(){
    
    $scope.pending_add_album = false;
    $scope.resetValue();
    $scope.albums = null;
    $scope.current_album_id = null;
    Albums.get({}, function(res){
      $scope.processRetrieveData(res,function(data){
        log("Data", data);
        $scope.albums = data;
        
      });
    });
  }

  $scope.activeAlbum = function(album){
    log("tai sao", album);
    $scope.current_album = album;
    $scope.current_album_id = $scope.current_album._id;
  }

  $scope.showAddModel = function(){
    $scope.show_add = true;
    $scope.initTag();
  }

  $scope.initTag = function(){
    $timeout(function(){
      $('#album-tags').tagsInput({
        width:'auto',
        height:50
      });
    },100);
    
  }

  $scope.removeAlbum = function(){
    log("come to remove album");
    var title = "Are you sure to remove the album: " + $scope.current_album.title;
    alertify.confirm( title ).setting('onok', function(){
     $scope.$apply(function(){
      log("good");
      Albums.remove({id:$scope.current_album._id},function(res){
        $scope.processRetrieveData(res,function(data){
          log("done");
          $scope.removeItemInList( $scope.albums, $scope.current_album._id );
        });
      })
     })
    }); 
  }

  $scope.resetValue = function(){

    $scope.show_add     = false;
    $scope.album_title  = "";
    $scope.album_cover  = "";
    $scope.album_tags   = "";

  }
  $scope.submitAlbum = function(){
    log("submit album");
    var post_data = {
      title:$scope.album_title,
      cover:$scope.album_cover,
      tags: $('#album-tags').val()
    };
    log("post_data", post_data);

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
});