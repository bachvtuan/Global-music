/*
 * Audio Player HTML5 v1.6
 *
 * Copyright 2012-2013, LambertGroup
 * 
 */

/*
 * Audio Player HTML5 v1.6
 *
 * Copyright 2012-2013, LambertGroup
 * 
 */

(function(c) {
  function C(a, e, j, d, n, l, g, s, t, u, v, m, h) {
    a.totalTime = "Infinity";
    e.isSliderInitialized && (t.slider("destroy"), e.isSliderInitialized = !1);
    e.isProgressInitialized && (u.progressbar("destroy"), e.isProgressInitialized = !1);
    a.is_changeSrc = !0;
    a.is_buffer_complete = !1;
    m.width(a.audioPlayerWidth);
    u.css({
      background: e.bufferEmptyColor
    });
    a.curSongText = "";
    e.showAuthor && (null != a.playlist_arr[a.current_img_no].author && "" != a.playlist_arr[a.current_img_no].author) && (a.curSongText += a.playlist_arr[a.current_img_no].author + " - ");
    e.showTitle && (null != a.playlist_arr[a.current_img_no].title && "" != a.playlist_arr[a.current_img_no].title) && (a.curSongText += a.playlist_arr[a.current_img_no].title);
    a.isAuthorTitleInsideScrolling = !1;
    a.authorTitleInsideWait = 0;
    h.stop();
    h.css({
      "margin-left": 0
    });
    h.html(a.curSongText);
    a.curSongText || m.css({
      display: "none",
      width: 0,
      height: 0,
      padding: 0,
      margin: 0
    });
    g = document.getElementById(a.audioID);
    c(j[a.current_img_no]).css({
      background: e.playlistRecordBgOnColor,
      "border-bottom-color": e.playlistRecordBottomBorderOnColor,
      color: e.playlistRecordTextOnColor
    });
    D(-1, a, e, d, n, l);
    j = a.playlist_arr[a.current_img_no].sources_mp3;
    if (-1 != f.indexOf("opera") || -1 != f.indexOf("firefox") || -1 != f.indexOf("mozzila")) j = a.playlist_arr[a.current_img_no].sources_ogg;
    if (-1 != f.indexOf("chrome") || -1 != f.indexOf("msie") || -1 != f.indexOf("safari")) j = a.playlist_arr[a.current_img_no].sources_mp3; - 1 != f.indexOf("android") && (j = a.playlist_arr[a.current_img_no].sources_mp3);
    if (-1 != f.indexOf("ipad") || -1 != f.indexOf("iphone") || -1 != f.indexOf("ipod") || -1 != f.indexOf("webos")) j = a.playlist_arr[a.current_img_no].sources_mp3;
    g.src = j;
    document.getElementById(a.audioID).load();
    if (-1 == f.indexOf("android") && (!(-1 != f.indexOf("ipad") || -1 != f.indexOf("iphone") || -1 != f.indexOf("ipod") || -1 != f.indexOf("webos")) || !a.is_very_first)) e.autoPlay ? (E(), document.getElementById(a.audioID).play(), s.addClass("AudioPause")) : s.removeClass("AudioPause")
  }
  function z(a) {
    var e = 10 > Math.floor(a / 60) ? "0" + Math.floor(a / 60) : Math.floor(a / 60);
    return e + ":" + (10 > Math.floor(a - 60 * e) ? "0" + Math.floor(a - 60 * e) : Math.floor(a - 60 * e))
  }
  function F(a, e, f, d, n, l, g) {
    a.is_changeSrc = !1;
    a.is_very_first && (a.is_very_first = !1);
    n.width(a.audioPlayerWidth);
    d.width(a.audioPlayerWidth);
    d.slider({
      value: 0,
      step: 0.01,
      orientation: "horizontal",
      range: "min",
      max: a.totalTime,
      slide: function() {
        a.is_seeking = !0
      },
      stop: function(d, e) {
        a.is_seeking = !1;
        document.getElementById(a.audioID).currentTime = e.value;
        !1 != document.getElementById(a.audioID).paused && (document.getElementById(a.audioID).play(), g.addClass("AudioPause"))
      },
      create: function() {
        e.isSliderInitialized = !0
      }
    });
    c(".ui-slider-range", d).css({
      background: e.seekbarColor
    });
    n.progressbar({
      value: 0,
      complete: function() {
        a.is_buffer_complete = !0
      },
      create: function() {
        e.isProgressInitialized = !0
      }
    });
    c(".ui-widget-header", n).css({
      background: e.bufferFullColor
    })
  }
  function D(a, e, c, d, f, l) {
    var g = (d.height() + 1) * (e.total_images - c.numberOfThumbsPerScreen);
    l.stop(!0, !0); - 1 != a && !e.isCarouselScrolling ? (e.isCarouselScrolling = !0, l.animate({
      top: (2 >= a ? -1 * g : parseInt(g * (a - 100) / 100, 10)) + "px"
    }, 1100, "easeOutQuad", function() {
      e.isCarouselScrolling = !1
    })) : !e.isCarouselScrolling && e.total_images > c.numberOfThumbsPerScreen && (e.isCarouselScrolling = !0, a = -1 * parseInt((d.height() + 1) * e.current_img_no, 10), Math.abs(a) > g && (a = -1 * g), e.total_images > c.numberOfThumbsPerScreen && c.showPlaylist && f.slider("value", 100 + parseInt(100 * a / g)), l.animate({
      top: a + "px"
    }, 500, "easeOutCubic", function() {
      e.isCarouselScrolling = !1
    }))
  }
  function E() {
    c("audio").each(function() {
      c(".AudioPlay").removeClass("AudioPause");
      c(this)[0].pause()
    })
  }
  var f = navigator.userAgent.toLowerCase();
  c.fn.audio1_html5 = function(a) {
    a = c.extend({}, c.fn.audio1_html5.defaults, a);
    return this.each(function() {
      var e = c(this),
          j = c('<div class="AudioControls"> <a class="AudioRewind" title="Rewind"></a><a class="AudioPlay" title="Play/Pause"></a><a class="AudioPrev" title="Previous"></a><a class="AudioNext" title="Next"></a><a class="AudioShowHidePlaylist" title="Show/Hide Playlist"></a><a class="VolumeButton" title="Mute/Unmute"></a><div class="VolumeSlider"></div> <div class="AudioTimer">00:00 / 00:00</div> </div> <div class="AudioBuffer"></div><div class="AudioSeek"></div><div class="songAuthorTitle"><div class="songAuthorTitleInside">AA</div></div> <div class="thumbsHolderWrapper"><div class="playlistPadding"><div class="thumbsHolderVisibleWrapper"><div class="thumbsHolder"></div></div></div></div> <div class="slider-vertical"></div>'),
          d = e.parent(".audio1_html5"),
          n = c(this).parent();
      d.addClass(a.skin);
      d.append(j);
      var l = c(".AudioControls", d),
          j = c(".AudioRewind", d),
          g = c(".AudioPlay", d),
          s = c(".AudioPrev", d),
          t = c(".AudioNext", d),
          u = c(".AudioShowHidePlaylist", d),
          v = c(".VolumeButton", d),
          m = c(".VolumeSlider", d),
          h = c(".AudioTimer", d),
          A = c(".songAuthorTitle", d),
          p = c(".songAuthorTitleInside", d),
          q = c(".AudioBuffer", d),
          x = c(".AudioSeek", d),
          B;
      B = -1;
      "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (B = parseFloat(RegExp.$1));
      B = parseInt(B, 10);
      d.css({
        background: a.playerBg,
        padding: a.playerPadding + "px"
      });
      (-1 != f.indexOf("ipad") || -1 != f.indexOf("iphone") || -1 != f.indexOf("ipod") || -1 != f.indexOf("webos")) && d.css({
        "padding-top": "0px"
      });
      var b = {
        current_img_no: 0,
        is_very_first: !0,
        total_images: 0,
        is_seeking: !1,
        is_changeSrc: !1,
        is_buffer_complete: !1,
        timeupdateInterval: "",
        totalTime: "",
        playlist_arr: "",
        isCarouselScrolling: !1,
        isAuthorTitleInsideScrolling: !1,
        curSongText: "",
        authorTitleInsideWait: 0,
        audioPlayerWidth: 0,
        audioPlayerHeight: 0,
        audioID: "",
        audioObj: ""
      };
      b.audioID = e.attr("id");
      b.audioPlayerWidth = 0;
      a.showRewindBut ? b.audioPlayerWidth += j.width() + parseInt(j.css("margin-left").substring(0, j.css("margin-left").length - 2)) + parseInt(j.css("margin-right").substring(0, j.css("margin-right").length - 2)) : j.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      });
      a.showPlayBut ? b.audioPlayerWidth += g.width() + parseInt(g.css("margin-left").substring(0, g.css("margin-left").length - 2)) + parseInt(g.css("margin-right").substring(0, g.css("margin-right").length - 2)) : g.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      });
      a.showPreviousBut ? b.audioPlayerWidth += s.width() + parseInt(s.css("margin-left").substring(0, s.css("margin-left").length - 2)) + parseInt(s.css("margin-right").substring(0, s.css("margin-right").length - 2)) : s.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      });
      a.showNextBut ? b.audioPlayerWidth += t.width() + parseInt(t.css("margin-left").substring(0, t.css("margin-left").length - 2)) + parseInt(t.css("margin-right").substring(0, t.css("margin-right").length - 2)) : t.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      });
      a.showPlaylistBut ? b.audioPlayerWidth += u.width() + parseInt(u.css("margin-left").substring(0, u.css("margin-left").length - 2)) + parseInt(u.css("margin-right").substring(0, u.css("margin-right").length - 2)) : u.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      });
      a.showVolumeBut ? b.audioPlayerWidth += v.width() + parseInt(v.css("margin-left").substring(0, v.css("margin-left").length - 2)) + parseInt(v.css("margin-right").substring(0, v.css("margin-right").length - 2)) : v.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      });
      a.showVolumeSliderBut ? b.audioPlayerWidth += m.width() + parseInt(m.css("margin-left").substring(0, m.css("margin-left").length - 2)) + parseInt(m.css("margin-right").substring(0, m.css("margin-right").length - 2)) : m.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      });
      a.showTimer ? b.audioPlayerWidth += h.width() + parseInt(h.css("margin-left").substring(0, h.css("margin-left").length - 2)) + parseInt(h.css("margin-right").substring(0, h.css("margin-right").length - 2)) : h.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      });
      a.showSeekBar || (q.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      }), x.css({
        display: "none",
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
      }));
      h.css({
        color: a.timerColor
      });
      A.css({
        color: a.songAuthorTitleColor
      }); - 1 != B || -1 != f.indexOf("android") || -1 != f.indexOf("ipad") || -1 != f.indexOf("iphone") || -1 != f.indexOf("ipod") || f.indexOf("webos");
      b.audioPlayerWidth -= 9;
      if (-1 != f.indexOf("android")) a.playlistTopPos -= 0;
      else if (-1 != f.indexOf("ipad") || -1 != f.indexOf("iphone") || -1 != f.indexOf("ipod") || -1 != f.indexOf("webos")) l.css("margin-top", "-9px"), a.playlistTopPos -= 5;
      n.width(b.audioPlayerWidth + 10);
      a.showSeekBar || n.height(d.height() - 4);
      !a.showAuthor && !a.showTitle && n.height(d.height() - 22);
      b.audioPlayerHeight = d.height() + 2 * a.playerPadding;
      var w = c(".thumbsHolderWrapper", d),
          n = c(".playlistPadding", d),
          l = c(".thumbsHolderVisibleWrapper", d),
          y = c(".thumbsHolder", d),
          k = c(".slider-vertical", d);
      a.showPlaylist || w.css({
        display: "none"
      });
      a.showPlaylistOnInit || w.css({
        opacity: 0,
        "margin-top": "-20px",
        display: "none"
      });
      w.css({
        width: d.width() + 2 * a.playerPadding + "px",
        top: b.audioPlayerHeight + a.playlistTopPos + "px",
        left: "0px",
        background: a.playlistBgColor
      });
      l.width(d.width() + 1 + 2 * a.playerPadding);
      b.playlist_arr = [];
      c(".xaudioplaylist", d).children().each(function() {
        currentElement = c(this);
        b.total_images++;
        b.playlist_arr[b.total_images - 1] = [];
        b.playlist_arr[b.total_images - 1].title = "";
        b.playlist_arr[b.total_images - 1].author = "";
        b.playlist_arr[b.total_images - 1].thumb = "";
        b.playlist_arr[b.total_images - 1].sources_mp3 = "";
        b.playlist_arr[b.total_images - 1].sources_ogg = "";
        null != currentElement.find(".xtitle").html() && (b.playlist_arr[b.total_images - 1].title = currentElement.find(".xtitle").html());
        null != currentElement.find(".xauthor").html() && (b.playlist_arr[b.total_images - 1].author = currentElement.find(".xauthor").html());
        null != currentElement.find(".xthumb").html() && (b.playlist_arr[b.total_images - 1].thumb = currentElement.find(".xthumb").html());
        null != currentElement.find(".xsources_mp3").html() && (b.playlist_arr[b.total_images - 1].sources_mp3 = currentElement.find(".xsources_mp3").html());
        null != currentElement.find(".xsources_ogg").html() && (b.playlist_arr[b.total_images - 1].sources_ogg = currentElement.find(".xsources_ogg").html());
        thumbsHolder_Thumb = c('<div class="thumbsHolder_ThumbOFF" rel="' + (b.total_images - 1) + '"><div class="padding">' + (a.showPlaylistNumber ? b.total_images + ". " : "") + b.playlist_arr[b.total_images - 1].title + "</div></div>");
        y.append(thumbsHolder_Thumb);
        thumbsHolder_Thumb.css({
          top: (thumbsHolder_Thumb.height() + 1) * b.total_images + "px",
          background: a.playlistRecordBgOffColor,
          "border-bottom-color": a.playlistRecordBottomBorderOffColor,
          color: a.playlistRecordTextOffColor
        });
        1 === b.total_images && thumbsHolder_Thumb.css({
          background: a.playlistRecordBgOnColor,
          "border-bottom-color": a.playlistRecordBottomBorderOnColor,
          color: a.playlistRecordTextOnColor
        })
      });
      w.height(2 * a.playlistPadding + (thumbsHolder_Thumb.height() + 1) * (a.numberOfThumbsPerScreen < b.total_images ? a.numberOfThumbsPerScreen : b.total_images));
      l.height((thumbsHolder_Thumb.height() + 1) * (a.numberOfThumbsPerScreen < b.total_images ? a.numberOfThumbsPerScreen : b.total_images));
      n.css({
        padding: a.playlistPadding + "px"
      });
      b.total_images > a.numberOfThumbsPerScreen && a.showPlaylist ? (k.slider({
        orientation: "vertical",
        range: "min",
        min: 1,
        max: 100,
        step: 1,
        value: 100,
        slide: function(d, c) {
          D(c.value, b, a, thumbsHolder_Thumb, k, y)
        }
      }), k.css({
        display: "inline",
        position: "absolute",
        height: w.height() - 16 - 2 * a.playlistPadding + "px",
        left: d.width() + 2 * a.playerPadding - k.width() - a.playlistPadding + "px",
        top: b.audioPlayerHeight + a.playlistTopPos + a.playlistPadding + "px"
      }), a.showPlaylistOnInit || k.css({
        opacity: 0,
        display: "none"
      }), c(".thumbsHolder_ThumbOFF", d).css({
        width: d.width() + 2 * a.playerPadding - k.width() - 3 * a.playlistPadding + "px"
      })) : c(".thumbsHolder_ThumbOFF", d).css({
        width: d.width() + 2 * a.playerPadding - 2 * a.playlistPadding + "px"
      });
      l.mousewheel(function(d, c) {
        d.preventDefault();
        var e = k.slider("value");
        if (1 < parseInt(e) && -1 == parseInt(c) || 100 > parseInt(e) && 1 == parseInt(c)) e += c, k.slider("value", e), D(e, b, a, thumbsHolder_Thumb, k, y)
      });
      var r = c(".thumbsHolder_ThumbOFF", d);
      r.css({
        background: a.playlistRecordBgOffColor,
        "border-bottom-color": a.playlistRecordBottomBorderOffColor,
        color: a.playlistRecordTextOffColor
      });
      r.click(function() {
        if (!b.is_changeSrc) {
          a.autoPlay = !0;
          var f = c(this).attr("rel");
          r.css({
            background: a.playlistRecordBgOffColor,
            "border-bottom-color": a.playlistRecordBottomBorderOffColor,
            color: a.playlistRecordTextOffColor
          });
          b.current_img_no = f;
          C(b, a, r, thumbsHolder_Thumb, k, y, d, g, x, q, h, A, p, e)
        }
      });
      r.mouseover(function() {
        c(this).css({
          background: a.playlistRecordBgOnColor,
          "border-bottom-color": a.playlistRecordBottomBorderOnColor,
          color: a.playlistRecordTextOnColor
        })
      });
      r.mouseout(function() {
        var d = c(this),
            e = d.attr("rel");
        b.current_img_no != e && d.css({
          background: a.playlistRecordBgOffColor,
          "border-bottom-color": a.playlistRecordBottomBorderOffColor,
          color: a.playlistRecordTextOffColor
        })
      });
      m.slider({
        value: a.initialVolume,
        step: 0.05,
        orientation: "horizontal",
        range: "min",
        max: 1,
        animate: !0,
        slide: function(a, d) {
          document.getElementById(b.audioID).volume = d.value
        },
        stop: function() {}
      });
      document.getElementById(b.audioID).volume = a.initialVolume;
      m.css({
        background: a.volumeOffColor
      });
      c(".ui-slider-range", m).css({
        background: a.volumeOnColor
      });
      g.click(function() {
        var a = document.getElementById(b.audioID).paused;
        E();
        !1 == a ? (document.getElementById(b.audioID).pause(), g.removeClass("AudioPause")) : (document.getElementById(b.audioID).play(), g.addClass("AudioPause"))
      });
      j.click(function() {
        document.getElementById(b.audioID).currentTime = 0;
        E();
        document.getElementById(b.audioID).play();
        g.addClass("AudioPause")
      });
      t.click(function() {
        if (!b.is_changeSrc || b.is_very_first) a.autoPlay = !0, r.css({
          background: a.playlistRecordBgOffColor,
          "border-bottom-color": a.playlistRecordBottomBorderOffColor,
          color: a.playlistRecordTextOffColor
        }), b.current_img_no == b.total_images - 1 ? b.current_img_no = 0 : b.current_img_no++, C(b, a, r, thumbsHolder_Thumb, k, y, d, g, x, q, h, A, p, e)
      });
      s.click(function() {
        if (!b.is_changeSrc || b.is_very_first) a.autoPlay = !0, r.css({
          background: a.playlistRecordBgOffColor,
          "border-bottom-color": a.playlistRecordBottomBorderOffColor,
          color: a.playlistRecordTextOffColor
        }), 0 > b.current_img_no - 1 ? b.current_img_no = b.total_images - 1 : b.current_img_no--, C(b, a, r, thumbsHolder_Thumb, k, y, d, g, x, q, h, A, p, e)
      });
      u.click(function() {
        0 > w.css("margin-top").substring(0, w.css("margin-top").length - 2) ? (aux_opacity = 1, aux_display = "block", aux_margin_top = "0px", w.css({
          display: aux_display
        }), b.total_images > a.numberOfThumbsPerScreen && k.css({
          opacity: 1,
          display: "block"
        })) : (aux_opacity = 0, aux_display = "none", aux_margin_top = "-20px", b.total_images > a.numberOfThumbsPerScreen && k.css({
          opacity: 0,
          display: "none"
        }));
        w.animate({
          opacity: aux_opacity,
          "margin-top": aux_margin_top
        }, 500, "easeOutQuad", function() {
          w.css({
            display: aux_display
          })
        })
      });
      v.click(function() {
        document.getElementById(b.audioID).muted ? (document.getElementById(b.audioID).muted = !1, v.removeClass("VolumeButtonMuted")) : (document.getElementById(b.audioID).muted = !0, v.addClass("VolumeButtonMuted"))
      });
      document.getElementById(b.audioID).addEventListener("ended", function() {
        a.loop && t.click()
      });
      C(b, a, r, thumbsHolder_Thumb, k, y, d, g, x, q, h, A, p, e);
      b.timeupdateInterval = setInterval(function() {
        var c = a;
        !b.isAuthorTitleInsideScrolling && 5 <= b.authorTitleInsideWait && p.width() > b.audioPlayerWidth ? (b.isAuthorTitleInsideScrolling = !0, b.authorTitleInsideWait = 0, p.html(b.curSongText + " **** " + b.curSongText + " **** " + b.curSongText + " **** " + b.curSongText + " **** " + b.curSongText + " **** "), p.css({
          "margin-left": 0
        }), p.stop().animate({
          "margin-left": b.audioPlayerWidth - p.width() + "px"
        }, parseInt(1E4 * (p.width() - b.audioPlayerWidth) / 150, 10), "linear", function() {
          b.isAuthorTitleInsideScrolling = !1
        })) : !b.isAuthorTitleInsideScrolling && p.width() > b.audioPlayerWidth && b.authorTitleInsideWait++;
        curTime = document.getElementById(b.audioID).currentTime;
        bufferedTime = 0;
        b.is_changeSrc && (!isNaN(b.totalTime) && "Infinity" != b.totalTime) && (F(b, c, d, x, q, h, g, e), -1 != f.indexOf("android") && (c.autoPlay ? (document.getElementById(b.audioID).play(), g.addClass("AudioPause")) : g.removeClass("AudioPause")));
        !b.is_seeking && c.isSliderInitialized && x.slider("value", curTime); - 1 != f.indexOf("android") ? (q.css({
          background: c.bufferFullColor
        }), !isNaN(b.totalTime) && "Infinity" != b.totalTime ? h.text(z(curTime) + " / " + z(b.totalTime)) : h.text("00:00 / " + z(0))) : (document.getElementById(b.audioID).buffered.length && (bufferedTime = document.getElementById(b.audioID).buffered.end(document.getElementById(b.audioID).buffered.length - 1), 0 < bufferedTime && (!b.is_buffer_complete && !isNaN(b.totalTime) && "Infinity" != b.totalTime && c.isProgressInitialized) && q.progressbar({
          value: 100 * bufferedTime / b.totalTime
        })), h.text(z(curTime) + " / " + z(bufferedTime)))
      }, 300);
      //tuan tweak
      window.global_interval = b.timeupdateInterval;
      document.getElementById(b.audioID).addEventListener("durationchange", function() {
        b.is_changeSrc && (b.totalTime = document.getElementById(b.audioID).duration)
      });
      (-1 != f.indexOf("ipad") || -1 != f.indexOf("iphone") || -1 != f.indexOf("ipod") || -1 != f.indexOf("webos")) && document.getElementById(b.audioID).addEventListener("canplaythrough", function() {
        b.totalTime != document.getElementById(b.audioID).duration && (a.isSliderInitialized && (x.slider("destroy"), a.isSliderInitialized = !1), a.isProgressInitialized && (q.progressbar("destroy"), a.isProgressInitialized = !1), b.totalTime = document.getElementById(b.audioID).duration, F(b, a, d, x, q, h, g, e), a.isProgressInitialized && q.progressbar({
          value: b.audioPlayerWidth
        }))
      })
    })
  };
  c.fn.audio1_html5.defaults = {
    skin: "whiteControllers",
    initialVolume: 0.5,
    autoPlay: !1,
    loop: !0,
    playerPadding: 5,
    playerBg: "#000000",
    bufferEmptyColor: "#929292",
    bufferFullColor: "#454545",
    seekbarColor: "#ffffff",
    volumeOffColor: "#454545",
    volumeOnColor: "#ffffff",
    timerColor: "#ffffff",
    songAuthorTitleColor: "#fffff",
    showRewindBut: !0,
    showPlayBut: !0,
    showPreviousBut: !0,
    showNextBut: !0,
    showPlaylistBut: !0,
    showVolumeBut: !0,
    showVolumeSliderBut: !0,
    showTimer: !0,
    showSeekBar: !0,
    showAuthor: !0,
    showTitle: !0,
    showPlaylist: !0,
    showPlaylistOnInit: !0,
    playlistTopPos: 2,
    playlistBgColor: "#000000",
    playlistRecordBgOffColor: "#000000",
    playlistRecordBgOnColor: "#333333",
    playlistRecordBottomBorderOffColor: "#333333",
    playlistRecordBottomBorderOnColor: "#FFFFFF",
    playlistRecordTextOffColor: "#777777",
    playlistRecordTextOnColor: "#FFFFFF",
    numberOfThumbsPerScreen: 7,
    playlistPadding: 4,
    showPlaylistNumber: !0,
    isSliderInitialized: !1,
    isProgressInitialized: !1
  }
})(jQuery);