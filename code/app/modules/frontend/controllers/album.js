var async     = require('async');
var _         = require('underscore');
var mongoose  = require('mongoose');
var slug      = require('slug')
var Album     = mongoose.model( 'Album' );
var Media     = mongoose.model( 'Media' );
var Tag       = mongoose.model( 'Tag' );
var Song      = mongoose.model( 'Song' );

var image_tool  = require('../../../tools/image');
var string_tool = require('../../../tools/string');

function validateAlbum(body){

  var validator = require('validator');

  if ( !body.title || !validator.isLength(body.title, 3,30) ){
    return "Album title must have length from 3 -> 30";
  }

  if ( body.cover && !validator.isURL(body.cover) ){
    return "Please input a valid url for album cover";
  }

  if ( body.description && !validator.isLength(body.description, 10,100) ){
    return "Album description must have length from 10 -> 100";
  }

  return true;
}


function generalAddAlbum(body, res, req){
  
  body.search_title = string_tool.removeUnicode( body.title );
  body.slug = slug( body.search_title );

  if ( body.cover ){

    image_tool.resizeImageDataFromUrl( body.cover,function(image,base64_data){

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
        name:tag,
        search_title: string_tool.removeUnicode( tag )
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

  current_ablum.search_title = string_tool.removeUnicode( update_album.title );
  current_ablum.slug = slug( current_ablum.search_title);

  if ( update_album.cover ){

    image_tool.resizeImageDataFromUrl( update_album.cover,function(image,base64_data){

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
      var album_id = req.query.id;

      if (album_id){
        Album.findById(album_id, function(err, album){
          if ( !album ){
            return res.json( jsonErr("not found album") );
          }
          //Own user and public state
          if ( (req.session.user && req.session.user._id == album.user_id) || album.is_public ){
            //Attach user info to album
            album = album.toObject();
            if ( !req.session.user || req.session.user._id != album.user_id){
              var User      = mongoose.model( 'User' );
              User.findById(album.user_id, function(err,user_album){
                user_album = user_album.toObject();
                album.user = {};
                if (user_album.theme){
                  album.user.theme = user_album.theme;
                }
                if (user_album.avatar_id){
                  album.user.avatar_id = user_album.avatar_id;
                }
                return res.json( jsonSucc([album]) );
              });
            }
            else{
              //Owner user
              return res.json( jsonSucc([album]) );
            }
            
          }
          else{
            return res.json( jsonErr("This album is private") );
          }
        });
      }else{
        checkUser(req, res, function(){
          var user_id = mongoose.Types.ObjectId(req.session.user._id);
          var filter = {user_id:user_id};
          
          Album.find(filter, function(err, albums){
            return res.json( jsonSucc(albums) );
          });        
        });
      }
    },


    add:function(req, res, next) {
      var body = req.body;

      var validator_error = validateAlbum( body );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      //res.json( jsonSucc( req.body ) );

      if (req.session.user.status != "actived"){
        return res.json( jsonErr("Please active your account before add new album") );
      }
      
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
        body.user_name = req.session.user.user_name;
        
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

      var action = req.query.action;

      showLog(album_id,action);



      Album.findById(album_id, function(err, album){

        
        showLog("album", album);

        if ( !album ){
          return res.json( jsonErr("Not found your album for update") );
        }

        if ( album.user_id != user_id ){
          return res.json( jsonErr("You can't update this album") );
        }

        if ( action && action == "share"){
          showWarn("user shared this album "+album.title);
          album.is_public = true;
          album.save();
          return res.json( jsonSucc(album) );
        }

        if ( action && action == "unshare"){
          showWarn("user unshared this album "+album.title);
          album.is_public = false;
          album.save();
          return res.json( jsonSucc(album) );
        }


        album.title       = update_album.title;
        album.description = update_album.description;

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
    },
    //End update

    search:function(req, res, next) {
      showLog(req.query);
      var query = req.query;
      var user_name = query.user;
      //Only search public album
      var search_query = {is_public:true};
      if (query.user){
        search_query.user_name = query.user;
      }
      if (query.keyword){
        //search_query.title = {'$regex': query.keyword};
        //search_query.title = {'$search': query.keyword};
        search_query.search_title = {'$regex': new RegExp(query.keyword, 'i')};
         
      }
      if (query.tag){
        query.tag = string_tool.removeUnicode( query.tag );
        search_query.tags  = { 
          $elemMatch : 
           { 
             search_title : {'$regex': new RegExp(query.tag, 'i')}
           } 
        } 
      }
      showLog("search_query",search_query);
      Album.find(search_query, function (err, albums) {
        return res.json( jsonSucc(albums) );
      });
      
    }
    //End search
  });
}
 