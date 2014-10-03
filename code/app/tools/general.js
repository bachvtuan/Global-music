var clc = require('cli-color');

function logicLog( value, colour, pre ){
  //is_debug is a global varriable
  if ( !is_debug ){
    if ( typeof( value ) == 'string' ){
      value = pre +": " + value;
    }
    console.log( value );
  }
  else{
    console.log(clc[colour]( value));
  }  
}
function generalLog( arr, type ){

  for (var i=0; i < arr.length; i++) {

    //console[type]( arr[i]);
    switch( type ){
      case 'log':
        console.log( arr[i] );
        break;

      case 'warn':
        logicLog( arr[i], 'yellow', 'WARNING:' );
        break;

      case 'error':
        logicLog( arr[i], 'red', 'ERROR:' );
        break;

      case 'succ':
        logicLog( arr[i], 'green', 'SUCCESS' );
        break;
    }
  }
}

//Display normal log
function showLog(){
  generalLog(arguments,'log');
}

//Display warning log
function showWarn(){
  generalLog(arguments,'warn');
}

//Display error log
function showError(){
  generalLog(arguments,'error');
}

//Display successful log
function showSucc(){
  generalLog(arguments,'succ');
}

global.showLog    = showLog;
global.showWarn   = showWarn;
global.showError  = showError;
global.showSucc   = showSucc;