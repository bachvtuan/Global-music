var async     = require('async');
var _     = require('underscore');
var mongoose  = require('mongoose');
var Album     = mongoose.model( 'Album' );
var Song     = mongoose.model( 'Song' );


function validateSong(body){

  var validator = require('validator');

  if ( !body.title || !validator.isLength(body.title, 2,30) ){
    return "Song title must have length from 2 -> 30";
  }

  if ( !body.link || !validator.isURL(body.link) ){
    return "Please input a valid url for song";
  }

  if ( body.emotion && !validator.isLength(body.emotion, 10,300)  ){
    return "The emotion must have length from 10 -> 100";
  }

  return true;
}

module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "song",
    index: function(req, res, next) {
      var album_id = req.query.album_id;

      Album.findById(album_id, function(err, album){
        if ( !album ){
          return res.json( jsonErr("not found album") );
        }

        if ( (req.session.user && req.session.user._id == album.user_id) || album.is_public ){
          var filter = {album_id:album_id };
          
          Song.find(filter, function(err, songs){
            return res.json( jsonSucc(songs) );
          });
        }
        else{
          return res.json( jsonErr("This album is private, So you can not show all songs inside") );
        }
      });

    },
    add: function(req, res, next){
      var body = req.body;

      var list_song = body.list;
      var user_id = req.session.user._id;

      if ( !list_song || list_song.length < 1 || !body.album_id ){
        return res.json( jsonErr("Invalid request") );
      }

      for ( var i =0; i < list_song.length; i++ ){

        var song_item = list_song[i];
        var validator_error = validateSong( song_item );

        if ( typeof(validator_error) == "string" ){
          return res.json( jsonErr(validator_error) );
        }
        song_item.album_id = body.album_id;
        song_item.user_id = user_id;
      }

      
      Album.findById(body.album_id, function(err, album){
        if ( !album ){
          return res.json( jsonErr("not found album") );
        }

        if ( album.user_id != user_id ){
          return res.json( jsonErr("You can not add song to this album") );
        }
        showLog(album.user_id,user_id);
        

        var callback_loop = function(message){
          if ( typeof message != undefined){
            showLog("loop message ", message);
          }
        }

        var added_songs = [];

        async.each(list_song, function( song_body, callback_loop) {

          Song( song_body ).save( function( err, song, count ){
            if (err){
              return callback_loop("error while add song ");
            }
            album.song_numbers++;
            
            added_songs.push( song );
            callback_loop();
          });  

        }, function(err){
            // if any of the file processing produced an error, err would equal that error
            if( err ) {
              // One of the iterations produced an error.
              // All processing will now stop.
              showLog(err);
              console.log('list songs failed while add new');
              return res.json( jsonErr(err)  );
            } else {
              //Save count song number
              album.save();
              console.log('All songs are added');
              return res.json( jsonSucc({songs:added_songs, album:album}) );
            }
        });

      });
      
    },
    sortSongs: function(req, res, next){
      var list_song_sort = req.body;
      //res.json( jsonSucc( req.body ) );
      var user_id = req.session.user._id;
      showLog("list_song_sort", list_song_sort);

      if ( !list_song_sort  || list_song_sort.length < 2 ){
        return res.json( jsonErr("Invalid sort request") );
      }


      var callback_loop = function(message){
        if ( typeof message != undefined){
          showLog("loop message ", message);
        }
      }


      async.each(list_song_sort, function( song_sort, callback_loop) {

        var song_id = song_sort._id;
        var position = song_sort.position;



        if ( typeof( position ) != "number" ){
          return callback_loop("Invalid position");
        }

        Song.findById(song_id, function(err, song){

          if (err){
            return callback_loop("error while update "+ song_id);
          }

          if ( !song ){
            return callback_loop("Not found your song for update");
          }

          if ( song.user_id != user_id ){
            return callback_loop("You can't update this song");
          }

          song.position = position;
          song.save();
          callback_loop();

        });

      }, function(err){
          // if any of the file processing produced an error, err would equal that error
          if( err ) {
            // One of the iterations produced an error.
            // All processing will now stop.
            showLog(err);
            console.log('A tag failed to process');
            return res.json( jsonErr(err)  );
          } else {
            console.log('All are updated sort');
            return res.json( jsonSucc('ok')  );
          }
      });
    },
    update:function( req, res, next ){

      var action = req.query.action;

      if ( action == "sort_songs" ){
        return this.sortSongs( req, res, next );
      }

      var update_song = req.body;
      //res.json( jsonSucc( req.body ) );
      var user_id = req.session.user._id;
      var song_id = update_song._id;
      showLog(song_id);

      var validator_error = validateSong( update_song );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      Song.findById(song_id, function(err, song){

        if (err){
          return showError("error while update song_id "+ song_id);
        }

        if ( !song ){
          return res.json( jsonErr("Not found your song for update") );
        }

        if ( song.user_id != user_id ){
          return res.json( jsonErr("You can't update this song") );
        }

        song.title = update_song.title;
        song.link = update_song.link;
        song.emotion = update_song.emotion;
        song.save();
        return res.json( jsonSucc(song) );
      });

    },
    delete: function(req, res, next) {
      
      //res.json( jsonSucc( req.body ) );
      var user_id = req.session.user._id;
      var song_id = req.query.id;
      showLog(song_id);

      Song.findById(song_id, function(err, song){

        showLog("song", song);
        if ( !song ){
          return res.json( jsonErr("Not found your song for remove") );
        }

        if ( song.user_id != user_id ){
          return res.json( jsonErr("You can't remove this song") );
        }

        Album.findById( song.album_id, function(err, album){
          if (!album){
            return res.json( jsonErr("Not found album for this song") );
          }
          album.song_numbers--;
          album.save();
          song.remove();
          return res.json( jsonSucc(album) );
        });
        
      });
      
    },
  });
}
 

