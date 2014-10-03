module.exports = function( app ){

  var BaseController = require('./controllers/base');

  var HomeController =  require('./controllers/home')(BaseController);
  

  app.get('/', attachDB, function (req, res,next) {
    HomeController.index( req, res, next );
  })

  app.get('/hello.txt', function(req, res){
    res.send('Hello World');
  });

  app.get('/json', function(req, res){
    res.json({title:'Hello World'});
  });
}
