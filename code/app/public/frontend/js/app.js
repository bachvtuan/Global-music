var app = angular.module('app', [ 
    'ngRoute',
    'ngCookies',
    'ngResource',
    'ngAnimate',
    'usersApp',
    'albumApp',
    'playerApp',
    'songApp',
    'navigationApp',
    'headerApp'
  ]);

app.run(function($rootScope, $window,$http, $cookies, $dialogs, $location, $templateCache) {
  //Logic given data, consider it's error or normal data
  $templateCache.put('loading.html','<div class="wrap-loader"><p class="inline link"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp; {{text}}</p></div>');

  $rootScope.processRetrieveData = function(res,callback,callback_error){
    if (typeof res['status'] && res['status'] == 'error'){
      var message = res['data'];
    
      if ( angular.isDefined(callback_error) ){
        callback_error( message );
      }
      else{
        $dialogs.error(message);
      }
      
    }
    else{
      callback(res.data);
    }
  }

  $rootScope.mediaLink = function(media_id){
    return "/media/" + media_id;
  }

  $rootScope.addContextClass = function( $event ){
    var parent = $($event.target).parents('.wrap-context');
    log( $event );
    log( $($event.target) );
    if ($( window ).height() - $event.pageY < 420){
      parent.addClass('dropup');
    }
    else{
      parent.removeClass('dropup');
    }        
  }

  $rootScope.convertToSizeString = function( byte_number ){
    var mega_byte = byte_number / 1024/ 1024;
    var return_string = mega_byte * 1000;
    return return_string +"kb";
  }


  //Find item in the list by id and remove it
  $rootScope.removeItemInList = function(list,id){
    for ( var i=0 ; i<  list.length; i++ ){
      if (list[i]._id == id ){
        list.splice(i, 1);
        break;
      }
    }
  }

  //To prevent broken binding, so should be loop all key in data and assign to scope object
  $rootScope.updateScopeObject = function(scope_object, data, remove_old_properties){

    var new_key = [];
    remove_old_properties = angular.isDefined(remove_old_properties) ? remove_old_properties: true;
    for (var key in data){
      new_key.push( key );
      scope_object[key] = data[key];
    }
    if ( !remove_old_properties ){
      return;
    }
    for ( var key in scope_object ){
      if ( new_key.indexOf(key) == -1 ){
        //Should delete this key
        delete scope_object[ key ];
      }
    }
  }

  //Update new item in the list by id given inside the new_item
  $rootScope.updateItemInList = function(list,new_item){
    var updated = false;
    for ( var i=0 ; i<  list.length; i++ ){
      if (list[i]._id == new_item._id ){
        $rootScope.updateScopeObject(list[i],new_item);
        //list[i] = new_item;
        updated = true;
        break;
      }
    }
    return updated;
  }


  $rootScope.templateVersion = function( template_url ){
    return $window.templateVersion( template_url );
  }

  $rootScope.navigation_template = $rootScope.templateVersion('frontend/js/navigation/navigation.html');
  $rootScope.header_template = $rootScope.templateVersion('frontend/js/header/header.html');
  $rootScope.song_template = $rootScope.templateVersion('frontend/js/song/song.html');

});