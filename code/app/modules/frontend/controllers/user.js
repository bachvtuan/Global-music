
var mongoose  = require('mongoose');
var User      = mongoose.model( 'User' );
var sendEmail = require('../../../tools/send_mail').sendEmail;
var image_tool = require('../../../tools/image');
var uuid      = require('node-uuid');
var _         = require('underscore');
var validator = require('validator');

function validateRegister(body){

  if ( !body.email || !validator.isEmail( body.email )){
    return "Your email is invalid";
  }

  if ( !body.user_name || !validator.isLength(body.user_name, 3,30) ){
    return "User name must have length from 3->30";
  }

  var validate_password = validatePassword(body.password);
  
  if (validate_password !== true ){
    return validate_password;
  }

  return true;
}

function validatePassword(password){


  if ( !password || !validator.isLength(password, 6,30) ){
    return "Password have length from 6->30";
  }
  return true;
}

function validateLogin(body, only_login_name){

  var validator = require('validator');

  if ( !body.login_name || !validator.isLength(body.login_name, 3,30) ){
    return "Login name must have length from 3 -> 30";
  }

  if (only_login_name){
    return true;
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
      var _this = this;

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
            first_user = _this.removeSecretFields(first_user.toObject());
            showLog("first_user", first_user);
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

      var _this = this;
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
          body.status   = "unactive";
          body.hash_register = uuid.v4();

          new User( body ).save( function( err, user, count ){
            if (err){
              return res.jsonErr(err);
            }
            req.session.user = user;
            //showLog(user);
            
            var subject = "Active your account at website: "+config.domain;
            var active_link = "http://{0}/users/active?hash={1}&user_id={2}";
            active_link = active_link.format( config.domain, user.hash_register, user._id );

            var html_content  = "<p>Hi, you registered an account on our website at address http://{0}</p>".format(config.domain);
            html_content += "<p>To active your account, Please click  <a href='{0}'>here</a></p>".format(active_link);
            html_content += "<p>If you don't see the link, Please copy below link:</p>";

            html_content += "<p>{0}</p>".format(active_link);
            showLog(html_content);

            user = _this.removeSecretFields(user.toObject());
            res.json(user);

            sendEmail(config.admin_email,user.email,subject,html_content,config);
          });

        });

      });

    },
    removeSecretFields:function(user){
      showLog( typeof(user) );
      
      delete user.hash_register;
      delete user.password;
      delete user.reset_password;
      delete user.hash_reset;

      return user;
    },
    //end register
    info: function(req, res, next) {
      if (req.session.user){
        var user = req.session.user;
        user = this.removeSecretFields(user);
        res.json( jsonSucc( user ) );
      }
      else{
        res.json( jsonErr("You are not login") );  
      }
      
    },
    logout: function( req, res, next ){
      delete req.session.user;
      res.json("ok");
      
    },

    active:function(req, res, next){
      var hash = req.query.hash;
      var user_id = req.query.user_id;
      //http://localhost:3000/users/active?hash=f37dfbbd-b06b-4b23-93a5-d0113bf7598a&user_id=54510f3774760efb1e88a04d
      if (!hash && user_id){
        return res.send("Invalid request");
      }

      var _this = this;

      User.findById(user_id, function(err,user){
        if ( err){
          return res.send("Happended error while active your account");
        }
        if (user.status == "actived"){
          return res.send("Your account has already actived"); 
        }
        if ( user.hash_register != hash){
         return res.send("Invalid hash to active your account");
        }
        user.status = "actived";
        user.save();

        //If user alredy login
        if (req.session.user){
          delete req.session.user;
        }
        
        var return_text = "Your account is actived, Please click <a href='{0}'>here</a> to go to homepage";
        return_text = return_text.format("http://"+config.domain);
        _this.render( res,'well', {text:return_text} )
      });
    },

    update: function( req, res, next ){
      var action = req.query.action;
      if (!action){
        return res.json( jsonErr("Expect action param") );
      }
      var body = req.body;
      var user_id           = req.session.user._id;
      var _this = this;

      //showLog("body",body);
      showLog("action",action);

      User.findById(user_id, function(err,user){
        switch( action){

          case 'extra'            : _this.updateExtra(body,user, req, res);
                                    break;

          case 'change_password'  : _this.changePassword(body,user, req, res);
                                    break;

          case 'update_basic'     : _this.UpdateBasic(body,user, req, res);
                                    break;

          case 'change_avatar'     : _this.changeAvatar(body,user, req, res);
                                    break;
        }
      });

    },
    changeAvatar: function(body,current_user, req, res){

      if ( !body.src ){
        return res.json( jsonErr("Invalid request") );
      }

      var _this = this;

      var src = body.src;

      if ( src.length > global.config.maximum_file_upload ){
        return res.json( jsonErr("Maxium file size") );
      }
      
      var parse_result = image_tool.parseBase64(src);

      if ( typeof(parse_result) == "string" ){
        return res.json( jsonErr(parse_result) );
      }

      if (current_user.avatar_id){
        var Media     = mongoose.model( 'Media' );
        Media.findById( current_user.avatar_id, function(err, media){
          media.remove();
          showLog("removed old media");
        });
      }

      image_tool.convertBase64ToFile( parse_result.data, parse_result.extension, null, function(image_path){
        showLog("Call back", image_path);

        image_tool.resizeImageDataFromUrl( image_path,function(image,base64_data){

          if ( image == null ){
            return res.json( jsonErr("Album image is error, Please try other") );
          }
          var media_data = {
            user_id: body.user_id,
            data:base64_data,
            mime_type :parse_result.image_type
          }

          //Remove temp file
          require('fs').unlink(image_path);

          var Media     = mongoose.model( 'Media' );

          new Media( media_data ).save( function( err, media, count ){
            showLog("media is created");
            current_user.avatar_id = media._id;
            current_user.save();
            var short_user = _this.removeSecretFields(current_user.toObject());
            req.session.user = short_user;
            return res.json( jsonSucc( short_user ) );
          });
        });
      });
    },
    UpdateBasic: function(body,current_user, req, res){

      var user_id           = req.session.user._id;
      var _this = this;

      User.findById(user_id, function(err,user){
        if (body.first_name){
          user.first_name = body.first_name;
        }

        if (body.last_name){
          user.last_name = body.last_name;
        }

        user.save();
        return res.json( jsonSucc( _this.removeSecretFields(user.toObject())) );

      });
    },
    changePassword: function(body,current_user, req, res){
      
      if ( !body.current_password || !body.new_password ){
        return res.json( jsonErr("Invalid request") );
      }

      var current_password  = body.current_password;
      var new_password      = body.new_password;
      var user_id           = req.session.user._id;

      var validate_password =  validatePassword(new_password);

      if ( validate_password !== true){
        return res.json( jsonErr( validate_password ) );
      }

      var _this = this;

      User.findById(user_id, function(err,user){
        //Check current password
        var bcrypt = require('bcrypt-nodejs');
        bcrypt.compare( current_password, user.password, function(err, result) {

          if (!result){
            return res.json( jsonErr("The current password isn't correct") );
          }

          bcrypt.hash(new_password, null, null, function(err, hash) {
            //Update new password
            user.password = hash;
            user.save();

            return res.json( jsonSucc( _this.removeSecretFields(user.toObject())) );
          });
        });
      });
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
      
    },
    //


    //End udpate extra:
    resetPassword:function( req, res, next ){
      console.log("req.body");
      var body = req.body;

      var validator_error = validateLogin( body, true );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      var filter = {"$or":[{user_name:body.login_name}, {email:body.login_name} ]}
      var _this = this;

      User.find(filter, function(err, users){
        if (err){
          return res.json(err);
        }

        if ( users.length == 0){
          return res.json( jsonErr("Not found your login name") );
        }

        var first_user = users[0];

        var bcrypt = require('bcrypt-nodejs');
        var reset_password = "foobar";
        bcrypt.hash(reset_password, null, null, function(err, hash) {
          if (err){
            return res.json( jsonErr( err ) );
          }
          showLog("reset hash", hash);
          first_user.reset_password = hash;
          first_user.hash_reset = uuid.v4();
          first_user.save();

          var subject = "Reset your account at website: " + config.domain;
          var reset_link = "http://{0}/users/reset-password?hash={1}&user_id={2}";
          reset_link = reset_link.format( config.domain, first_user.hash_reset, first_user._id );

          var html_content  = "<p>Hi {0}, Someone have just reseted password on your account on our website  http://{1}, ".format( first_user.user_name, config.domain);
          html_content += "We set new password is <strong>{0}</strong>. If that was you,Please click  <a href='{1}'>here</a> to apply new password, ".format(reset_password, reset_link);
          html_content += "If you don't see the link, Please copy below link:</p>";
          html_content += "<p>{0}</p>".format(reset_link);
          html_content += "<p>If that wasn't you, Just ignore this email</p>"
          showLog(html_content);

          sendEmail(config.admin_email,user.email,subject,html_content,config);

          return res.json( jsonSucc("ok"));

        });
      });
    },
    doResetPassword:function(req, res, next){
      var hash = req.query.hash;
      var user_id = req.query.user_id;
      //http://localhost:3000/users/reset-password?hash=f37dfbbd-b06b-4b23-93a5-d0113bf7598a&user_id=54510f3774760efb1e88a04d
      if (!hash && user_id){
        return res.send("Invalid request");
      }

      var _this = this;

      User.findById(user_id, function(err,user){
        if ( err || !user){
          return res.send("Happended error while reset your account");
        }
        
        if ( user.hash_reset != hash){
         return res.send("Invalid hash to reset your account");
        }
        
        user.password = user.reset_password;
        /*delete user.hash_reset;
        delete user.reset_password;*/
        user.save();
        var return_text = "<p>Your password have been reseted, Please click <a href='{0}'>here</a> to go to homepage</p>";
        return_text = return_text.format("http://"+config.domain);
        return_text += "<p>Remember the new password in your email inbox</p>";
        //return res.send(return_text);
        _this.render( res,'well', {text:return_text} )
      });
    }

  });
}
 

