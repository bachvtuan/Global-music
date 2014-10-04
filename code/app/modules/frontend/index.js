module.exports = function( app ){

  var BaseController = require('./controllers/base');

  var HomeController =  require('./controllers/home')(BaseController);
  var UserController =  require('./controllers/user')(BaseController);
  

  app.get('/', attachDB, function (req, res,next) {
    HomeController.index( req, res, next );
  })

  app.post('/users/login', attachDB, function (req, res,next) {
    UserController.login( req, res, next );
  });

  app.post('/users/register', attachDB, function (req, res,next) {
    UserController.register( req, res, next );
  });

  app.post('/tuan', attachDB, function (req, res,next) {
    res.json({title:'good'});
  })

  app.get('/hello.txt', function(req, res){
    res.send('Hello World');
  });

  app.get('/json', function(req, res){
    res.json({title:'Hello World'});
  });
}
