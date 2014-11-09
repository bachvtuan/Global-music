var tmp = require('tmp');
var fs = require('fs');

function convertBase64ToFile(base64_string, extension, dest_path, callback){

  if (dest_path){
    fs.writeFile(dest_path, base64_string, 'base64', function(err) {
      console.log(err);
      callback(dest_path);
    });
  }
  else{
    //Create temp file
    tmp.file(function _tempFileCreated(err, path, fd) {
      if (err) throw err;
      showLog("Path is", path);
      fs.writeFile(path, base64_string, 'base64', function(err) {
        console.log(err);
        callback(path);
      });
    });
  }
}

function resizeImageDataFromUrl(image_url, callback){
  //shoudl check
  //showLog( body.cover );
  var easyimg = require('easyimage');

  tmp.file(function _tempFileCreated(err, path, fd) {
    if (err) throw err;

    console.log("File: ", path);
    console.log("Filedescriptor: ", fd);

    easyimg.thumbnail({
         src:image_url, dst:path,
         width:200, height:200,
         x:0, y:0
      }).then(
      function(image) {
          
          fs.readFile(path, 'binary', function(err, original_data){
              
            var base64Image = new Buffer(original_data, 'binary').toString('base64');
            //Remove temp file
            fs.unlink(path);
            
            callback(image,base64Image);

          });
      },
      function (err) {
        console.log(err);
        callback(null);
      }
    );
  });
}

// base64_string such as data:image/png;base64,iVBORw0KGgoA...
function parseBase64(base64_string){

  var allow_types = {'image/png':'.png','image/jpeg':'.jpg','image/gif':'.gif'}
  var temp = base64_string.split(',')

  var image_type = temp[0].split(';')[0]

  var image_type = image_type.substr(5);

  showLog("image_type",image_type);

  if (!allow_types[image_type]){
    return "Invalid photo extension";
  }

  return {
    image_type:image_type,
    data: temp[1],
    extension:allow_types[image_type]
  }
}


module.exports.convertBase64ToFile = convertBase64ToFile;
module.exports.resizeImageDataFromUrl = resizeImageDataFromUrl;
module.exports.parseBase64 = parseBase64;
