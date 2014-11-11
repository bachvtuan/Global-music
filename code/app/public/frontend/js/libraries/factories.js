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

app.factory('Page', function($rootScope) {
   return {
     title: function() { return $rootScope.page_title; },
     setTitle: function(newTitle) { $rootScope.page_title = newTitle }
   };
});

app.factory('Net', function($q) {
  return {

    isImage: function(src) {

      var deferred = $q.defer();

      var image = new Image();

      image.onerror = function() {
        deferred.resolve(false);
      };

      image.onload = function() {
        deferred.resolve(true);
      };

      image.src = src;

      return deferred.promise;
    }
  };
});
