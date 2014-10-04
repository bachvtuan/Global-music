var app = angular.module('app');

app.factory('$dialogs', function(){
  return {
    message:function(message){
      alertify.message(message);
    },
    success:function(message){
      alertify.success(message);
    },
    error:function(message){
      alertify.error(message);
    }
  }
});
