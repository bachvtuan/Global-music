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
      var filter = {title:body.title};

      return res.json("test");

      Album.find(filter, function(err, albums){

        if (err){
          return res.json(err);
        }

        if ( users.length > 0){
          return res.json( jsonErr("The album is existing, Please try another title")  ); 
        }

        new User( body ).save( function( err, user, count ){
        });
    }
  });
}
 