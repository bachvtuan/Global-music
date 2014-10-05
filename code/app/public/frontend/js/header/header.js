var headerApp = angular.module('headerApp', []);

headerApp.controller('HeaderCtrl', function ($scope, $http,$window, $dialogs) {
  $scope.init = function(current_page){
    $scope.current_page = current_page;
  }
});