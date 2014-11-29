var linkApp = angular.module('linkApp', []);

linkApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/links', {
      templateUrl:  templateVersion('frontend/js/link/link.html'),
      controller: 'LinkCtrl'
    })
}]);

linkApp.factory('Links', ['$resource','$cookies',
function($resource,$cookies){
  return $resource( 'links/:tail' , {}, {
    query: {method:'GET'},
    post: { method:'POST', headers: {'x-csrf-token': csrf}},
    update: {method:'PUT', headers: {'x-csrf-token': csrf}},
    remove: {method:'DELETE', headers: {'x-csrf-token': csrf}},
  });
}]);


linkApp.controller('LinkCtrl', 
  function ($scope, $http, $location,$window, $dialogs, $rootScope,
    Links,$timeout, $routeParams, Page, fSharedService, $userStyle) {
  

  $scope.init = function(){
    
    $scope.pending_add_link = false;
    $scope.resetValue();
    $scope.albums = null;
    $scope.select_album_id = null;
    $scope.type = $routeParams.type;

    var get_params = {};

    if ( $routeParams.album_id ){
      $scope.share_album_id = $routeParams.album_id;
      get_params.id = $routeParams.album_id;
    }

    $scope.navigation_name ="link"; 
    Page.setTitle("Bookmark your favorite links");

    Links.get(get_params, function(res){
      $scope.processRetrieveData(res,function(data){
        $scope.links = data;
        /*data = _.sortBy( data, function(album){ return album.created_date; });
        
        }*/
      });
    });
  }

  $scope.showAddModel = function(){
    $scope.resetValue();
    $scope.show_link_form = true;

    //$scope.initTag();
  }


  $scope.deleteLink = function(remove_link){
    var title = "Are you sure to delete the link: " + remove_link.title;
    $dialogs.confirm( title, function(){
      Links.remove({id:remove_link._id},function(res){
        $scope.processRetrieveData(res,function(data){
          $scope.removeItemInList( $scope.links, remove_link._id );
        });
      })
    });
  }

  $scope.resetValue = function(){

    $scope.show_link_form          = false;
    $scope.link_title        = "";
    $scope.link_url        = "";
    $scope.is_edit_link      = null;

  }


  $scope.submitLink = function(){

    log("submit link");
    var post_data = {
      title         : $scope.link_title,
      url         : $scope.link_url,
    };
    
    log("post_data", post_data);

    if ( $scope.is_edit_link ){
      $scope.doEditLink(post_data);
    }
    else{
      $scope.doAddLink(post_data);
    }
  }

  $scope.doAddLink = function(post_data){
    $scope.pending_add_link = true;
    Links.post({}, post_data, function(res){
      $scope.pending_add_link = false;
      $scope.processRetrieveData(res,function(data){
        $scope.links.push(data);

        $dialogs.success("You added new link successfully");
        $scope.resetValue();
      });
    });
  }

  $scope.editLink = function(edit_link){
    $scope.show_link_form          = true;
    $scope.is_edit_link      = true;
    $scope.link_title        = edit_link.title;
    $scope.link_url        = edit_link.url;
    $scope.edit_link         = angular.copy(edit_link);
    //$scope.initTag();
  }

  $scope.doEditLink = function(post_data){
    log("post_data in editLink", post_data );
    var copy_link = angular.copy( $scope.edit_link );
    //$scope.is_edit_link = null;
    $scope.pending_edit_link = true;
    
    copy_link = _.extend( copy_link, post_data );
    log("copy_link", copy_link);

    Links.update({}, copy_link, function(res){
      $scope.pending_edit_link = false;
      $scope.processRetrieveData(res,function(data){
        $scope.updateItemInList( $scope.links, data );
        //$rootScope.current_album = data;
        $dialogs.success("The link is updated");
        $scope.resetValue();
      });
    });
  }
  //end doEditLink

});
