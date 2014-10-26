var mongoose = require('mongoose');
var User     = mongoose.model( 'User' );

function validateRegister(body){

  var validator = require('validator');

  if ( !body.email || !validator.isEmail( body.email )){
    return "Your email is invalid";
  }

  if ( !body.user_name || !validator.isLength(body.user_name, 3,30) ){
    return "User name must have length from 3->30";
  }

  if ( !body.password || !validator.isLength(body.password, 6,30) ){
    return "Password have length from 6->30";
  }

  return true;
}

function validateLogin(body){

  var validator = require('validator');

  if ( !body.login_name || !validator.isLength(body.login_name, 3,30) ){
    return "Login name must have length from 3 -> 30";
  }

  if ( !body.password || !validator.isLength(body.password, 6,30) ){
    return "Password must have length from 6 -> 30";
  }

  return true;
}

module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "user",
    index: function(req, res, next) {
      res.json("how");
    },
    login: function(req, res, next) {
      console.log("req.body");
      var body = req.body;

      var validator_error = validateLogin( body );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      var filter = {"$or":[{user_name:body.login_name}, {email:body.login_name} ]}

      User.find(filter, function(err, users){

        if (err){
          return res.json(err);
        }

        if ( users.length == 0){
          return res.json( jsonErr("Not found your login name") );
        }
        var first_user = users[0];
        var hash =  first_user.password;

        var bcrypt = require('bcrypt-nodejs');

        bcrypt.compare( body.password, hash, function(err, result) {
          if (result){
            req.session.user = first_user;
            return res.json( jsonSucc( first_user ) );
          }
          else{
            return res.json( jsonErr("The login name or password does not match, Please try again") );
          }
        });
      });

    },
    register: function(req, res, next) {
      console.log("req.body");
      var body = req.body;
      

      var validator_error = validateRegister( body );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      

      //res.json( jsonSucc( req.body ) );
      
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

    },
    //end register
    info: function(req, res, next) {
      if (req.session.user){
        res.json( jsonSucc( req.session.user ) );
      }
      else{
        res.json( jsonErr("You are not login") );  
      }
      
    },
    logout: function( req, res, next ){
      delete req.session.user;
      res.json("ok");
      
    },
    update: function( req, res, next ){
      var action = req.query.action;
      if (!action){
        return res.json( jsonErr("Expect action param") );
      }
      var body = req.body;
      var current_user = req.session.user;
      
      if ( !current_user ){
        res.json( jsonErr("You are not login") );  
      }

      showLog("body",body);
      showLog("action",action);
      switch( action){
        case 'extra':this.updateExtra(body,current_user, req, res);break;
      }
    },
    updateExtra: function(body,current_user, req, res){
      if (body.theme){
        User.findById(current_user._id, function(err, user){

          if (err){
            return showError("error while update song_id "+ song_id);
          }
          user.theme= body.theme;
          /*showLog("user1",user);
          showLog("theme", body.theme);*/
          user.save();
          showLog("user1",user);
          req.session.user = user;
          return res.json( jsonSucc(user)  );
        });
      }
      else{
        return res.json( jsonSucc(current_user)  );
      }
      
    }
  });
}
 

