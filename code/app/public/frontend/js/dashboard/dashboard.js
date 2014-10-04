var dashboardApp = angular.module('dashboardApp', []);

dashboardApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/dashboard', {
      templateUrl:  templateVersion('frontend/js/dashboard/dashboard.html'),
      controller: 'DashboardCtrl'
    });
}]);

dashboardApp.controller('DashboardCtrl', 
  function ($scope, $http, $location,$window, $dialogs) {

  $scope.init = function(){
  }
});