module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "media",
    index: function(req, res, next) {
      if (!req.params.id){
        return res.json( jsonErr("not found id") );
      }

      try{

        var mongoose = require('mongoose');
        var id      = mongoose.Types.ObjectId(req.params.id);
        var Media   = mongoose.model( 'Media' );
        
        
        Media.findById(id, function(err, media){
          if (err){
            return res.json( jsonErr("not found file") );
          }

          var img = new Buffer(media.data, 'base64');

          res.writeHead(200, {
            'Content-Type': media.mime_type,
            'Content-Length': img.length
          });
          
          return res.end(img); 

          return res.json( jsonSucc(media) );
        });

      }catch (err){
        showLog(err);
        return res.json( jsonErr("unexpect err") );
      }


    }
  });
}
 

