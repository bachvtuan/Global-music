var songApp = angular.module('songApp', []);

songApp.factory('Songs', ['$resource','$cookies',
function($resource,$cookies){
  return $resource( 'songs' , {}, {
    query: {method:'GET'},
    post: { method:'POST', headers: {'x-csrf-token': csrf}},
    update: {method:'PUT'}
    //, headers: {'x-csrf-token': $cookies.csrftoken , 'UUID':uuid}
  });
}]);

songApp.controller('SongCtrl', 
  function ($scope, $http, $location,$window, $dialogs, Songs) {

  $scope.songs = null;
  $scope.loading_songs = false;

  $scope.$watch('current_album_id', function() {
    if ( !$scope.current_album_id ){
      $scope.songs = null;
    }
    else{
      $scope.loading_songs = true;
      Songs.get({album_id:$scope.current_album_id},function(res){
        $scope.loading_songs = false;
        $scope.processRetrieveData(res,function(data){
          $scope.songs = data;
        });
      });
    };

    log("current_album is changed", $scope.current_album_id);
  },true);


  $scope.addSong = function(){
    $scope.show_add_song = true;
  }

  $scope.resetValue = function(){
    $scope.song_title = "";
    $scope.song_link = "";
  }

  $scope.submitSong = function(){
    log("song title", $scope.song_title);
    log("song title", $scope.song_link);
    log("submit album");
    var post_data = {
      title:$scope.song_title,
      link:$scope.song_link,
      album_id: $scope.current_album_id
    };
    log("post_data", post_data);

    $scope.pending_add_song = true;
    Songs.post({}, post_data, function(res){
      $scope.pending_add_song = false;
      $scope.processRetrieveData(res,function(data){
        $scope.songs.push(data);
        $dialogs.success("You added new song");
        $scope.resetValue();
      });
    });
  }
  //End submit song

  $scope.editSong = function(song){
    log("editSong song", song);
  }

  $scope.deleteSong = function(song){
    log("delete song", song);
  }

});