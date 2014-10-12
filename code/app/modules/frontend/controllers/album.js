var async     = require('async');
var _     = require('underscore');
var mongoose  = require('mongoose');
var Album     = mongoose.model( 'Album' );
var Media     = mongoose.model( 'Media' );
var Tag       = mongoose.model( 'Tag' );

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

function generalAddAlbum(body, res, req){
  
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
            console.log(image);
            console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
            console.log(image);
           
            fs.readFile(path, 'binary', function(err, original_data){
                
                var base64Image = new Buffer(original_data, 'binary').toString('base64');
                /*var decodedImage = new Buffer(base64Image, 'base64').toString('binary');
                fs.writeFile('image_decoded.jpg', decodedImage, 'binary', function(err) {});*/
                //showLog(base64Image);

                //Remove temp file
                fs.unlink(path);
                
                var media_data = {
                  user_id: body.user_id,
                  data:base64Image,
                  mime_type :"image/" + image.type.toLowerCase()
                }
                new Media( media_data ).save( function( err, media, count ){

                  body.feature_id = mongoose.Types.ObjectId(media._id);

                  new Album( body ).save( function( err, album, count ){
                    return res.json( jsonSucc(album) );
                  });  

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
    showLog("Added new album withot cover", body);
    new Album( body ).save( function( err, album, count ){
      return res.json( jsonSucc(album) );
    });          
  }
}

module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "album",
    index: function(req, res, next) {
      
      //res.json( jsonSucc( req.body ) );
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


      //res.json( jsonSucc( req.body ) );
      
      var user_id = mongoose.Types.ObjectId(req.session.user._id);
      
      var filter = {title:body.title,user_id:req.session.user._id};
      
      Album.find(filter, function(err, albums){
        
        if (err){
          return res.json(err);
        }

        if ( albums.length > 0){
          return res.json( jsonErr("The album is existing, Please try another title")  ); 
        }

        body.user_id = req.session.user._id;
        /*showLog("before2", user_id);
        showLog("before", req.session.user._id, body);
*/
        //return res.end("weri");

        if ( body.tags && body.tags.trim() != "" ){
          var tags = body.tags.split(",");
          showLog("tags is ", tags);
          
          var user_id = mongoose.Types.ObjectId(req.session.user._id);
          var filter = {user_id:user_id};
          
          Tag.find(filter, function(err, user_tags){
            showLog("user tags", user_tags);

            var arr_tags = [];
            var callback = function(message){
              if ( typeof message != undefined){
                showLog("tai sao", message);
              }
            }
            async.each(tags, function( tag, callback) {

              tag = tag.trim();

              // Perform operation on file here.
              console.log('Processing file ' + tag);
              var tag_data = {
                user_id:user_id,
                name:tag
              }
              var existing_tag = _.find(user_tags, function(tag_item){ return tag_item.name == tag });

              if ( existing_tag ){
                showLog("Found existing");
                arr_tags.push( existing_tag );
                callback();
              }
              else{
                showLog("Should add new tag");
                Tag( tag_data ).save( function( err, tag, count ){
                  if (err){
                    callback(err);
                  }
                  else{
                    arr_tags.push( tag );
                    callback();
                  }
                });                          
              }
            }, function(err){
                // if any of the file processing produced an error, err would equal that error
                if( err ) {
                  // One of the iterations produced an error.
                  // All processing will now stop.
                  showLog(err);
                  console.log('A file failed to process');
                } else {
                  console.log('All files have been processed successfully');
                  body.tags = arr_tags;
                  showLog(body);
                  generalAddAlbum(body,res,req);
                }
            });
          });
        }
        else{
          showLog("Added without using tag");
          delete body.tags;
          generalAddAlbum(body,res,req);
        }

      });
      // end find albums
    }
  });
}
 