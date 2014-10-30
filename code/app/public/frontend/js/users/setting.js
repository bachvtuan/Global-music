
usersApp.controller('UserSettingCtrl', 
  function ($scope, $rootScope, $http, $location,$window, Users, $dialogs, $userStyle, Page) {

    $scope.init = function(){

      Page.setTitle("Edit your setting");

      $scope.current_tab = "general";

      $scope.$userStyle = $userStyle;

      $scope.edit_user = angular.copy($userStyle.getUser());
      log('$scope.edit_user 2',$scope.edit_user);

      $scope.list_style = $userStyle.getList();
      $scope.current_style = $userStyle.getUserStyle();
    }

    $scope.setStyle = function(style){
      log(style);
      $scope.current_style = style;
      $userStyle.setUserStyle(style.name);
    }

    $scope.updateBasic = function(){

      $scope.working_basic = true;

      var post_data = angular.copy( $scope.edit_user );

      Users.update({tail:'update',action:'update_basic'}, post_data, function(res){
        $scope.working_basic = false;

        $scope.processRetrieveData(res,function(data){
          $userStyle.setUser(data);
          $dialogs.success("Your basic information have been changed");
        });
      });
    }

    $scope.updatePassword = function(){
      
      if (!$scope.current_password){
        return $dialogs.error("Please input your current password");
      }
      if (!$scope.new_password){
        return $dialogs.error("Please input new password");
      }
      if (!$scope.confirm_password){
        return $dialogs.error("Please confirm password");
      }

      if ( $scope.confirm_password != $scope.new_password ){
        return $dialogs.error("The new password doesn't match with the confirm password");
      }

      if ( $scope.current_password == $scope.new_password ){
       return $dialogs.error("The new password is duplicated with your current password");
      }
      log("Great, let change the password");
      
      var post_data = {
        current_password  : $scope.current_password,
        new_password      : $scope.new_password
      };

      $scope.working_password = true;


      Users.update({tail:'update',action:'change_password'},post_data, function(res){
        $scope.working_password = false;

        $scope.processRetrieveData(res,function(data){
          $scope.current_password = "";
          $scope.new_password = "";
          $scope.confirm_password ="";
          $dialogs.success("Your password have been changed");
        });
      });

    }
});