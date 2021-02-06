"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var YoutubeVideoManager = /*#__PURE__*/function (_VideoManager) {
  _inherits(YoutubeVideoManager, _VideoManager);

  var _super = _createSuper(YoutubeVideoManager);

  function YoutubeVideoManager(containerID) {
    var _this;

    _classCallCheck(this, YoutubeVideoManager);

    _this = _super.call(this, containerID);
    _this.player = null;
    _this.firstTimePlaying = true;
    _this.videoTimer = new VideoTimer(_this.__timeHandler.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(YoutubeVideoManager, [{
    key: "play",
    value: function play() {
      if (this.player === null) {
        return;
      }

      this.player.playVideo();
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.player === null) {
        return;
      }

      this.player.pauseVideo();
    }
  }, {
    key: "restartVideo",
    value: function restartVideo() {
      this.__loadTime(0);
    }
  }, {
    key: "isVideoPlaying",
    value: function isVideoPlaying() {
      return this.player.getPlayerState() == YT.PlayerState.PLAYING;
    }
  }, {
    key: "loadProgress",
    //0-1
    value: function loadProgress(progress) {
      var videoDuration = this.player.getDuration();

      this.__loadTime(videoDuration * progress);
    }
  }, {
    key: "__loadTime",
    value: function __loadTime(seconds) {
      if (this.player === null) {
        return;
      }

      this.player.seekTo(seconds, true);
      var currentTime = this.player.getCurrentTime();
      this.videoTimer.loadOffset(currentTime - Math.floor(currentTime));
      this.notify(currentTime);
    }
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      if (this.player === null) {
        return;
      }

      volume = volume > 1 ? 1 : volume;
      volume = volume < 0 ? 0 : volume;
      this.player.setVolume(volume * 100);
    }
  }, {
    key: "addYoutubeScript",
    value: function addYoutubeScript(iframeContainerID) {
      this.iframeContainerID = iframeContainerID;
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.appendChild(tag);
      window.onYouTubeIframeAPIReady = this.__onYouTubeIframeAPIReady.bind(this);
    }
  }, {
    key: "__onYouTubeIframeAPIReady",
    value: function __onYouTubeIframeAPIReady() {
      var player = new YT.Player(this.iframeContainerID, {
        height: '360',
        width: '640',
        videoId: 'bcqdgepq7ws',
        events: {
          'onReady': this.__onPlayerReady.bind(this),
          'onStateChange': this.__onPlayerStateChange.bind(this)
        },
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'disablekb': 1,
          'fs': 0,
          'modestbranding': 1,
          'rel': 0,
          'iv_load_policy': 3,
          'autohide': 1,
          'wmode': 'opaque',
          'start': 0
        }
      });
      this.player = player;
    }
  }, {
    key: "__onPlayerReady",
    value: function __onPlayerReady(event) {
      var iFrame = document.querySelector("#" + this.iframeContainerID);
      iFrame.style.pointerEvents = "none";
      this.videoStateChanged(VideoManager.LOADED, {
        duration: this.player.getDuration()
      });
    }
  }, {
    key: "__onPlayerStateChange",
    value: function __onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        console.log();

        if (this.firstTimePlaying === true && this.player.getCurrentTime() >= 0.1) {
          this.__loadTime(0);
        }

        this.videoStateChanged(VideoManager.PLAYING);
        this.videoTimer.play();
        this.firstTimePlaying = false;
      } else if (event.data == YT.PlayerState.PAUSED) {
        this.videoStateChanged(VideoManager.PAUSED);
        this.videoTimer.pause();
      }
    }
  }, {
    key: "__timeHandler",
    value: function __timeHandler() {
      this.notify(this.player.getCurrentTime());
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this.player.getCurrentTime();
    }
  }]);

  return YoutubeVideoManager;
}(VideoManager);