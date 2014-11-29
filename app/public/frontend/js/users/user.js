var usersApp = angular.module('usersApp', []);

usersApp.factory('Users', ['$resource','$cookies',
function($resource,$cookies){
  return $resource( 'users/:tail' , {}, {
    query: {method:'GET'},
    post: { method:'POST', headers: {'x-csrf-token': csrf}},
    update: {method:'PUT', headers: {'x-csrf-token': csrf}},
    remove: {method:'DELETE', headers: {'x-csrf-token': csrf}},
    //, headers: {'x-csrf-token': $cookies.csrftoken , 'UUID':uuid}
  });
}]);


usersApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl:  templateVersion('frontend/js/users/login.html'),
      controller: 'LoginCtrl'
    }).
    when('/register', {
      templateUrl: templateVersion('frontend/js/users/register.html'),
      controller: 'RegisterCtrl'
    }).
    when('/forgot-password', {
      templateUrl: templateVersion('frontend/js/users/forgot.html'),
      controller: 'ForgotPasswordCtrl'
    }).
    when('/logout', {
      //This template is cached before
      templateUrl: templateVersion('frontend/js/users/logout.html'),
      controller: 'LogoutCtrl'
    }).
    when('/edit-profile', {
      //This template is cached before
      templateUrl: templateVersion('frontend/js/users/setting.html'),
      controller: 'UserSettingCtrl'
    }).
    
    otherwise({
      redirectTo: '/login'
    });
}]);