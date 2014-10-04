module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "home",
    index: function(req, res, next) {
      var public_data = { 
        message: 'Hello there!',
        page_description:"you can override this",
        is_debug:global.is_debug,
        asset_version: global.config.asset_version,
        template_version: global.config.template_version
      };

      showLog("is asset_version", global.asset_version);

      public_data.csrfToken = req.csrfToken() ;
      
      this.render( res,'index', public_data )
    }
  });
}
 

