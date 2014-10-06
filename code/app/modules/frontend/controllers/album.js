function validateAlbum(body){

  var validator = require('validator');

  if ( !body.title || !validator.isLength(body.title, 3,30) ){
    return "Album title must have length from 3 -> 30";
  }

  if ( body.cover && !validator.isURL(body.cover) ){
    return "Please input a valid url for album cover";
  }
  return true;
}


module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "album",
    index: function(req, res, next) {
      var mongoose = require('mongoose');

      //res.json( jsonSucc( req.body ) );
      var Album     = mongoose.model( 'Album' );
      var user_id = mongoose.Types.ObjectId(req.session.user._id);
      var filter = {user_id:user_id};
      
      Album.find(filter, function(err, albums){
        return res.json( jsonSucc(albums) );
      });
    },
    add:function(req, res, next) {
      var body = req.body;

      var validator_error = validateAlbum( body );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      var mongoose = require('mongoose');

      //res.json( jsonSucc( req.body ) );
      var Album     = mongoose.model( 'Album' );
      var user_id = mongoose.Types.ObjectId(req.session.user._id);
      var filter = {title:body.title,user_id:user_id};
      
      Album.find(filter, function(err, albums){

        if (err){
          return res.json(err);
        }

        if ( albums.length > 0){
          return res.json( jsonErr("The album is existing, Please try another title")  ); 
        }

        body.user_id = user_id;

        if ( body.cover ){
          //shoudl check
          showLog( body.cover );

          var request = require('request').defaults({ encoding: null });
          var easyimg = require('easyimage');
          var tmp = require('tmp');
          var fs = require('fs');

          tmp.file(function _tempFileCreated(err, path, fd) {
            if (err) throw err;

            console.log("File: ", path);
            console.log("Filedescriptor: ", fd);
            easyimg.thumbnail({
                 src:body.cover, dst:path,
                 width:200, height:200,
                 x:0, y:0
              }).then(
              function(image) {
                 console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                 console.log(image);
                 
                  fs.readFile(path, 'binary', function(err, original_data){
                      
                      var base64Image = new Buffer(original_data, 'binary').toString('base64');
                      /*var decodedImage = new Buffer(base64Image, 'base64').toString('binary');
                      fs.writeFile('image_decoded.jpg', decodedImage, 'binary', function(err) {});*/
                      //showLog(base64Image);

                      //Remove temp file
                      fs.unlink(path);
                      body.cover = base64Image;
                      new Album( body ).save( function( err, album, count ){
                        return res.json( jsonSucc(album) );
                      });  
                  });
              },
              function (err) {
                console.log(err);
              }
            );
          });
        }
        else{
          new Album( body ).save( function( err, album, count ){
            return res.json( jsonSucc(album) );
          });          
        }


      });
    }
  });
}
 