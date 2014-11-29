var path = require('path');
var fs = require('fs');

module.exports = function( filename, callback) {
  var file_path = "./configs/"+ filename;
  fs.readFile( file_path, 'utf-8', function(err,data){
    try{
      config = JSON.parse(data);
      showSucc("Config instance is ");
      showLog(config);
    }
    catch(err){
      return showError("Not found config file or wrong json format");
      //process.exit(1);
    }

    callback(config);

  });
  
}