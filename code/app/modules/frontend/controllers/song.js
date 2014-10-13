var async     = require('async');
var _     = require('underscore');
var mongoose  = require('mongoose');
var Album     = mongoose.model( 'Album' );
var Song     = mongoose.model( 'Song' );


function validateSong(body){

  var validator = require('validator');

  if ( !body.title || !validator.isLength(body.title, 3,30) ){
    return "Song title must have length from 3 -> 30";
  }

  if ( body.link && !validator.isURL(body.link) ){
    return "Please input a valid url for song";
  }
  return true;
}

module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "song",
    index: function(req, res, next) {
      var filter = {album_id: req.query.album_id};
      
      Song.find(filter, function(err, songs){
        return res.json( jsonSucc(songs) );
      });
    },
    add: function(req, res, next){
      var body = req.body;

      var validator_error = validateSong( body );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      
      var user_id = req.session.user._id;
      
      Album.findById(body.album_id, function(err, album){
        if ( !album ){
          return res.json( jsonErr("not found album") );
        }

        if ( album.user_id != user_id ){
          return res.json( jsonErr("You can not add song to this album") );
        }
        showLog(album.user_id,user_id);
        body.user_id = user_id;

        Song( body ).save( function( err, song, count ){
          return res.json( jsonSucc(song) );
        });          
      });
      
    }
  });
}
 

