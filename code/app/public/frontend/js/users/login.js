usersApp.controller('LoginCtrl', 
  function ($scope, $http, $location,$window, Users, $dialogs) {

  $scope.init = function(){
    $scope.pending_login = false;
    $scope.resetValue();
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
      });
    });
  }
});