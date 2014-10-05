var app = angular.module('app', [ 
    'ngRoute',
    'ngCookies',
    'ngResource',
    'ngAnimate',
    'usersApp',
    'dashboardApp',
    'playerApp',
    'songApp'
  ]);

app.run(function($rootScope, $window,$http, $cookies, $dialogs, $location) {
  //Logic given data, consider it's error or normal data
  $rootScope.processRetrieveData = function(res,callback,callback_error){
    if (typeof res['status'] && res['status'] == 'error'){
      var message = res['data'];
    
      if ( angular.isDefined(callback_error) ){
        callback_error( message );
      }
      else{
        $dialogs.error(message);
      }
      
    }
    else{
      callback(res.data);
    }
  }

  $rootScope.templateVersion = function( template_url ){
    return $window.templateVersion( template_url );
  }



});