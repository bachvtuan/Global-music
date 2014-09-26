jQuery(document).ready(function(){
    var scripts = document.getElementsByTagName("script");
    var jsFolder = "";
    for (var i= 0; i< scripts.length; i++)
    {
        if( scripts[i].src && scripts[i].src.match(/initaudioplayer-1\.js/i))
            jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);
    }
    jQuery("#amazingaudioplayer-1").amazingaudioplayer({
        jsfolder:jsFolder,
        skinsfoldername:"",
        volumeimagewidth:24,
        barbackgroundimage:"",
        showtime:false,
        titleinbarwidth:80,
        showprogress:true,
        random:false,
        titleformat:"%TITLE%",
        prevnextimagewidth:48,
        height:600,
        imageheight:100,
        prevnextimage:"prevnext-48-48-1.png",
        showinfo:true,
        tracklistitem:10,
        skin:"DarkBox",
        loopimage:"loop-24-24-0.png",
        loopimagewidth:24,
        volumebarheight:72,
        prevnextimageheight:48,
        infoformat:"By %ARTIST% %ALBUM%<br />%INFO%",
        showstop:false,
        tracklistarrowimagewidth:16,
        stopimagewidth:24,
        skinsfoldername:"",
        width:320,
        showtitleinbar:false,
        showtracklist:true,
        volumeimage:"volume-24-24-0.png",
        playpauseimagewidth:48,
        loopimageheight:24,
        tracklistitemformat:"%ID%. %TITLE% <span style='float:right;'>%DURATION%</span>",
        showloop:true,
        tracklistarrowimage:"tracklistarrow-16-16-0.png",
        playpauseimageheight:48,
        showbackgroundimage:false,
        progresswidthmode:"fixed",
        stopimage:"stop-24-24-0.png",
        showprevnext:true,
        backgroundimage:"",
        autoplay:false,
        volumebarpadding:8,
        progressheight:8,
        showtracklistbackgroundimage:false,
        progresswidth:208,
        showtitle:true,
        tracklistarrowimageheight:16,
        heightmode:"auto",
        titleinbarformat:"%TITLE%",
        stopimageheight:24,
        volumeimageheight:24,
        showbarbackgroundimage:false,
        tracklistbackgroundimage:"",
        showimage:true,
        tracklistwidth:320,
        imagewidth:100,
        timeformat:"%CURRENT% / %DURATION%",
        showvolume:true,
        showvolumebar:true,
        loop:1,
        playpauseimage:"playpause-48-48-1.png"
    });
});