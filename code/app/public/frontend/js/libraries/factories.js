var app = angular.module('app');

app.factory('$dialogs', function($rootScope, $window){
  return {
    message:function(message){
      alertify.message(message);
    },
    success:function(message){
      alertify.success(message);
    },
    error:function(message){
      alertify.error(message);
    },
    confirm:function(title, callback){
      $window.alertify.confirm( title ).setting('onok', function(){
       $rootScope.$apply(function(){
          callback();
       });
      }); 
    }
  }
});

app.factory('fSharedService', function($rootScope) {
    var sharedService = {};

    sharedService.message = null;

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
});
