module.exports = function( app ){

  var BaseController = require('./controllers/base');

  var HomeController =  require('./controllers/home')(BaseController);
  var UserController =  require('./controllers/user')(BaseController);
  var AlbumController =  require('./controllers/album')(BaseController);
  var MediaController =  require('./controllers/media')(BaseController);
  var TagController =  require('./controllers/tag')(BaseController);
  var SongController =  require('./controllers/song')(BaseController);
  var LinkController =  require('./controllers/link')(BaseController);

  

  app.get('/', attachDB, function (req, res,next) {
    HomeController.index( req, res, next );
  });

  app.get('/album/:slug', attachDB, function (req, res,next) {
    HomeController.index( req, res, next );
  });


  app.post('/users/login', attachDB, function (req, res,next) {
    UserController.login( req, res, next );
  });

  app.get('/users/active', attachDB, function (req, res,next) {
    UserController.active( req, res, next );
  });

  app.get('/users/reset-password', attachDB, function (req, res,next) {
    UserController.doResetPassword( req, res, next );
  });

  app.post('/users/reset-password', attachDB, function (req, res,next) {
    UserController.resetPassword( req, res, next );
  });
  
  app.post('/users/logout', attachDB, function (req, res,next) {
    UserController.logout( req, res, next );
  });

  app.put('/users/update', checkUser, function (req, res,next) {
    UserController.update( req, res, next );
  });

  app.post('/users/register', attachDB, function (req, res,next) {
    UserController.register( req, res, next );
  });

  app.get('/users/info', attachDB, function (req, res,next) {
    UserController.info( req, res, next );
  });

  /*end user*/

  app.get('/tags', checkUser, function (req, res,next) {
    TagController.index( req, res, next );
  });


  app.get('/media/:id', attachDB, function (req, res,next) {
    MediaController.index( req, res, next );
  });

  app.get('/albums', attachDB, function (req, res,next) {
    AlbumController.index( req, res, next );
  });

  app.get('/albums/search', attachDB, function (req, res,next) {
    AlbumController.search( req, res, next );
  });

  app.post('/albums', checkUser, function (req, res,next) {
    AlbumController.add( req, res, next );
  });

  app.put('/albums', checkUser, function (req, res,next) {
    AlbumController.update( req, res, next );
  });

  app.delete('/albums', checkUser, function (req, res,next) {
    AlbumController.delete( req, res, next );
  });
  /* end album */

  app.get('/songs', attachDB, function (req, res,next) {
    SongController.index(req, res, next );
  });

  app.post('/songs', checkUser, function (req, res,next) {
    SongController.add( req, res, next );
  });

  app.put('/songs', checkUser, function (req, res,next) {
    SongController.update( req, res, next );
  });

  app.delete('/songs', checkUser, function (req, res,next) {
    SongController.delete( req, res, next );
  });

  /* end song */

  app.get('/links', attachDB, function (req, res,next) {
    LinkController.index(req, res, next );
  });

  app.post('/links', checkUser, function (req, res,next) {
    LinkController.add( req, res, next );
  });

  app.put('/links', checkUser, function (req, res,next) {
    LinkController.update( req, res, next );
  });

  app.delete('/links', checkUser, function (req, res,next) {
    LinkController.delete( req, res, next );
  });

  /* end song */

  app.get('/hello.txt', function(req, res){
    res.send('Hello World');
  });

}
