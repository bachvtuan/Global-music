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
  function ($scope, $http, $location,$window, $dialogs, Albums) {

  $scope.init = function(){
    $scope.show_add = false;
    $scope.pending_add_album = false;
    $scope.album_title = "";
    $scope.album_cover = "";
    //$('#myModal').modal(options)
  }
  $scope.submitAlbum = function(){
    log("submit album");
    var post_data = {
      title:$scope.album_title,
      cover:$scope.album_cover
    };
    log("post_data", post_data);

    $scope.pending_add_album = true;
    Albums.post({}, post_data, function(res){
      $scope.pending_add_album = false;
      $scope.processRetrieveData(res,function(data){
      });
    });
  }
});