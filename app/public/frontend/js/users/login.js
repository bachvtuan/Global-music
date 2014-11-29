usersApp.controller('LoginCtrl', 
  function ($scope, $http, $location,$window, Users, $dialogs, $location, $cookieStore, $rootScope, $userStyle, Page) {

  $scope.init = function(){
    $scope.pending_login = false;
    $scope.resetValue();
    Page.setTitle("Login to app");
    Users.get({tail:'info'}, function(res){
      log(res);
      if (res.status == "ok"){
        var user = res.data;
        $scope.redirectDashboard(user);
      }
    });
  }

  $scope.redirectDashboard = function(user){
    $cookieStore.put('user', user);
    $rootScope.user = user;
    $userStyle.setBodyStyle();
    $location.path('/albums');
  }

  $scope.resetValue = function(){
    $scope.login_name = "";
    $scope.password = "";
  }

  $scope.checkValid = function(){
    return  $scope.login_name != "" && $scope.password != "" ;
  }

  $scope.submit = function(){

    var post_data = {
      login_name: $scope.login_name,
      password: $scope.password
    };
    
    $scope.pending_login = true;
    Users.post({tail:'login'}, post_data, function(res){
      $scope.pending_login = false;
      $scope.processRetrieveData(res,function(data){
        
        $dialogs.success("successful :Your login information is accepted");
        $scope.redirectDashboard(data);
      });
    });
  }
});