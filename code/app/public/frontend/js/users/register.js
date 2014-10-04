
usersApp.controller('RegisterCtrl', 
  function ($scope, $http, $location,$window, Users, $dialogs) {

  $scope.init = function(){
    $scope.pending_register = false;
    $scope.resetValue();
  }

  $scope.resetValue = function(){
    $scope.user_name = "";
    $scope.email = "";
    $scope.password = "";
    $scope.repeat_password = "";
  }

  $scope.checkValid = function(){
    if ( $scope.user_name == "" )
      return false;

    if ( $scope.email == "" ){
      return false;
    }

    if ( $scope.password == "" || $scope.password != $scope.repeat_password ){
      return false;
    }
    return true;
  }

  $scope.submit = function(){

    log("submit","here");

    var post_data = {
      user_name: $scope.user_name,
      email: $scope.email,
      password: $scope.password
    };
    
    //post_data = $scope.appendCsrf( post_data );
    log("post_data", post_data);
    $scope.pending_register = true;
    Users.post({tail:'register'}, post_data, function(res){
      $scope.pending_register = false;
      $scope.processRetrieveData(res,function(data){
        $scope.user_name = "";
        $scope.resetValue();
        $dialogs.message("success :Please check your email");
      });
    });
  }


});