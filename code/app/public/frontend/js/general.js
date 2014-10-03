/**
 * Regular Logging
 * @param {String} message 
 */
function log(){
  if (is_debug){
    for (var i=0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
  }
}

/**
 * Warning logging
 * @param {String} message 
 */
function warn(message){
  if (is_debug)
    console.warn(message);
}

function log_table(object){
 if (is_debug)
    console.table(object); 
}
/**
 * Error logging
 * @param {String} message 
 */
function error(message){
  if (is_debug)
    console.error(message);
}

/*
path: path of template 
return: template_version with path is given
ex: 
path  = static/js/base/workspaces/list.html
return static/js/base/workspaces/templates/v1/list.html?v=23
*/
function template_version(path){
  var seperate_arr = path.split("/");
  if (seperate_arr.length > 2){
    //Add "templates" before the end item of array
    seperate_arr.splice(seperate_arr.length - 1,0,"templates",template_version_string);
    path = seperate_arr.join("/");
  }
  return path + timeStampParam();
}

function prependTemplateUrl( prefix_url ){
  return "api/{0}/{1}".format( template_version_string, prefix_url );
}

function timeStamp(){
  return new Date().getTime();
}
function timeStampParam(){
  var addtional_url = "?version=" + asset_version;
  if (typeof window['begin_time_stamp'] === "undefined"){
    window['begin_time_stamp'] = timeStamp();
  }
  return  is_debug ?  addtional_url + "&time="+ window['begin_time_stamp'] : addtional_url;
}

/**
 * Convert key name in the list
 * @param {Array} list :  [{id:1,name:'one',year:2},{id:2,name:'two',year:3}]
 * @param {Array} arr_input_keys : ['name','year']
 * @param {Array} arr_output_keys : ['title','year_old']
 * @return {Array}  [{title:'one',old:2},{id:2,title:'two',old:3}]
 */
function convertKeyProps(list, arr_input_keys, arr_output_keys){
  var arr_return = [];
  
  for (var i=0; i< list.length;i++){
    var obj = {};
    for (var j=0; j < arr_input_keys.length; j++)
      obj[arr_output_keys[j]] = list[i][ arr_input_keys[j] ];
    arr_return.push(obj);
  }
  return arr_return;
}

//Format string
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

/**
 * Function that could be used to round a number to a given decimal points. Returns the answer
 * Arguments :  number - The number that must be rounded
 *        decimal_points - The number of decimal points that should appear in the result
 */
function roundNumber(number,decimal_points) {
  if(!decimal_points) return Math.round(number);
  if(number == 0) {
    var decimals = "";
    for(var i=0;i<decimal_points;i++) decimals += "0";
    return "0."+decimals;
  }

  var exponent = Math.pow(10,decimal_points);
  var num = Math.round((number * exponent)).toString();
  return num.slice(0,-1*decimal_points) + "." + num.slice(-1*decimal_points)
}

 function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};