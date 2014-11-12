var mongoose  = require('mongoose');
var Album     = mongoose.model( 'Album' );

module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "home",
    index: function(req, res, next) {
      var public_data = { 
        message: 'Hello there!',
        is_debug:global.is_debug,
        asset_version: global.config.asset_version,
        template_version: global.config.template_version,
        maximum_file_upload: global.config.maximum_file_upload
      };

      var pre_url  = req.protocol + '://' + req.get('host');
      public_data.full_url =  pre_url + req.originalUrl;

      /*showLog("is asset_version", global.asset_version);*/

      if ( !global.is_debug ){
        public_data.csrfToken = req.csrfToken() ;
      }
      else{
        public_data.csrfToken = "sometest";
      }

      var _this = this;

      if ( req.params.slug  ){
        //Request album
        var slug = req.params.slug;
        showLog("Album slug is "+ slug);

        var filter = {slug:slug};

        Album.find(filter, function(err, albums){
          if (err || !albums || albums.length == 0){
            return _this.render( res,'index', public_data );
          }

          var album = albums[0];

          showLog("description", album.description);
          
          if (album.description && album.description != ""){
            public_data.page_description = album.description;
          }
          
          public_data.page_title = "Listen album - " + album.title;
          public_data.public_album_id = album._id;

          if ( album.feature_id ){
            public_data.page_image =  pre_url + "/media/" + album.feature_id;
          }
          else{
            public_data.page_image = pre_url + "/frontend/images/album.jpg";
          }

          _this.render( res,'index', public_data );

        });

      }
      else{
        this.render( res,'index', public_data );
      }
      
    }
  });
}
 

