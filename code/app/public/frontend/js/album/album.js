var albumApp = angular.module('albumApp', []);

albumApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/albums', {
      templateUrl:  templateVersion('frontend/js/album/album.html'),
      controller: 'AlbumCtrl'
    });
}]);

albumApp.controller('AlbumCtrl', 
  function ($scope, $http, $location,$window, $dialogs) {

  $scope.init = function(){
  }
});