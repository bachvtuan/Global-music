var async     = require('async');
var _     = require('underscore');
var mongoose  = require('mongoose');
var Album     = mongoose.model( 'Album' );
var Media     = mongoose.model( 'Media' );
var Tag       = mongoose.model( 'Tag' );
var Song      = mongoose.model( 'Song' );

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


function getImageDataFromUrl(image_url, callback){
  //shoudl check
  //showLog( body.cover );

  var request = require('request').defaults({ encoding: null });
  var easyimg = require('easyimage');
  var tmp = require('tmp');
  var fs = require('fs');

  tmp.file(function _tempFileCreated(err, path, fd) {
    if (err) throw err;

    console.log("File: ", path);
    console.log("Filedescriptor: ", fd);
    easyimg.thumbnail({
         src:image_url, dst:path,
         width:200, height:200,
         x:0, y:0
      }).then(
      function(image) {
          console.log(image);
          console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
          console.log(image);
         
          fs.readFile(path, 'binary', function(err, original_data){
              
            var base64Image = new Buffer(original_data, 'binary').toString('base64');
            //Remove temp file
            fs.unlink(path);
            
            callback(image,base64Image);

          });
      },
      function (err) {
        console.log(err);
        callback(null);
      }
    );
  });
}


function generalAddAlbum(body, res, req){
  
  if ( body.cover ){

    getImageDataFromUrl( body.cover,function(image,base64_data){

      if ( image == null ){
        return res.json( jsonErr("Album image is error, Please try other") );
      }
      var media_data = {
        user_id: body.user_id,
        data:base64_data,
        mime_type :"image/" + image.type.toLowerCase()
      }
      new Media( media_data ).save( function( err, media, count ){

        body.feature_id = mongoose.Types.ObjectId(media._id);

        new Album( body ).save( function( err, album, count ){
          return res.json( jsonSucc(album) );
        });  

      });  
    });
  }
  else{
    showLog("Added new album withot cover", body);
    new Album( body ).save( function( err, album, count ){
      return res.json( jsonSucc(album) );
    });          
  }
}


function generalDoTags(tags_string, req, callback){
  var tags = tags_string.split(",");
  showLog("tags is ", tags);
  
  var user_id = mongoose.Types.ObjectId(req.session.user._id);
  var filter = {user_id:user_id};
  
  Tag.find(filter, function(err, user_tags){
    showLog("user tags", user_tags);

    var arr_tags = [];
    var callback_loop = function(message){
      if ( typeof message != undefined){
        showLog("tai sao", message);
      }
    }
    async.each(tags, function( tag, callback_loop) {

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
        callback_loop();
      }
      else{
        showLog("Should add new tag");
        Tag( tag_data ).save( function( err, tag, count ){
          if (err){
            callback_loop(err);
          }
          else{
            //tag.id = tag._id;
            arr_tags.push( tag );
            callback_loop();
          }
        });                          
      }
    }, function(err){
        // if any of the file processing produced an error, err would equal that error
        if( err ) {
          // One of the iterations produced an error.
          // All processing will now stop.
          showLog(err);
          console.log('A tag failed to process');
        } else {
          console.log('All tags have been processed successfully');
          callback( arr_tags );
        }
    });
  });
}

function generalUpdateAlbum(current_ablum, update_album,req, res){
  if ( update_album.cover ){

    getImageDataFromUrl( update_album.cover,function(image,base64_data){

      if ( image == null ){
        return res.json( jsonErr("Album image is error, Please try other") );
      }
      var media_data = {
        user_id: current_ablum.user_id,
        data:base64_data,
        mime_type :"image/" + image.type.toLowerCase()
      }
      new Media( media_data ).save( function( err, media, count ){

        current_ablum.feature_id = mongoose.Types.ObjectId(media._id);
        current_ablum.save();
        return res.json(jsonSucc(current_ablum));
      });  
    });
  }
  else{
    current_ablum.save();
    return res.json(jsonSucc(current_ablum));
  }
}

function generalRemoveAlbum(album, res){
  Song.remove({ album_id: album._id }, function(err){
    if ( err ){
      return showLog("err while remove song from delete album");
    }
    album.remove();
    return res.json(jsonSucc("ok"));
  });
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
        
        if ( body.tags && body.tags.trim() != "" ){
          generalDoTags(body.tags, req, function(arr_tags){
            body.tags = arr_tags;
            showLog(body);
            generalAddAlbum(body,res,req);            
          });
        }
        else{
          showLog("Added without using tag");
          delete body.tags;
          generalAddAlbum(body,res,req);
        }

      });
      // end find albums
    },
    //end add
    delete: function(req, res, next) {
      
      //res.json( jsonSucc( req.body ) );
      var user_id = req.session.user._id;
      var album_id = req.query.id;
      showLog(album_id);

      Album.findById(album_id, function(err, album){
        showLog("album", album);
        if ( !album ){
          return res.json( jsonErr("Not found your album for remove") );
        }

        if ( album.user_id != user_id ){
          return res.json( jsonErr("You can't remove this album") );
        }
        if ( album.feature_id ){
          showLog("Remove feature photo");
          Media.findByIdAndRemove(album.feature_id, function(err, media){
            return generalRemoveAlbum( album, res );
            /*album.remove();
            return res.json(jsonSucc("ok"));*/
          }); // executes
        }
        else{
          /*album.remove();
          return res.json(jsonSucc("ok"));*/
          return generalRemoveAlbum( album, res );
        }
        
      });
      
    },
    update: function(req, res, next) {
      var update_album = req.body;
      //res.json( jsonSucc( req.body ) );
      var user_id = req.session.user._id;
      var album_id = update_album._id;
      showLog(album_id);

      Album.findById(album_id, function(err, album){

        
        showLog("album", album);

        if ( !album ){
          return res.json( jsonErr("Not found your album for update") );
        }

        if ( album.user_id != user_id ){
          return res.json( jsonErr("You can't update this album") );
        }
        album.title = update_album.title;

        if ( update_album.tags && update_album.tags.trim() != "" ){
          generalDoTags(update_album.tags, req, function(arr_tags){
            showLog("callback update new tags");
            album.tags = arr_tags;
            //album.save();
            //return res.json(jsonSucc(album));
            generalUpdateAlbum( album, update_album, req, res );
          });
        }
        else{
          console.log("not found tags")
          generalUpdateAlbum( album, update_album, req, res );
        }
        
      });
    }
  });
}
 