
function validateRegister(body){

  var validator = require('validator');

  if ( !body.email || !validator.isEmail( body.email )){
    return "Invalid email";
  }

  if ( !body.user_name || !validator.isLength(body.user_name, 3,30) ){
    return "user name have length from 3->30";
  }

  if ( !body.password || !validator.isLength(body.password, 6,30) ){
    return "password have length from 6->30";
  }

  return true;
}

module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "user",
    index: function(req, res, next) {
      res.json("how");
    },
    register: function(req, res, next) {
      res.json("login");
    },
    register: function(req, res, next) {
      console.log("req.body");
      var body = req.body;
      var mongoose = require('mongoose');

      var validator_error = validateRegister( body );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      //res.json( jsonSucc( req.body ) );
      var User     = mongoose.model( 'User' );
      var filter = {"$or":[{user_name:body.user_name}, {email:body.email} ]}

      User.find(filter, function(err, users){

        if (err){
          return res.json(err);
        }

        if ( users.length > 0){
          var first_user = users[0];
          if ( first_user.user_name == body.user_name ){
            return res.json( jsonErr("The user name is existing,Please try another")  );
          }
          else{
            return res.json( jsonErr("The email is existing,Please try another")  ); 
          }
        }


        var bcrypt = require('bcrypt-nodejs');
        bcrypt.hash(body.password, null, null, function(err, hash) {
          if (err){
            return res.json( jsonErr( err ) );
          }

          body.password = hash;

          new User( body ).save( function( err, user, count ){
            if (err){
              return res.jsonErr(err);
            }
            //showLog(user);
            res.json(user)
          });

        });

      });

    }
  });
}
 

