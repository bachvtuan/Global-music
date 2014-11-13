var songApp = angular.module('songApp', ['html5.sortable']);

songApp.factory('Songs', ['$resource','$cookies',
function($resource,$cookies){
  return $resource( 'songs' , {}, {
    query: {method:'GET'},
    post: { method:'POST', headers: {'x-csrf-token': csrf}},
    update: {method:'PUT', headers: {'x-csrf-token': csrf}},
    remove: {method:'DELETE', headers: {'x-csrf-token': csrf}},
  });
}]);

songApp.controller('SongCtrl', 
  function ($scope, $http, $location,$window, $dialogs, Songs, fSharedService, $timeout) {

  $scope.songs = null;
  $scope.loading_songs = false;
  $scope.song_predicate= ['-position'];

  $scope.$watch('current_album_id', function() {
    if ( !$scope.current_album_id ){
      $scope.songs = null;
    }
    else{

      $scope.loading_songs = true;

      Songs.get({album_id:$scope.current_album_id},function(res){
        
        $scope.loading_songs = false;
        
        $scope.processRetrieveData(res,function(data){
          data = _.sortBy( data, function(song){ return song.position; });
          $scope.songs = data;
          //Tell to album controller
          var broadcast_data = {
            album_id:$scope.current_album_id,
            index: 0,
            songs: angular.copy( $scope.songs )
          }
          if ( $scope.current_album.feature_id ){
            broadcast_data.album_cover_id = $scope.current_album.feature_id;
          }
          fSharedService.prepForBroadcast({cmd:'load-songs-done',data: broadcast_data });
        });
      });
    };

    log("current_album is changed", $scope.current_album_id);
  },true);


  $scope.addSong = function(){
    $scope.resetValue();
    $scope.show_song_form = true;
  }

  $scope.resetValue = function(){
    $scope.song_title       = "";
    $scope.song_link        = "";
    $scope.song_emotion = "";
    $scope.is_edit_song     = false;
  }

  $scope.sortable_songs = {
    handle:'.handle',
    stop:function(list,dropped_index){
      log("list after sort is ", list);
      var first_song = list[0];

      if ( $scope.isOwn( first_song.user_id ) ){
        log("update data to server");

        var dropped_song = list[dropped_index];
        
        var arr_post_update = [];
        for ( var i =0; i< list.length; i++ ){
          var song = list[i];
          song.position = i;
          arr_post_update.push({
            _id: song._id,
            title: song.title,
            position:song.position
          });
        }
        log(arr_post_update);
        Songs.update({action:'sort_songs'}, arr_post_update, function(res){
          $scope.processRetrieveData( res, function(data){

          });
        });
      }
      else{
        log("only local");
      }
    }
  }

  $scope.submitSong = function(){

    var post_data = {
      title :$scope.song_title,
      link:$scope.song_link,
      emotion: $scope.song_emotion,
      album_id: $scope.current_album_id
    };

    log("post_data", post_data);

    if ( $scope.is_edit_song ){
      return $scope.doUpdateSong(post_data);
    }

    $scope.pending_add_song = true;
    Songs.post({}, post_data, function(res){
      $scope.pending_add_song = false;
      $scope.processRetrieveData(res,function(data){
        $scope.songs.push(data.song);
        $dialogs.success("You added new song");
        $scope.updateScopeObject( $scope.current_album, data.album );
        $scope.resetValue();
      });
    });
  }
  //End submit song

  $scope.doUpdateSong = function(update_song_data){
    log("update_song_data", update_song_data);
    //$scope.show_song_form = false;

    var copy_song = angular.copy( $scope.edit_song );
    //$scope.is_edit_album = null;
    $scope.pending_edit_song = true;
    
    copy_song = _.extend( copy_song, update_song_data );
    log("copy_song", copy_song);
    Songs.update({}, copy_song, function(res){
      $scope.pending_edit_song = false;
      $scope.processRetrieveData(res,function(data){
        $scope.updateItemInList( $scope.songs, data );
        $scope.show_song_form = false;
        $dialogs.success("The song is updated");
        $scope.resetValue();
      });
    });
  }

  $scope.editSong = function(song){
    log("editSong song", song);
    $scope.is_edit_song = true;
    $scope.edit_song = angular.copy(song);
    $scope.song_title = song.title;
    $scope.song_link = song.link;
    $scope.song_emotion = song.emotion;
    $scope.show_song_form = true;
  }

  $scope.deleteSong = function(song){
    var title = "Are you sure to remove the song: " + song.title;
    $dialogs.confirm( title, function(){
      Songs.remove({id:song._id},function(res){
        $scope.processRetrieveData(res,function(data){
          $scope.updateScopeObject( $scope.current_album, data );
          $scope.removeItemInList( $scope.songs, song._id );
        });
      })
    });
  }

  $scope.isPlaying = function(song){
    return angular.isDefined( $scope.playing_song ) && $scope.playing_song._id == song._id;
      
  }

  $scope.playSong = function( song_index ){
    log("song_index", song_index);
    var broadcast_data = {
      index: song_index,
      songs: angular.copy( $scope.songs )
    }
    
    broadcast_data.album_cover_id = $scope.current_album.feature_id;
    
    log("pre data", broadcast_data);
    fSharedService.prepForBroadcast({cmd:'play-songs',data: broadcast_data });
  }

  $scope.addToQueue = function(song){
   fSharedService.prepForBroadcast({cmd:'add-to-queue',data: song }); 
  }

  $scope.downloadSong = function(song){
    var pom = document.createElement('a');
    pom.setAttribute('href', song.link);
    pom.setAttribute('download', song.title);
    pom.click();
    $dialogs.success("The song is in the download progress");
  }
});