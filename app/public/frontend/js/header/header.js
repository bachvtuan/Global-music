var headerApp = angular.module('headerApp', []);

headerApp.controller('HeaderCtrl', function ($scope, Users,$rootScope, $cookieStore, $userStyle) {
  $scope.init = function(current_page){
    $scope.current_page = current_page;
    if ( !angular.isDefined( $rootScope.user ) ){
      Users.get({tail:'info'}, function(res){
        log(res);
        if (res.status == "ok"){
          var user = res.data;
          $cookieStore.put('user', user);
          $rootScope.user = user;
          $userStyle.setBodyStyle();
          //$location.path('/albums');
        }
      });      
    }

  }
});