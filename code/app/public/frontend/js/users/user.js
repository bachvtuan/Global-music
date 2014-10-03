var usersApp = angular.module('usersApp', [
  'ngRoute',
  'ngCookies'
]);

usersApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl:  template_version('frontend/js/users/login.html'),
      controller: 'LoginCtrl'
    }).
/*    when('/register', {
      templateUrl: template_version('static/js/base/users/register.html'),
      controller: 'RegisterCtrl'
    }).
    when('/logout', {
      //This template is cached before
      templateUrl: template_version('static/js/base/users/logout.html'),
      controller: 'LogoutCtrl'
    }).*/
    otherwise({
      redirectTo: '/login'
    });
}]);