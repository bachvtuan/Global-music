var async     = require('async');
var _     = require('underscore');
var mongoose  = require('mongoose');
var Link     = mongoose.model( 'Link' );


function validateLink(body){

  var validator = require('validator');

  if ( !body.title || !validator.isLength(body.title, 3,30) ){
    return "link title must have length from 3 -> 30";
  }

  if ( !body.url || !validator.isURL(body.url) ){
    showLog(body.url);
    return "Please input a valid url for link";
  }

  return true;
}

module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "link",
    index: function(req, res, next) {
      var user_id = req.session.user._id;
      var filter = { user_id: user_id };
      
      Link.find(filter, function(err, links){
        return res.json( jsonSucc(links) );
      });
    },
    add: function(req, res, next){
      var body = req.body;

      var validator_error = validateLink( body );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      
      var user_id = req.session.user._id;
      body.user_id = user_id;
      
      Link( body ).save( function( err, link, count ){
        if (err){
          return showError("Error while add new link");
        }
        return res.json( jsonSucc(link) );
      }); 
    },
    update:function( req, res, next ){

      var action = req.query.action;

    
      var update_link = req.body;
      //res.json( jsonSucc( req.body ) );
      var user_id = req.session.user._id;
      var link_id = update_link._id;
      showLog(link_id);

      var validator_error = validateLink( update_link );

      if ( typeof(validator_error) == "string" ){
        return res.json( jsonErr(validator_error) );
      }

      Link.findById(link_id, function(err, link){

        if (err){
          return showError("error while update link_id "+ link_id);
        }

        if ( !link ){
          return res.json( jsonErr("Not found your link for update") );
        }

        if ( link.user_id != user_id ){
          return res.json( jsonErr("You can't update this link") );
        }

        link.title = update_link.title;
        link.url = update_link.url;
        
        link.save();
        return res.json( jsonSucc(link) );
      });

    },
    delete: function(req, res, next) {
      
      //res.json( jsonSucc( req.body ) );
      var user_id = req.session.user._id;
      var link_id = req.query.id;
      showLog(link_id);

      Link.findById(link_id, function(err, link){

        showLog("link", link);
        if ( !link ){
          return res.json( jsonErr("Not found your link for remove") );
        }

        if ( link.user_id != user_id ){
          return res.json( jsonErr("You can't remove this link") );
        }

        link.remove();
        return res.json( jsonSucc("ok") );
        
      });
      
    },
  });
}
 

