var navigationApp = angular.module('navigationApp', []);

navigationApp.controller('NavigationCtrl', 
  function ($scope, $http, $location,$window, $dialogs) {

  $scope.init = function(current_page){
    $scope.current_page = current_page;
  }

});