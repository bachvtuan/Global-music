var express = require('express');

var admin = express();

module.exports = function( app ) {
  admin.get('/', function (req, res) {
    //showLog(admin.mountpath); // /admin
    res.send('Admin Homepage');
  })

  admin.get('/json', function (req, res) {
    //showLog(admin.mountpath); // /admin
    res.json({test:'Admin'});
  })

  app.use('/admin', admin); // mount the sub app
}
