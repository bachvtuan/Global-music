usersApp.factory('$userStyle', function($rootScope, $cookieStore, Users, $location) {
  var list = [{
      name:"Default",
      class:"default",
      preview:'frontend/images/backgrounds/thumb-sunset.jpg',
      style:{"background-image":'url(frontend/images/backgrounds/sunset.jpg)'}
    },
    {
      name:"Brown wood",
      class:"brown-wood",
      preview:'frontend/images/backgrounds/brown-wood.jpg',
      style:{
        "background-attachment":"initial",
        "background-size":"initial",
        "background-image":'url(frontend/images/backgrounds/brown-wood.jpg)'
      }
    },
    {
      name:"yellow",
      class:"yellow",
      preview:'frontend/images/backgrounds/thumb-yellow.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/yellow.jpg)'
      }
    },
    {
      name:"violate",
      class:"violate",
      preview:'frontend/images/backgrounds/thumb-violate.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/violate.jpg)'
      }
    },
    {
      name:"sunny",
      class:"sunny",
      preview:'frontend/images/backgrounds/thumb-sunny.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/sunny.jpg)'
      }
    },
    {
      name:"sailfish",
      class:"sailfish",
      preview:'frontend/images/backgrounds/thumb-sailfish.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/sailfish.jpg)'
      }
    },
    {
      name:"ocean",
      class:"ocean",
      preview:'frontend/images/backgrounds/thumb-ocean.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/ocean.jpg)'
      }
    },
    {
      name:"night",
      class:"night",
      preview:'frontend/images/backgrounds/thumb-night.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/night.jpg)'
      }
    },
    {
      name:"nexus",
      class:"nexus",
      preview:'frontend/images/backgrounds/thumb-nexus.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/nexus.jpg)'
      }
    },
    {
      name:"lights",
      class:"lights",
      preview:'frontend/images/backgrounds/thumb-lights.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/lights.jpg)'
      }
    },
    {
      name:"kiwi",
      class:"kiwi",
      preview:'frontend/images/backgrounds/thumb-kiwi.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/kiwi.jpg)'
      }
    },
    {
      name:"greenish",
      class:"greenish",
      preview:'frontend/images/backgrounds/thumb-greenish.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/greenish.jpg)'
      }
    },
    {
      name:"city",
      class:"city",
      preview:'frontend/images/backgrounds/thumb-city.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/city.jpg)'
      }
    },
    {
      name:"chrome",
      class:"chrome",
      preview:'frontend/images/backgrounds/thumb-chrome.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/chrome.jpg)'
      }
    },
    {
      name:"blue",
      class:"blue",
      preview:'frontend/images/backgrounds/thumb-blue.jpg',
      style:{
        'background-image':'url(frontend/images/backgrounds/blue.jpg)'
      }
    },
    {
      name:"tectile",
      class:"tectile",
      preview:'frontend/images/backgrounds/tectile.png',
      style:{
        'background-image':'url(frontend/images/backgrounds/tectile.png)',
        'background-size' :'inherit'
      }
    },
    {
      name:"cloth",
      class:"cloth",
      preview:'frontend/images/backgrounds/cloth.png',
      style:{
        'background-image':'url(frontend/images/backgrounds/cloth.png)',
        'background-size' :'inherit'
      }
    },
    ];

  return {
    setUser:function(user){
      $rootScope.user = user;
      $cookieStore.put('user',user);
    },
    setUserAlbum:function(user_album){
      $rootScope.user_album = user_album;
    },
    getUser: function(is_redirect){
      var user = $rootScope.user;
      is_redirect = angular.isDefined(is_redirect) ? is_redirect : false;
      if (!user){
        user = $cookieStore.get('user');
      }

      if ( !user ){
        log("not found user information at cookie");
        if (is_redirect){
          $location.path('/login');
        }
        else{
          return null;
        }
        
      }

      return user;
    },
    getList: function(){
      return list;
    },
    get:function( name ){
       return _.find( list , function(style){ return style.name == name; });
    },
    //Get from localstorage
    getUserStyle:function(){
      var user = this.getUser();

      if (user){
        if ( !angular.isDefined(user.theme) ){
          log("Set as default theme to cookie");
          user.theme = "Default";
          $cookieStore.put('user', user);
        }
        var theme =  this.get( user.theme);
        log("theme is", theme,user.theme );
        return theme ? theme: this.get('Default');
      }
      else{
        if ( $rootScope.user_album && $rootScope.user_album.theme ){
          return this.get($rootScope.user_album.theme);
        }
        return this.get('Default');
      }
    },
    setUserStyle:function(style_name){
      var user = this.getUser();

      user['theme'] = style_name;
      
      var current_fac = this;
      
      Users.update({tail:'update',action:'extra'},user, function(res){
        $rootScope.processRetrieveData(res,function(data){
          $rootScope.user = data;
          $cookieStore.put('user', data);
          log("theme is updated");
          //Apply to body style
          current_fac.setBodyStyle();

        });
      });
    },
    getBodyStyle:function(){
      var style = this.getUserStyle();
      return style.style;
    },
    setBodyStyle:function(){
      $rootScope.body_style = this.getBodyStyle();
      log("$rootScope.user",$rootScope.user);
      log("$rootScope.body_style",$rootScope.body_style);
    }
  };
});