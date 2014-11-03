
usersApp.controller('UserSettingCtrl', 
  function ($scope, $rootScope, $http, $location,$window, Users, $dialogs, $userStyle, Page) {

    $scope.init = function(){

      $scope.maximum_file_upload = $window.maximum_file_upload;

      Page.setTitle("Edit your setting");

      $scope.current_tab = "general";

      $scope.$userStyle = $userStyle;
      $scope.user = $userStyle.getUser();
      
      $scope.edit_user = angular.copy($scope.user);

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
    //End update password

    $scope.updateCurrentAvatar = function(){
      var extra = $avatar_list.getValue( $scope.edit_user['info:user_name'] );
      var avatar_src =  prependTemplateUrl('users/avatar/') + $scope.edit_user['info:user_name']+'/'+extra;
      //$('#current-avatar').attr('src', avatar_src);
    }



    $scope.readURL = function(input){
      if (input.files && input.files[0]) {
        var filePath = $(input).val();
        

        var reader = new FileReader();
          
        //attach event handlers here...
       
        reader.readAsDataURL(input.files[0]);
        $scope.addEventHandler(reader, 'loadend', function(e) {
          var result = e.target.result;
          
          if ( e.total > $scope.maximum_file_upload ){
            var alert_string = "Please select an image has capacity below "+ $scope.convertToSizeString(maximum_file_upload);
            return $dialogs.error( alert_string ); 
          }
          
          var checking_image_pattern  = 'data:image/';
          if ( result.substr(0, checking_image_pattern.length ) !=  checking_image_pattern ) {
            return $dialogs.error("Please select an image file");
          }


          $('#preview-avatar').attr('src',result);
        });
      }
    }
    $scope.addEventHandler = function(obj, evt, handler) {
      if(obj.addEventListener) {
        // W3C method
        obj.addEventListener(evt, handler, false);
      } else if(obj.attachEvent) {
        // IE method.
        obj.attachEvent('on'+evt, handler);
      } else {
        // Old school method.
        obj['on'+evt] = handler;
      }
    }

    $scope.uploadAvatar = function( ){
      var src = $('#preview-avatar').attr('src');
      if ( !angular.isDefined( src ) ){
        return $dialogs.error( "Please select image file before upload");
      }
      
      $scope.working_avatar = true;
      Users.update({tail:'update',action:'change_avatar'}, {src:src} , function(res){
        $scope.working_avatar = false;
        $scope.processRetrieveData(res,function(data){
          $userStyle.setUser(data);
          $scope.user = data;
          $dialogs.success("Success",'Your avatar is updated');
        });
      });
    }
});