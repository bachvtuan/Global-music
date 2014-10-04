var playerApp = angular.module('playerApp', []);

playerApp.controller('PlayerCtrl', function ($scope, $http, $location,$window, $dialogs,$timeout) {

  $scope.range_style = {
    width:'80%'
  };

  $scope.song_index = 0;

  $scope.current_audio = null;

  $scope.songs = [ 
    {title:'Rieng mot goc roi',url:'http://mp3.zing.vn/xml/load-song/MjAxMCUyRjExJTJGMjYlMkY3JTJGZSUyRjdlM2I4MjRiY2Q4ZTU0MjU4YzMxNmM4OGYwMjQ1NGQ2Lm1wMyU3QzI'},
    {title:'Le da',url:'http://mp3.zing.vn/xml/load-song/MjAxMCUyRjExJTJGMjYlMkY1JTJGMyUyRjUzM2NiODdlNDQwYzIwNGU2MzcwOTc0YThmNzI5MzBmLm1wMyU3QzI'},
    {title:'Saigon Den do',url:'http://st02.freesocialmusic.com/mp3/2014/09/12/1178050012/141050406314_1679.mp3'},
    {title:'Phan Duyen Hai No',url:'http://data12.chiasenhac.com/downloads/1318/5/1317988-8c2e338c/320/Phai%20Duyen%20Hay%20No%20-%20Hamlet%20Truong%20[MP3%20320kbps].mp3'},
  ];

  $scope.escape = function(str){

    str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    return str;
  };


  $scope.changeVolume = function(event){
    //log(event);
    //return;
    var instance = $(event.target);
    if ( !instance.hasClass('wrap-range') ){
      instance = instance.parent();
    }
    var parentOffset = instance.offset(); 
    var relX = event.pageX - parentOffset.left;
  
    console.log(relX);
    console.log(instance);
    var percent = relX/ instance.width();
    console.log(percent);
    $scope.range_style.width = relX +"%";
    //instance.find('.range').width( relX );
    $scope.audio.setVolume(percent);
    $dialogs.message('Current volume is ' + Math.round( percent * 100 ) + '%' );
  }

  $scope.init = function(){
    $scope.current_song = $scope.songs[ $scope.song_index ];

    $scope.audiojs_setting = {
      callbackError:function(error){
        console.log(error);
        console.clear();
        var msg = $dialogs.error(error);
      },
      callbackPlay:function(){
        console.log("callbackPlay");
        $('#logo img').addClass('animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated');
        });
      },
      trackEnded: function() {
        $scope.$apply(function(){
          $scope.next();
        })
      }
    };  

    $timeout(function(){
      var as = audiojs.createAll($scope.audiojs_setting);
      $scope.audio =  as[0];
      $scope.audio.play();

      //current_audio = as[0];
    },500);

  }

  $scope.prev = function(){
    log("prev");
    $scope.song_index--;
    //$scope.song_index = $scope.song_index < 0 ? 0 :$scope.song_index;
    $scope.current_song = $scope.songs[ $scope.song_index ];
    $scope.removeError();
    $scope.audio.load( $scope.current_song );
    $timeout(function(){
      $scope.audio.play();
    },100);
    
  }
  $scope.removeOld = function(){
    $('.scrubber').remove();
    $('.played').remove();
    $('.duration').remove();
    
  }

  //Just make sure if it happended
  $scope.removeError = function(){
    if ($('.audiojs').hasClass('error')){
      $('.audiojs').removeClass('error');
    }
  }

  $scope.next = function(){
/*          var as = audiojs.createAll($scope.audiojs_setting);
      $scope.audio =  as[0];
      $scope.audio.play();*/
    log($scope.audio);
    $scope.audio.element.pause();
    
    log("next");
    $scope.song_index++;
    $scope.song_index = $scope.song_index >= $scope.songs.length ? 0 :$scope.song_index;
    $scope.current_song = $scope.songs[ $scope.song_index ];
    $scope.removeError();
//    $scope.removeOld();
    //var as = audiojs.createAll($scope.audiojs_setting);
  //  $scope.audio =  as[0];
    $scope.audio.load( $scope.current_song );

    $timeout(function(){
      $scope.audio.play();
    },100);
  }



});