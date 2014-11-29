var app = angular.module('app');

app.factory('$dialogs', function($rootScope, $window){
  return {
    notify:function(message, type, delay){

      //Default is 10 seconds
      delay = !angular.isDefined(delay) ? 10 : delay;

      var org_delay = $window.alertify.get('notifier','delay');

      $window.alertify.set('notifier','delay', delay);
      $window.alertify.notify( message, type );

      $window.alertify.set('notifier','delay', org_delay);
      
    },
    message:function(message, delay){
      //alertify.message(message);
      return this.notify( message, 'notify', delay );
    },
    success:function(message, delay){
      return this.notify( message, 'success', delay );
    },
    error:function(message, delay){
      return this.notify( message, 'error', delay );
    },
    dismissAll:function(){
      $window.alertify.dismissAll();
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
