
var express = require('express');
var app = express();

//app.engine('jade', require('jade').__express);

//Register views folder
app.set('views', './app/views'); // specify the views directory
//Register template engine
app.set('view engine', 'jade'); // register the template engine

//Allow use static
app.use(express.static('app/public'));
//Allow download file
//app.use(express.static('app/files'));

//Allow get body in the request
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var methodOverride = require('method-override');
app.use(methodOverride());

//production or development
//process.env.NODE_ENV = 'production';

// ----------------------ERROR HANDLING
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//global.app = app;


function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
// ------------------- END ERROR HANDLING

//Default is false
global.is_debug = false;

require('./app/tools/pre_init');
require('./app/tools/general');
var configs = require('./configs');
showLog( process.argv );

//nodejs run.js config_production.js
var config_file = process.argv[2] || "config.json";
showLog("Config file name is " + config_file);
configs( config_file, function(config){
  global.config = config;

  app.set('env', config.env || "development" );
  global.is_debug = config.env == "developement";

  showWarn("debug is ",is_debug );

  if ( is_debug ){
    //Show pretty html on the bebug case
    app.locals.pretty = true;
  }

  connectDB();

});


function connectDB(){
   var MongoClient = require('mongodb').MongoClient,
   format = require('util').format;

  //Connect to database
  MongoClient.connect( config.mongo_uri , function(err, db) {
    if(err) throw err;

    global.ObjectID = require('mongodb').ObjectID;
    global.db = db;

    showSucc("Connected to db with uri " + config.mongo_uri );
    //if you don't wanna use redis, use boot() directly
    connectRedis();

  });

}

function connectRedis(){
  var redis  = require("redis"),
  client = redis.createClient();

  client.on('error', function (err) {
    showError("Redis error", err);
  });

  client.on('connect', function(){
    showSucc("connected to redis");
    //Boot router
    boot();
  });
}

function boot(){

  require('./app/modules/frontend')(app);
  require('./app/modules/backend')(app);
  
  var listen_port = config.port || 3000;
  var server = app.listen(listen_port, function() {
    console.log('Listening on port %d', server.address().port);
  });

  //Custom 404 page
  app.use(function(req, res, next){
    res.status(404).send('Sorry cant find that!')
  });
}