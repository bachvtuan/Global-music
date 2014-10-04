var usersApp = angular.module('usersApp', []);

usersApp.factory('Users', ['$resource','$cookies',
function($resource,$cookies){
  return $resource( 'users/:tail' , {}, {
    query: {method:'GET'},
    post: { method:'POST', headers: {'x-csrf-token': csrf}},
    update: {method:'PUT'}
    //, headers: {'x-csrf-token': $cookies.csrftoken , 'UUID':uuid}
  });
}]);


usersApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl:  template_version('frontend/js/users/login.html'),
      controller: 'LoginCtrl'
    }).
    when('/register', {
      templateUrl: template_version('frontend/js/users/register.html'),
      controller: 'RegisterCtrl'
    }).
    when('/logout', {
      //This template is cached before
      templateUrl: template_version('frontend/js/users/logout.html'),
      controller: 'LogoutCtrl'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);