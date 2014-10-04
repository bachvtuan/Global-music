
usersApp.controller('RegisterCtrl', 
  function ($scope, $http, $location,$window, Users, $dialogs) {

  $scope.user_name = "bvtuan";
  $scope.email = "bachvtuan@gmail.com";
  $scope.password = "tamthoi";
  $scope.repeat_password = "tamthoi";


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
    Users.post({tail:'register'}, post_data, function(res){
      $scope.processRetrieveData(res,function(data){
        $dialogs.message("success :Please check your email");
      });
    });
  }


});