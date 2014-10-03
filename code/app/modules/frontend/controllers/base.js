var _ = require("underscore");

module.exports = {
  name: "base",
  extend: function(child) {
    return _.extend({}, this, child);
  },
  publicData:function( view_data ){

    var default_data ={
      page_description:config.page_description,
      page_title:config.page_title
    };
    
    var result = _.extend( default_data, view_data );
    showLog("result view is", result);
    return  result;
  },
  test:function(){
    return "Test content";
  },
  render:function(res, view_file ,data ){
    var full_file = 'frontend/' + view_file;
    res.render( full_file , this.publicData( data ) );
  }
}