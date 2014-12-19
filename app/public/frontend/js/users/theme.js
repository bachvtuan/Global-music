
usersApp.factory('$userStyle', function($rootScope, $cookieStore, Users, $location, $window) {

  var bg_list ={
    'default':{
      local:'frontend/images/backgrounds/sunset.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/sunset_zps486cf1d1.jpg'
    },
    'brown-wood':{
      local:'frontend/images/backgrounds/brown-wood.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/brown-wood_zpsbb30d864.jpg'
    },
    yellow:{
      local:'frontend/images/backgrounds/yellow.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/yellow_zps0da7361c.jpg'
    },
    violate:{
      local:'frontend/images/backgrounds/violate.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/yellow_zps0da7361c.jpg'
    },
    sunny:{
      local:'frontend/images/backgrounds/sunny.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/sunny_zps7827daf3.jpg'
    },
    sailfish:{
      local:'frontend/images/backgrounds/sailfish.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/sailfish_zps268c75fc.jpg'
    },
    ocean:{
      local:'frontend/images/backgrounds/ocean.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/ocean_zpsa9f02910.jpg'
    },
    night:{
      local:'frontend/images/backgrounds/night.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/night_zpsb3a6df17.jpg'
    },
    nexus:{
      local:'frontend/images/backgrounds/nexus.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/nexus_zps079a9211.jpg'
    },
    lights:{
      local:'frontend/images/backgrounds/lights.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/lights_zps2e638494.jpg'
    },
    kiwi:{
      local:'frontend/images/backgrounds/kiwi.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/kiwi_zps0e182b28.jpg'
    },
    greenish:{
      local:'frontend/images/backgrounds/greenish.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/greenish_zpsaf4e4548.jpg'
    },
    city:{
      local:'frontend/images/backgrounds/city.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/city_zps184b5d1d.jpg'
    },
    chrome:{
      local:'frontend/images/backgrounds/chrome.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/chrome_zps3c080fc3.jpg'
    },
    blue:{
      local:'frontend/images/backgrounds/blue.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/blue_zpsdfe8c01f.jpg'
    },
    tectile:{
      local:'frontend/images/backgrounds/tectile.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/tectile_zps9e5a5892.png'
    },
    cloth:{
      local:'frontend/images/backgrounds/cloth.jpg',
      server:'http://i1105.photobucket.com/albums/h360/bvtuan/background/cloth_zps443c66b1.png'
    }

  }

  var get_full_background = function(_class){
    var obj = bg_list[_class];
    return "url('{0}')".format( $window.is_debug ? obj.local : obj.server );
  }

  var list = [{
      name:"Default",
      class:"default",
      preview:'frontend/images/backgrounds/thumb-sunset.jpg',
      style:{"background-image": get_full_background('default') }
    },
    {
      name:"Brown wood",
      class:"brown-wood",
      preview:'frontend/images/backgrounds/brown-wood.jpg',
      style:{
        "background-attachment":"initial",
        "background-size":"initial",
        "background-image":get_full_background('brown-wood')
      }
    },
    {
      name:"yellow",
      class:"yellow",
      preview:'frontend/images/backgrounds/thumb-yellow.jpg',
      style:{
        'background-image':get_full_background('yellow')
      }
    },
    {
      name:"violate",
      class:"violate",
      preview:'frontend/images/backgrounds/thumb-violate.jpg',
      style:{
        'background-image':get_full_background('violate')
      }
    },
    {
      name:"sunny",
      class:"sunny",
      preview:'frontend/images/backgrounds/thumb-sunny.jpg',
      style:{
        'background-image':get_full_background('sunny')
      }
    },
    {
      name:"sailfish",
      class:"sailfish",
      preview:'frontend/images/backgrounds/thumb-sailfish.jpg',
      style:{
        'background-image':get_full_background('sailfish')
      }
    },
    {
      name:"ocean",
      class:"ocean",
      preview:'frontend/images/backgrounds/thumb-ocean.jpg',
      style:{
        'background-image':get_full_background('ocean')
      }
    },
    {
      name:"night",
      class:"night",
      preview:'frontend/images/backgrounds/thumb-night.jpg',
      style:{
        'background-image':get_full_background('night')
      }
    },
    {
      name:"nexus",
      class:"nexus",
      preview:'frontend/images/backgrounds/thumb-nexus.jpg',
      style:{
        'background-image':get_full_background('nexus')
      }
    },
    {
      name:"lights",
      class:"lights",
      preview:'frontend/images/backgrounds/thumb-lights.jpg',
      style:{
        'background-image':get_full_background('lights')
      }
    },
    {
      name:"kiwi",
      class:"kiwi",
      preview:'frontend/images/backgrounds/thumb-kiwi.jpg',
      style:{
        'background-image':get_full_background('kiwi')
      }
    },
    {
      name:"greenish",
      class:"greenish",
      preview:'frontend/images/backgrounds/thumb-greenish.jpg',
      style:{
        'background-image':get_full_background('greenish')
      }
    },
    {
      name:"city",
      class:"city",
      preview:'frontend/images/backgrounds/thumb-city.jpg',
      style:{
        'background-image':get_full_background('city')
      }
    },
    {
      name:"chrome",
      class:"chrome",
      preview:'frontend/images/backgrounds/thumb-chrome.jpg',
      style:{
        'background-image':get_full_background('chrome')
      }
    },
    {
      name:"blue",
      class:"blue",
      preview:'frontend/images/backgrounds/thumb-blue.jpg',
      style:{
        'background-image':get_full_background('blue')
      }
    },
    {
      name:"tectile",
      class:"tectile",
      preview:'frontend/images/backgrounds/tectile.png',
      style:{
        'background-image':get_full_background('tectile'),
        'background-size' :'inherit'
      }
    },
    {
      name:"cloth",
      class:"cloth",
      preview:'frontend/images/backgrounds/cloth.png',
      style:{
        'background-image':get_full_background('cloth'),
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
      var user = this.getUser(true);

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
      var style = angular.copy( this.getUserStyle() ) ;

      //Set custom wallpaper from album
      if ( $rootScope.current_album &&  $rootScope.current_album.wallpaper_url ){
        style.style['background-image'] ="url('{0}')".format($rootScope.current_album.wallpaper_url);
      }

      return style.style;
    },
    setBodyStyle:function(){
      $rootScope.body_style = this.getBodyStyle();
    }
  };
});