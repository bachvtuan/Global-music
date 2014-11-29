
usersApp.controller('LogoutCtrl', 
  function ($scope, $http, $location,$window, Users, $dialogs) {

  $scope.init = function(){
    Users.post({tail:'logout'},{},function(res){
      $scope.processRetrieveData(res,function(data){
        $location.path('/login');
      })
    })
  };

});