
usersApp.controller('ForgotPasswordCtrl', 
  function ($scope, $http, $location,$window, Users, $dialogs) {

  $scope.init = function(){
    $scope.login_name = "";
    /*Users.post({tail:'logout'},{},function(res){
      $scope.processRetrieveData(res,function(data){
        $location.path('/login');
      })
    })*/
  };

  $scope.checkValid = function(){
    return  $.trim($scope.login_name) != "" ;
  }

  $scope.submit = function(){
    log("login_name", $scope.login_name);
    $scope.pending_forgot = true;
    Users.post({tail:'reset-password'},{login_name:$scope.login_name},function(res){
      $scope.pending_forgot = false;
      $scope.processRetrieveData(res,function(data){
        $scope.login_name = "";
        $dialogs.success("Please check your email for reset new password");
      })
    })
  }

});