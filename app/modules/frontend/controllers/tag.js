var mongoose  = require('mongoose');
var Tag       = mongoose.model( 'Tag' );

module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "tag",
    index: function(req, res, next) {
      var user_id = mongoose.Types.ObjectId(req.session.user._id);
      var filter = {user_id:user_id};
      
      Tag.find(filter, function(err, user_tags){
        return res.json( jsonSucc(user_tags));
      });
    }
  });
}
 

