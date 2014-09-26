jQuery(document).ready(function(){
    var jsFolder = "http://amazingaudioplayer.com/wp-content/uploads/amazingaudioplayer/5/audioplayerengine/";
    jQuery("#amazingaudioplayer-5").amazingaudioplayer({
        jsfolder:jsFolder,
        volumeimagewidth:24,
        barbackgroundimage:"",
        imagewidth:100,
        showtime:false,
        titleinbarwidth:80,
        showprogress:true,
        random:false,
        titleformat:"%TITLE%",
        height:600,
        prevnextimage:"prevnext-24-24-0.png",
        showinfo:true,
        imageheight:100,
        skin:"Jukebox",
        loopimage:"loop-24-24-0.png",
        loopimagewidth:24,
        volumebarheight:80,
        prevnextimageheight:24,
        infoformat:"By %ARTIST% %ALBUM%<br />%INFO%",
        showstop:false,
        showvolumebar:true,
        width:320,
        showtitleinbar:false,
        showloop:true,
        volumeimage:"volume-24-24-0.png",
        playpauseimagewidth:24,
        loopimageheight:24,
        tracklistitemformat:"%ID%. %TITLE% <span style='position:absolute;top:0;right:0;'>%DURATION%</span>",
        prevnextimagewidth:24,
        tracklistarrowimage:"tracklistarrow-16-16-0.png",
        playpauseimageheight:24,
        showbackgroundimage:false,
        progresswidthmode:"auto",
        stopimage:"stop-24-24-0.png",
        showvolume:true,
        playpauseimage:"playpause-24-24-0.png",
        showprevnext:true,
        backgroundimage:"",
        volumebarpadding:8,
        progressheight:8,
        showtracklistbackgroundimage:false,
        progresswidth:96,
        showtitle:true,
        tracklistarrowimageheight:16,
        heightmode:"auto",
        titleinbarformat:"%TITLE%",
        showtracklist:true,
        stopimageheight:24,
        volumeimageheight:24,
        stopimagewidth:24,
        tracklistbackgroundimage:"",
        showbarbackgroundimage:false,
        showimage:true,
        tracklistwidth:320,
        tracklistarrowimagewidth:16,
        timeformat:"%CURRENT% / %DURATION%",
        autoplay:false,
        loop:1,
        tracklistitem:10
    });
});
