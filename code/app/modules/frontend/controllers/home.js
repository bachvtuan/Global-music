module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "home",
    index: function(req, res, next) {
      var public_data = { 
        message: 'Hello there!',
        page_description:"you can override this",
        is_debug:global.is_debug,
        asset_version: global.config.asset_version,
        template_version: global.config.template_version,
        maximum_file_upload: global.config.maximum_file_upload
      };

      /*showLog("is asset_version", global.asset_version);*/

      if ( !global.is_debug ){
        public_data.csrfToken = req.csrfToken() ;
      }
      else{
        public_data.csrfToken = "sometest";
      }
      
      this.render( res,'index', public_data )
    }
  });
}
 

