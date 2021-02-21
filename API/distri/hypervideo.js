"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Plugin = /*#__PURE__*/function () {
  function Plugin() {
    _classCallCheck(this, Plugin);
  }

  _createClass(Plugin, [{
    key: "onLoad",
    value: function onLoad(config, container, elementsContainer, videoManager) {
      this.config = config;
      this.container = container;
      this.elementsContainer = elementsContainer;
      this.videoManager = videoManager;
      this.__firstClick = false;
    }
  }, {
    key: "onTagClick",
    value: function onTagClick(event) {
      var thisReference = this;

      if (this.__firstClick === false) {
        this.elementsContainer.addEventListener('click', function (event) {
          if (thisReference.elementsContainer !== event.target) {
            return;
          }

          thisReference.hideElementsContainer();
        });
        this.__firstClick = true;
      }
    }
  }, {
    key: "onTagHover",
    value: function onTagHover(event) {}
  }, {
    key: "onTagLeave",
    value: function onTagLeave(event) {}
  }, {
    key: "fullScreenStateChanged",
    value: function fullScreenStateChanged(isFullScreen) {}
  }, {
    key: "showElementsContainer",
    value: function showElementsContainer() {
      this.elementsContainer.parentElement.style.display = "block";
      this.elementsContainer.style.display = "block";
    }
  }, {
    key: "hideElementsContainer",
    value: function hideElementsContainer() {
      this.elementsContainer.parentElement.style.display = "none";
      this.elementsContainer.style.display = "none";
    }
  }]);

  return Plugin;
}();

var VideoTimer = /*#__PURE__*/function () {
  function VideoTimer(timeHandler) {
    _classCallCheck(this, VideoTimer);

    this.timeHandler = timeHandler;
    this.timer = null;
    this.isPlaying = false;
  }

  _createClass(VideoTimer, [{
    key: "play",
    value: function play() {
      if (this.isPlaying === true) {
        return;
      }

      this.timer = setInterval(this.__handleTime.bind(this), VideoTimer.LOOP_TIME);
      this.isPlaying = true;
    }
  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this.timer);
      this.isPlaying = false;
    }
  }, {
    key: "__handleTime",
    value: function __handleTime() {
      this.timeHandler();
    }
  }], [{
    key: "LOOP_TIME",
    get: function get() {
      return 100;
    }
  }]);

  return VideoTimer;
}();

var Observer = /*#__PURE__*/function () {
  function Observer(onChange) {
    _classCallCheck(this, Observer);

    this.onChange = onChange;
  }

  _createClass(Observer, [{
    key: "update",
    value: function update(newValue) {
      this.onChange(newValue);
    }
  }]);

  return Observer;
}();

var Subject = /*#__PURE__*/function () {
  function Subject() {
    _classCallCheck(this, Subject);

    this.observers = [];
  }

  _createClass(Subject, [{
    key: "addObserver",
    value: function addObserver(observer) {
      this.observers.push(observer);
    }
  }, {
    key: "removeObserver",
    value: function removeObserver(observer) {
      var index = this.observers.findIndex(function (obs) {
        return observer === obs;
      });

      if (index !== -1) {
        this.observers = this.observers.slice(index, 1);
      }
    }
  }, {
    key: "notify",
    value: function notify(newValue) {
      this.observers.forEach(function (obs) {
        return obs.update(newValue);
      });
    }
  }]);

  return Subject;
}();

var MediaManager = /*#__PURE__*/function (_Subject) {
  _inherits(MediaManager, _Subject);

  var _super = _createSuper(MediaManager);

  function MediaManager(containerID) {
    var _this;

    _classCallCheck(this, MediaManager);

    _this = _super.call(this);
    _this.containerID = containerID;
    _this.mediaStateChanged = null;
    _this.isFullScreen = false;

    _this.__fullScreenEventListeners();

    return _this;
  }

  _createClass(MediaManager, [{
    key: "__fullScreenEventListeners",
    value: function __fullScreenEventListeners() {
      document.addEventListener('fullscreenchange', this._fullScreenChangeHandler.bind(this), false);
      document.addEventListener('mozfullscreenchange', this._fullScreenChangeHandler.bind(this), false);
      document.addEventListener('MSFullscreenChange', this._fullScreenChangeHandler.bind(this), false);
      document.addEventListener('webkitfullscreenchange', this._fullScreenChangeHandler.bind(this), false);
    }
  }, {
    key: "_fullScreenChangeHandler",
    value: function _fullScreenChangeHandler(event) {
      if (event.target.id !== this.containerID) {
        return;
      }

      if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        this.isFullScreen = false;
        this.mediaStateChanged(MediaManager.EXIT_FULL_SCREEN);
      } else {
        this.isFullScreen = true;
        this.mediaStateChanged(MediaManager.ENTER_FULL_SCREEN);
      }
    }
  }, {
    key: "toggleFullScreen",
    value: function toggleFullScreen() {
      var container = document.getElementById(this.containerID);

      if (this.isFullScreen) {
        this.requestExitFullScreen(container);
      } else {
        this.requestFullScreen(container);
      }
    }
  }, {
    key: "requestFullScreen",
    value: function requestFullScreen(container) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    }
  }, {
    key: "requestExitFullScreen",
    value: function requestExitFullScreen(container) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }]);

  return MediaManager;
}(Subject);

_defineProperty(MediaManager, "PLAYING", 0);

_defineProperty(MediaManager, "PAUSED", 1);

_defineProperty(MediaManager, "LOADED", 2);

_defineProperty(MediaManager, "ENTER_FULL_SCREEN", 3);

_defineProperty(MediaManager, "EXIT_FULL_SCREEN", 4);

var VideoTagManager = /*#__PURE__*/function (_MediaManager) {
  _inherits(VideoTagManager, _MediaManager);

  var _super2 = _createSuper(VideoTagManager);

  function VideoTagManager(containerID) {
    var _this2;

    _classCallCheck(this, VideoTagManager);

    _this2 = _super2.call(this, containerID);
    _this2.videoTimer = new VideoTimer(_this2.__timeHandler.bind(_assertThisInitialized(_this2)));
    return _this2;
  }

  _createClass(VideoTagManager, [{
    key: "play",
    value: function play() {
      var video = document.getElementById(this.containerID).querySelector("video");
      video.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      var video = document.getElementById(this.containerID).querySelector("video");
      video.pause();
    }
  }, {
    key: "restartVideo",
    value: function restartVideo() {
      this.loadProgress(0);
    }
  }, {
    key: "isVideoPlaying",
    value: function isVideoPlaying() {
      var video = document.getElementById(this.containerID).querySelector("video");
      return !video.paused;
    }
  }, {
    key: "getVideoDuration",
    value: function getVideoDuration() {
      var video = document.getElementById(this.containerID).querySelector("video");
      return video.duration;
    } //0-1

  }, {
    key: "loadProgress",
    value: function loadProgress(progress) {
      var video = document.getElementById(this.containerID).querySelector("video");
      video.currentTime = video.duration * progress;
      this.notify(video.currentTime * 1000);
    }
  }, {
    key: "setupVideo",
    value: function setupVideo() {
      var video = document.getElementById(this.containerID).querySelector("video");
      video.addEventListener('pause', this.__videoIsPaused.bind(this));
      video.addEventListener('play', this.__videoIsPlaying.bind(this));
      video.addEventListener('loadeddata', this.__videoLoaded.bind(this));
    }
  }, {
    key: "__videoIsPlaying",
    value: function __videoIsPlaying() {
      this.mediaStateChanged(MediaManager.PLAYING);
      this.videoTimer.play();
    }
  }, {
    key: "__videoIsPaused",
    value: function __videoIsPaused() {
      this.mediaStateChanged(MediaManager.PAUSED);
      this.videoTimer.pause();
    }
  }, {
    key: "__videoLoaded",
    value: function __videoLoaded() {
      var video = document.getElementById(this.containerID).querySelector("video");
      this.mediaStateChanged(MediaManager.LOADED, {
        duration: video.duration
      });
    }
  }, {
    key: "__timeHandler",
    value: function __timeHandler() {
      var video = document.getElementById(this.containerID).querySelector("video");
      this.notify(video.currentTime * 1000);
    } //0-1

  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      volume = volume > 1 ? 1 : volume;
      volume = volume < 0 ? 0 : volume;
      var video = document.getElementById(this.containerID).querySelector("video");
      video.volume = volume;
    }
  }, {
    key: "currentTime",
    get: function get() {
      var video = document.getElementById(this.containerID).querySelector("video");
      return video.currentTime;
    }
  }]);

  return VideoTagManager;
}(MediaManager);

var YoutubeVideoManager = /*#__PURE__*/function (_MediaManager2) {
  _inherits(YoutubeVideoManager, _MediaManager2);

  var _super3 = _createSuper(YoutubeVideoManager);

  function YoutubeVideoManager(containerID) {
    var _this3;

    _classCallCheck(this, YoutubeVideoManager);

    _this3 = _super3.call(this, containerID);
    _this3.player = null;
    _this3.firstTimePlaying = true;
    _this3.videoTimer = new VideoTimer(_this3.__timeHandler.bind(_assertThisInitialized(_this3)));
    return _this3;
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
      if (this.player === null) {
        return;
      }

      return this.player.getPlayerState() == YT.PlayerState.PLAYING;
    }
  }, {
    key: "loadProgress",
    //0-1
    value: function loadProgress(progress) {
      if (this.player === null) {
        return;
      }

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
      this.notify(seconds * 1000);
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
    value: function addYoutubeScript(iframeContainerID, videoID) {
      this.iframeContainerID = iframeContainerID;
      this.videoID = videoID;
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.appendChild(tag);
      window.onYouTubeIframeAPIReady = this.__onYouTubeIframeAPIReady.bind(this);
    }
  }, {
    key: "getVideoDuration",
    value: function getVideoDuration() {
      return this.player.getDuration();
    }
  }, {
    key: "__onYouTubeIframeAPIReady",
    value: function __onYouTubeIframeAPIReady() {
      var player = new YT.Player(this.iframeContainerID, {
        height: '360',
        width: '640',
        videoId: this.videoID,
        events: {
          'onReady': this.__onPlayerReady.bind(this),
          'onStateChange': this.__onPlayerStateChange.bind(this)
        },
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'disablekb': 1,
          'fs': 0,
          'playsinline': 1,
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
      this.mediaStateChanged(MediaManager.LOADED, {
        duration: this.player.getDuration()
      });
    }
  }, {
    key: "__onPlayerStateChange",
    value: function __onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        if (this.firstTimePlaying === true && this.player.getCurrentTime() >= 0.1) {
          this.__loadTime(0);
        }

        this.mediaStateChanged(MediaManager.PLAYING);
        this.videoTimer.play();
        this.firstTimePlaying = false;
      } else if (event.data == YT.PlayerState.PAUSED) {
        this.mediaStateChanged(MediaManager.PAUSED);
        this.videoTimer.pause();
      }
    }
  }, {
    key: "__timeHandler",
    value: function __timeHandler() {
      this.notify(this.player.getCurrentTime() * 1000);
    }
  }, {
    key: "currentTime",
    get: function get() {
      if (this.player === null) {
        return;
      }

      return this.player.getCurrentTime();
    }
  }]);

  return YoutubeVideoManager;
}(MediaManager);

var HTMLManager = /*#__PURE__*/function () {
  function HTMLManager() {
    _classCallCheck(this, HTMLManager);
  }

  _createClass(HTMLManager, [{
    key: "createElement",
    value: function createElement(type, config) {
      var element = document.createElement(type);

      if (config == null) {
        return element;
      }

      if (config["classList"] != null && Array.isArray(config.classList) && config.classList.length > 0) {
        config.classList.forEach(function (c) {
          element.classList.add(c);
        });
      }

      if (config["id"] != null) {
        element.id = config.id;
      }

      if (config["src"] != null) {
        element.src = config.src;
      }

      if (config["href"] != null) {
        element.href = config.href;
      }

      if (config["textContent"] != null) {
        element.textContent = config.textContent;
      }

      if (config["style"] != null) {
        for (var _i = 0, _Object$keys = Object.keys(config.style); _i < _Object$keys.length; _i++) {
          var k = _Object$keys[_i];

          if (element.style[k] !== undefined) {
            element.style[k] = config.style[k];
          }
        }
      }

      return element;
    }
  }, {
    key: "hexToRGBA",
    value: function hexToRGBA(hexColor, alpha) {
      var r = parseInt(hexColor.slice(1, 3), 16);
      var g = parseInt(hexColor.slice(3, 5), 16);
      var b = parseInt(hexColor.slice(5, 7), 16);
      r = isNaN(r) ? 255 : r;

      if (hexColor.length <= 4) {
        g = r;
        b = r;
      }

      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
  }, {
    key: "isDesktopBrowser",
    value: function isDesktopBrowser() {
      var check = false;

      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);

      return !check;
    }
  }]);

  return HTMLManager;
}();

var TouchEventsManager = /*#__PURE__*/function () {
  function TouchEventsManager() {
    _classCallCheck(this, TouchEventsManager);

    this.htmlManager = new HTMLManager();
  }

  _createClass(TouchEventsManager, [{
    key: "touchStart",
    value: function touchStart(element, handler) {
      var touchType = this.htmlManager.isDesktopBrowser() === true ? 'mousedown' : 'touchstart';
      var eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;
      element.addEventListener(touchType, function (e) {
        handler(eventType, e);
      });
    }
  }, {
    key: "touchEnd",
    value: function touchEnd(element, handler) {
      var touchType = this.htmlManager.isDesktopBrowser() === true ? 'mouseup' : 'touchend';
      var eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;
      element.addEventListener(touchType, function (e) {
        handler(eventType, e);
      });
    }
  }, {
    key: "touchLeave",
    value: function touchLeave(element, handler) {
      var touchType = this.htmlManager.isDesktopBrowser() === true ? 'mouseleave' : 'touchcancel';
      var eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;
      element.addEventListener(touchType, function (e) {
        handler(eventType, e);
      });
    }
  }, {
    key: "touchMove",
    value: function touchMove(element, handler) {
      var touchType = this.htmlManager.isDesktopBrowser() === true ? 'mousemove' : 'touchmove';
      var eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;
      element.addEventListener(touchType, function (e) {
        handler(eventType, e);
      });
    }
  }]);

  return TouchEventsManager;
}();

_defineProperty(TouchEventsManager, "IS_TOUCH_EVENT", 0);

_defineProperty(TouchEventsManager, "IS_CLICK_EVENT", 1);

var ControlButton = /*#__PURE__*/function () {
  function ControlButton(containerID) {
    _classCallCheck(this, ControlButton);

    this.htmlManager = new HTMLManager();
    this.containerID = containerID;
  }

  _createClass(ControlButton, [{
    key: "createControlButton",
    value: function createControlButton(buttonClass, buttonIcon, eventHandler) {
      var buttonContainer = this.htmlManager.createElement("div", {
        classList: ["control-button-container"]
      });
      var button = this.htmlManager.createElement("button", {
        classList: ["control-button", buttonClass]
      });
      var icon = this.htmlManager.createElement("i", {
        classList: [buttonIcon]
      });
      buttonContainer.appendChild(button);
      button.appendChild(icon);

      if (eventHandler !== null && eventHandler !== undefined) {
        buttonContainer.addEventListener("click", eventHandler);
      }

      return buttonContainer;
    }
  }, {
    key: "changeButtonIcon",
    value: function changeButtonIcon(buttonClass, iconName) {
      var button = document.getElementById(this.containerID).querySelector("." + buttonClass);

      if (button.length <= 0) {
        return;
      }

      var icon = button.getElementsByTagName("i");

      if (icon.length <= 0) {
        return;
      }

      icon[0].className = iconName;
    }
  }]);

  return ControlButton;
}();

var XFullScreenButton = /*#__PURE__*/function (_HTMLElement) {
  _inherits(XFullScreenButton, _HTMLElement);

  var _super4 = _createSuper(XFullScreenButton);

  function XFullScreenButton() {
    var _this4;

    _classCallCheck(this, XFullScreenButton);

    _this4 = _super4.call(this);
    _this4.clickHandler = null;
    _this4.htmlManager = new HTMLManager();

    var shadow = _this4.attachShadow({
      mode: 'open'
    });

    var button = _this4.__createButton();

    shadow.append(button);
    shadow.appendChild(_this4.__getStyle());
    return _this4;
  }

  _createClass(XFullScreenButton, [{
    key: "__createButton",
    value: function __createButton() {
      var buttonContainer = this.htmlManager.createElement("div", {
        classList: ["fs-button-container"]
      });
      buttonContainer.addEventListener('click', this.__buttonClicked.bind(this));
      this.icon = this.htmlManager.createElement("i", {
        classList: ["gg-maximize"]
      });
      buttonContainer.appendChild(this.icon);
      return buttonContainer;
    }
  }, {
    key: "__buttonClicked",
    value: function __buttonClicked(e) {
      this.clickHandler(e);
    }
  }, {
    key: "isFullScreenActive",
    value: function isFullScreenActive(isFS) {
      if (isFS === true) {
        this.icon.classList.remove("gg-maximize");
        this.icon.classList.add("gg-minimize");
      } else {
        this.icon.classList.remove("gg-minimize");
        this.icon.classList.add("gg-maximize");
      }
    }
  }, {
    key: "__getStyle",
    value: function __getStyle() {
      var style = document.createElement("style");
      style.textContent = "\n        \n            .fs-button-container {\n                background: lightgray;\n                border-radius: 5px;\n                cursor: pointer;\n                width: 35px;\n                height: 35px;\n                display:flex;\n            }\n\n            .fs-button-container:focus,\n            .fs-button-container:hover {\n                background: darkgray;\n            }\n\n            .gg-maximize {\n                box-sizing: border-box;\n                position: relative;\n                display: block;\n                transform: scale(var(--ggs,1));\n                width: 14px;\n                height: 14px;\n                box-shadow:\n                    -6px -6px 0 -4px,\n                    6px 6px 0 -4px,\n                    6px -6px 0 -4px,\n                    -6px 6px 0 -4px;\n                margin: auto;\n            }\n            \n            .gg-minimize {\n                box-sizing: border-box;\n                position: relative;\n                display: block;\n                transform: scale(var(--ggs,1));\n                width: 4px;\n                height: 4px;\n                box-shadow:\n                    -8px -4px 0 -1px,\n                    -6px -4px 0 -1px,\n                    8px 4px 0 -1px,\n                    6px 4px 0 -1px,\n                    8px -4px 0 -1px,\n                    6px -4px 0 -1px,\n                    -8px 4px 0 -1px,\n                    -6px 4px 0 -1px;\n                margin: auto;\n            }\n            .gg-minimize::after,\n            .gg-minimize::before {\n                content: \"\";\n                display: block;\n                box-sizing: border-box;\n                position: absolute;\n                width: 2px;\n                height: 18px;\n                border-top: 6px solid;\n                border-bottom: 6px solid;\n                box-shadow: 18px 0 0 -2px;\n                top: -7px;\n            }\n            .gg-minimize::after {\n                left: -3px;\n            }\n            .gg-minimize::before {\n                right: -3px;\n            }\n\n        ";
      return style;
    }
  }]);

  return XFullScreenButton;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('x-full-screen-button', XFullScreenButton);

var XPauseScreen = /*#__PURE__*/function (_HTMLElement2) {
  _inherits(XPauseScreen, _HTMLElement2);

  var _super5 = _createSuper(XPauseScreen);

  function XPauseScreen() {
    var _this5;

    _classCallCheck(this, XPauseScreen);

    _this5 = _super5.call(this);
    _this5.htmlManager = new HTMLManager();
    _this5.clickHandler = null;

    var shadow = _this5.attachShadow({
      mode: 'open'
    });

    var container = _this5.htmlManager.createElement('div', {
      classList: ["pause-container"]
    });

    container.addEventListener('click', _this5.__onClick.bind(_assertThisInitialized(_this5)));
    shadow.appendChild(container);
    shadow.appendChild(_this5.__getStyle());
    return _this5;
  }

  _createClass(XPauseScreen, [{
    key: "__onClick",
    value: function __onClick() {
      this.clickHandler();
    }
  }, {
    key: "__getStyle",
    value: function __getStyle() {
      var style = document.createElement("style");
      style.textContent = "\n\n            .pause-container {\n                width: 100%;\n                height: 100%;\n                background: rgba(0,0,0,0.1);\n                cursor: pointer;\n                display: flex;\n                margin: 0;\n            }\n\n            .play-image {\n                width: 100px;\n                height: 100px;\n                margin: auto;\n            }\n        ";
      return style;
    }
  }]);

  return XPauseScreen;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('x-pause-screen', XPauseScreen);

var XProgressBar = /*#__PURE__*/function (_HTMLElement3) {
  _inherits(XProgressBar, _HTMLElement3);

  var _super6 = _createSuper(XProgressBar);

  function XProgressBar() {
    var _this6;

    _classCallCheck(this, XProgressBar);

    _this6 = _super6.call(this);
    _this6.isMoving = false;
    _this6.htmlManager = new HTMLManager();
    _this6.maxLength = 100; //Max lenghts represents the video duration in seconds. Default value: 100s

    _this6.currentLength = 0;
    _this6.currentProgress = 0;
    _this6.progressBarChanged = null;

    var shadow = _this6.attachShadow({
      mode: 'open'
    });

    _this6.__setupEventsListeners();

    var bar = _this6.htmlManager.createElement("div", {
      classList: ["progress-bar"]
    });

    shadow.appendChild(_this6.__getStyle());
    shadow.appendChild(bar);
    return _this6;
  }

  _createClass(XProgressBar, [{
    key: "addMarkerAt",
    value: function addMarkerAt(length) {
      var marker = this.htmlManager.createElement("div", {
        classList: ["progress-bar-marker"]
      });

      var progress = this.__convertLengthToProgress(length);

      this.shadowRoot.appendChild(marker);
      marker.style.left = progress + "%";
    }
  }, {
    key: "__setupEventsListeners",
    value: function __setupEventsListeners() {
      var eventsManager = new TouchEventsManager();
      eventsManager.touchStart(this, this.__mouseDown.bind(this));
      eventsManager.touchEnd(document, this.__mouseUp.bind(this));
      eventsManager.touchLeave(document, this.__mouseLeave.bind(this));
      eventsManager.touchMove(document, this.__mouseMoving.bind(this));
    }
  }, {
    key: "__recalculatePosition",
    value: function __recalculatePosition(clientX) {
      var rect = this.getBoundingClientRect();
      var posX = clientX - rect.left;
      var progress = posX / rect.width;
      progress = progress > 1 ? 1 : progress;
      progress = progress < 0 ? 0 : progress;
      this.setCurrentLength(progress * this.maxLength);
    }
  }, {
    key: "__mouseLeave",
    value: function __mouseLeave(type, event) {
      if (!this.isMoving) {
        return;
      }

      this.isMoving = false;
      var clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.changedTouches[0].clientX : event.clientX;

      this.__recalculatePosition(clientX);

      this.progressBarChanged(this.currentProgress);
    }
  }, {
    key: "__mouseUp",
    value: function __mouseUp(type, event) {
      if (!this.isMoving) {
        return;
      }

      this.isMoving = false;
      var clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.changedTouches[0].clientX : event.clientX;

      this.__recalculatePosition(clientX);

      this.progressBarChanged(this.currentProgress);
    }
  }, {
    key: "__mouseMoving",
    value: function __mouseMoving(type, event) {
      if (!this.isMoving) {
        return;
      }

      var clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;

      this.__recalculatePosition(clientX);
    }
  }, {
    key: "__mouseDown",
    value: function __mouseDown(type, event) {
      this.isMoving = true;
      var clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;

      this.__recalculatePosition(clientX);
    }
  }, {
    key: "__convertLengthToProgress",
    value: function __convertLengthToProgress(length) {
      return Math.round(parseFloat(length) / parseFloat(this.maxLength) * 100);
    }
  }, {
    key: "setCurrentLength",
    value: function setCurrentLength(length) {
      this.currentLength = length;
      this.currentLength = this.currentLength > this.maxLength ? this.maxLength : this.currentLength;
      this.currentLength = this.currentLength < 0 ? 0 : this.currentLength;
      var progressBar = this.shadowRoot.querySelector(".progress-bar");

      var progress = this.__convertLengthToProgress(length);

      this.currentProgress = progress / 100;
      progressBar.style.width = progress + "%";
    }
  }, {
    key: "setMaxLength",
    value: function setMaxLength(length) {
      this.maxLength = length;
    }
  }, {
    key: "increment",
    value: function increment(value) {
      var inc = 1;

      if (value !== undefined && value !== null && !isNaN(value)) {
        inc = value;
      }

      this.setCurrentLength(this.currentLength + inc);
    }
  }, {
    key: "__getStyle",
    value: function __getStyle() {
      var style = document.createElement("style");
      style.textContent = "\n            .progress-bar {\n                background: rgb(97, 87, 245);\n                position: absolute;\n                height: 100%;\n                width: 0%;\n            }\n\n            .progress-bar-marker {\n                width: 7px;\n                height: 100%;\n                top: 0;\n                background: yellow;\n                position: absolute;\n            }\n        ";
      return style;
    }
  }]);

  return XProgressBar;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('x-progress-bar', XProgressBar);

var XTagButton = /*#__PURE__*/function (_HTMLElement4) {
  _inherits(XTagButton, _HTMLElement4);

  var _super7 = _createSuper(XTagButton);

  function XTagButton() {
    var _this7;

    _classCallCheck(this, XTagButton);

    _this7 = _super7.call(this);
    _this7.htmlManager = new HTMLManager();

    _this7.attachShadow({
      mode: 'open'
    });

    _this7.oldIsVisible = false;
    _this7.hoverHandler = null;
    _this7.clickHandler = null;
    _this7.leaveHandler = null;
    _this7.tagCircleContainer = _this7.htmlManager.createElement("div", {
      classList: ["tag-circle-container"]
    });
    _this7.anchor = _this7.htmlManager.createElement("a", {
      classList: ["tag-anchor"]
    });
    _this7.aspectRatioDiv = _this7.htmlManager.createElement("div", {
      classList: ["aspect-ratio-div"]
    });

    _this7.shadowRoot.appendChild(_this7.tagCircleContainer);

    _this7.shadowRoot.appendChild(_this7.anchor);

    _this7.shadowRoot.appendChild(_this7.aspectRatioDiv);

    _this7.shadowRoot.appendChild(_this7.__getStyle());

    _this7.__setupEventListeners(_assertThisInitialized(_this7));

    return _this7;
  }

  _createClass(XTagButton, [{
    key: "__setupEventListeners",
    value: function __setupEventListeners(element) {
      element.addEventListener('click', this.__onClick.bind(this));
      element.addEventListener('mouseenter', this.__onHover.bind(this));
      element.addEventListener('mouseleave', this.__onMouseLeave.bind(this));
    }
  }, {
    key: "__onClick",
    value: function __onClick(event) {
      this.clickHandler(event);
    }
  }, {
    key: "__onHover",
    value: function __onHover(event) {
      this.__animateFocusScale();

      this.hoverHandler(event);
    }
  }, {
    key: "__onMouseLeave",
    value: function __onMouseLeave(event) {
      this.__animateDefaultScale();

      this.leaveHandler(event);
    }
  }, {
    key: "__animateDefaultScale",
    value: function __animateDefaultScale() {
      this.anchor.classList.add("defaultScale");
      this.anchor.classList.remove("focusScale");
      this.anchor.classList.remove("appear");
    }
  }, {
    key: "__animateFocusScale",
    value: function __animateFocusScale() {
      this.anchor.classList.add("focusScale");
      this.anchor.classList.remove("defaultScale");
      this.anchor.classList.remove("appear");
    }
  }, {
    key: "__animateAppear",
    value: function __animateAppear() {
      this.style.visibility = "visible";
      this.anchor.classList.remove("disappear");
      this.tagCircleContainer.classList.remove("effectDissapear");
      this.anchor.classList.add("appear");
      this.tagCircleContainer.classList.add("effectAppear");
    }
  }, {
    key: "__animateDisappear",
    value: function __animateDisappear() {
      var thisReference = this;
      var timer = setInterval(function () {
        thisReference.style.visibility = "hidden";
        clearTimeout(timer);
      }, 350);
      this.anchor.classList.remove("appear");
      this.tagCircleContainer.classList.remove("effectAppear");
      this.anchor.classList.add("disappear");
      this.tagCircleContainer.classList.add("effectDissapear");
    }
  }, {
    key: "__getStyle",
    value: function __getStyle() {
      var style = document.createElement("style");
      style.textContent = "\n\n            .aspect-ratio-div {\n                margin-top: 100%;\n            }\n\n            .tag-circle-container {\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                border-radius: 50%;\n                opacity: 0;\n\n                -webkit-transition: opacity 0.3s;\n                -moz-transition: opacity 0.3s;\n                -ms-transition: opacity 0.3s;\n                -o-transition: opacity 0.3s;\n                transition: opacity 0.3s;\n\n                -webkit-animation: crescendo 1.5s alternate infinite ease-in;\n                -moz-animation: crescendo 1.5s alternate infinite ease-in;\n                -ms-animation: crescendo 1.5s alternate infinite ease-in;\n                -o-animation: crescendo 1.5s alternate infinite ease-in;\n                animation: crescendo 1.5s alternate infinite ease-in;\n\n            }\n\n            .tag-circle-container.effectAppear {\n                opacity: 1;\n            }\n\n            .tag-circle-container.effectDissapear {\n                opacity: 0;\n            }\n\n\n            @keyframes crescendo {\n                0% {transform: scale(1);}\n                100% {transform: scale(1.5);}\n            }\n\n            .tag-anchor {\n                display:block;\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                border-radius: 50%;\n                cursor: pointer;\n                transform: scale(0);\n                -webkit-transition: transform 0.3s;\n                -moz-transition: transform 0.3s;\n                -ms-transition: transform 0.3s;\n                -o-transition: transform 0.3s;\n                transition: transform 0.3s;\n            }\n\n            .tag-anchor.defaultScale {\n                transform: scale(1);\n            }\n\n            .tag-anchor.focusScale {\n                transform: scale(1.5);\n            }\n\n            .tag-anchor.disappear {\n                transform: scale(0);\n            }\n\n            .tag-anchor.appear {\n                transform: scale(1);\n            }\n        ";
      return style;
    }
  }, {
    key: "hexColor",
    set: function set(newValue) {
      var anchor = this.shadowRoot.querySelector(".tag-anchor");
      var tagCircleContainer = this.shadowRoot.querySelector(".tag-circle-container");
      var rgba = this.htmlManager.hexToRGBA(newValue, 0.5);
      anchor.style.background = newValue;
      tagCircleContainer.style.background = rgba;
    },
    get: function get() {
      return this.hexColor;
    }
  }, {
    key: "position",
    set: function set(newValue) {
      this.style.top = newValue.y + "%";
      this.style.left = newValue.x + "%";
      this.style.transform = "translate(-50%, -50%)";
    }
  }, {
    key: "isVisible",
    set: function set(newValue) {
      if (this.oldIsVisible === newValue) return;

      if (newValue === true) {
        this.__animateAppear();
      } else if (newValue === false) {
        this.__animateDisappear();
      }

      this.oldIsVisible = newValue;
    }
  }]);

  return XTagButton;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('x-tag-button', XTagButton);

var XTimeCounter = /*#__PURE__*/function (_HTMLElement5) {
  _inherits(XTimeCounter, _HTMLElement5);

  var _super8 = _createSuper(XTimeCounter);

  function XTimeCounter() {
    var _this8;

    _classCallCheck(this, XTimeCounter);

    _this8 = _super8.call(this); //Time in seconds

    _this8.attachShadow({
      mode: 'open'
    });

    _this8.htmlManager = new HTMLManager();
    _this8.currentTime = 0;

    var timeTextElement = _this8.htmlManager.createElement('p', {
      classList: ['time-text-element'],
      textContent: "00:00"
    });

    _this8.shadowRoot.appendChild(timeTextElement);

    _this8.shadowRoot.appendChild(_this8.__getStyle());

    return _this8;
  }

  _createClass(XTimeCounter, [{
    key: "incrementTime",
    value: function incrementTime() {
      this.currentTime = this.currentTime + 1;
    }
  }, {
    key: "__getStyle",
    value: function __getStyle() {
      var style = document.createElement('style');
      style.textContent = "\n            .time-text-element {\n                color: white;\n                margin: 0;\n            }\n        ";
      return style;
    }
  }, {
    key: "currentTime",
    set: function set(newValue) {
      var timeTextElement = this.shadowRoot.querySelector(".time-text-element");
      if (timeTextElement == null) return;
      var hours = Math.floor(newValue / 3600).toString().padStart(2, "0");
      var min = Math.floor((newValue - hours * 3600) / 60).toString().padStart(2, "0");
      var sec = Math.floor(newValue - hours * 3600 - min * 60).toString().padStart(2, "0");
      var text = hours <= 0 ? "" : hours + ":";
      text += min + ":" + sec;
      timeTextElement.textContent = text;
    }
  }]);

  return XTimeCounter;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('x-time-counter', XTimeCounter);

var XVolumeBar = /*#__PURE__*/function (_HTMLElement6) {
  _inherits(XVolumeBar, _HTMLElement6);

  var _super9 = _createSuper(XVolumeBar);

  function XVolumeBar() {
    var _this9;

    _classCallCheck(this, XVolumeBar);

    _this9 = _super9.call(this);
    _this9.htmlManager = new HTMLManager();
    _this9.maxVolume = 100;
    _this9.volume = 0;
    _this9.isVolMoving = false;

    _this9.volumeChanged = function () {};

    var shadow = _this9.attachShadow({
      mode: 'open'
    });

    var container = _this9.htmlManager.createElement("div", {
      classList: ["volume-bar-container"]
    });

    var volumeButton = _this9.__createVolumeButton();

    var volumeBar = _this9.htmlManager.createElement("div", {
      classList: ["volume-bar-rect"]
    });

    var volumeLevelBar = _this9.htmlManager.createElement("div", {
      classList: ["volume-bar-level"]
    });

    container.appendChild(volumeButton);
    container.appendChild(volumeBar);
    volumeBar.appendChild(volumeLevelBar);
    shadow.appendChild(container);
    shadow.appendChild(_this9.__getStyle());

    _this9.__setupEventsListeners(volumeBar, container);

    return _this9;
  }

  _createClass(XVolumeBar, [{
    key: "__createVolumeButton",
    value: function __createVolumeButton() {
      var buttonContainer = this.htmlManager.createElement("div", {
        classList: ["volume-icon-container"]
      });
      var button = this.htmlManager.createElement("button", {
        classList: ["volume-button"]
      });
      var icon = this.htmlManager.createElement("i", {
        classList: ["gg-volume"]
      });
      buttonContainer.appendChild(button);
      button.appendChild(icon);
      return buttonContainer;
    }
  }, {
    key: "__setupEventsListeners",
    value: function __setupEventsListeners(volumeBar, container) {
      var eventsManager = new TouchEventsManager();
      eventsManager.touchMove(document, this.__mouseMoving.bind(this));
      eventsManager.touchStart(volumeBar, this.__mouseDown.bind(this));
      eventsManager.touchLeave(container, this.__mouseLeaveElement.bind(this));
      eventsManager.touchEnd(document, this.__mouseUp.bind(this));
      eventsManager.touchLeave(document, this.__mouseLeaveDocument.bind(this));
      container.onmouseenter = this.__mouseEnter.bind(this);
    }
  }, {
    key: "__mouseEnter",
    value: function __mouseEnter() {
      var volumeBar = this.shadowRoot.querySelector(".volume-bar-rect");
      volumeBar.classList.add("volume-bar-rect-focus");
    }
  }, {
    key: "__mouseLeaveDocument",
    value: function __mouseLeaveDocument() {
      this.isVolMoving = false;
    }
  }, {
    key: "__mouseLeaveElement",
    value: function __mouseLeaveElement() {
      if (this.isVolMoving) {
        return;
      }

      var volumeBar = this.shadowRoot.querySelector(".volume-bar-rect");
      volumeBar.classList.remove('volume-bar-rect-focus');
    }
  }, {
    key: "__mouseUp",
    value: function __mouseUp() {
      this.isVolMoving = false;
    }
  }, {
    key: "__mouseMoving",
    value: function __mouseMoving(type, event) {
      if (!this.isVolMoving) {
        return;
      }

      var clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;

      this.__calculateVolumePosition(clientX);
    }
  }, {
    key: "__mouseDown",
    value: function __mouseDown(type, event) {
      this.isVolMoving = true;
      var clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;

      this.__calculateVolumePosition(clientX);
    }
  }, {
    key: "__calculateVolumePosition",
    value: function __calculateVolumePosition(clientX) {
      var volumeBarRect = this.shadowRoot.querySelector(".volume-bar-rect");
      var rect = volumeBarRect.getBoundingClientRect();
      var posX = clientX - rect.left;
      var progress = posX / rect.width;
      this.setVolume(progress * this.maxVolume);
    }
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      volume = volume < 0 ? 0 : volume;
      volume = volume > this.maxVolume ? this.maxVolume : volume;
      this.volume = volume;
      this.volumeChanged(volume);
      var volumeLevelBar = this.shadowRoot.querySelector(".volume-bar-level");
      volumeLevelBar.style.width = volume + "%";
    }
  }, {
    key: "__getStyle",
    value: function __getStyle() {
      var style = document.createElement("style");
      style.textContent = "\n            .volume-bar-container {\n                margin-right: 0.5px;\n                cursor: pointer;\n                display: flex;\n            }\n\n            .volume-bar-container:hover,\n            .volume-bar-container:focus {\n                color: rgb(97, 87, 245);\n            }\n            \n            .volume-bar-rect {\n                display: none;\n                height: 3px;\n                background:white;\n                width: 50px;\n                margin: auto;\n                cursor: pointer;\n                transition: height 0.2s;\n            }\n\n            .volume-bar-rect:hover,\n            .volume-bar-rect:focus {\n                height: 7px;\n            }\n            \n             .volume-bar-rect-focus {\n                display: block;\n            }\n\n            .volume-bar-level {\n                height: 100%;\n                width: 0%;\n                background: rgb(97, 87, 245);\n            }\n            \n            .volume-icon-container {\n                background: rgba(0,0,0,0);\n                height: 2em;\n                padding-left: 0.4em;\n                padding-right: 0.4em;\n                border: none;\n                cursor: pointer;\n            }\n            \n            .volume-button {\n                color: white;  \n                border: none;\n                outline: none;\n                background-color: rgba(0,0,0,0);\n                height: 100%; \n                width: 2em;\n                margin: auto;\n                padding: 0;\n                cursor: pointer;\n            }\n            \n            .volume-button:hover,\n            .volume-button:focus {\n                color: rgb(97, 87, 245);\n            }\n\n            /* ICON */\n            /* ICON */\n            .gg-volume {\n                box-sizing: border-box;\n                position: relative;\n                display: block;\n                transform: scale(var(--ggs,1));\n                width: 8px;\n                height: 8px;\n                border: 2px solid;\n                border-right: 0;\n                -webkit-perspective: 12px;\n                perspective: 12px;\n                border-top-left-radius: 4px;\n                border-bottom-left-radius: 4px;\n                margin: 0;\n            }\n            .gg-volume::after,\n            .gg-volume::before {\n                content: \"\";\n                display: block;\n                box-sizing: border-box;\n                position: absolute;\n            }\n            .gg-volume::before {\n                left: 2px;\n                transform: rotateY(-90deg);\n                width: 10px;\n                height: 10px;\n                border: 2px solid;\n                border-left: 0;\n                top: -3px;\n            }\n            .gg-volume::after {\n                width: 8px;\n                height: 16px;\n                border: 6px double;\n                border-left: 0;\n                border-top-right-radius: 100px;\n                border-bottom-right-radius: 100px;\n                right: -14px;\n                top: -6px;\n            }    \n        ";
      return style;
    }
  }]);

  return XVolumeBar;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('x-volume-bar', XVolumeBar);

var BottomBarController = /*#__PURE__*/function () {
  function BottomBarController(hypervideoController, containerID) {
    _classCallCheck(this, BottomBarController);

    this.hypervideoController = hypervideoController;
    this.htmlManager = new HTMLManager();
    this.containerID = containerID;
    this.controlButton = new ControlButton(containerID);
  }

  _createClass(BottomBarController, [{
    key: "addBottomBar",
    value: function addBottomBar(container) {
      var bottomController = this.htmlManager.createElement("div", {
        classList: ["bottom-controller"]
      });
      container.appendChild(bottomController);
      this.playButton = this.controlButton.createControlButton("control-play-button", "gg-play-button", this.__playButtonClicked.bind(this));
      this.replayButton = this.controlButton.createControlButton("control-repeat-button", "gg-repeat", this.__restartVideo.bind(this));
      this.timeCounter = this.__createTimeCounter();
      this.progressBar = this.__createProgressBar();
      this.volumeBar = this.__createVolumeBar();
      bottomController.appendChild(this.playButton);
      bottomController.appendChild(this.replayButton);

      if (this.htmlManager.isDesktopBrowser() === true) {
        this.fullScreenButton = this.controlButton.createControlButton("control-full-screen-button", "gg-maximize", this.__toggleFullScreen.bind(this));
        bottomController.appendChild(this.fullScreenButton);
      }

      bottomController.appendChild(this.timeCounter);
      bottomController.appendChild(this.progressBar);
      bottomController.appendChild(this.volumeBar);
    }
  }, {
    key: "videoStateChanged",
    value: function videoStateChanged(state, target) {
      switch (state) {
        case MediaManager.PLAYING:
          this.controlButton.changeButtonIcon("control-play-button", "gg-play-pause");
          break;

        case MediaManager.PAUSED:
          this.controlButton.changeButtonIcon("control-play-button", "gg-play-button");
          break;

        case MediaManager.LOADED:
          this.volumeBar.setVolume(50);
          this.videoLength = target.duration;
          this.progressBar.setMaxLength(target.duration * 1000);

          this.__setProgressBarTimestamps();

          break;

        case MediaManager.ENTER_FULL_SCREEN:
          this.controlButton.changeButtonIcon("control-full-screen-button", "gg-minimize");
          break;

        case MediaManager.EXIT_FULL_SCREEN:
          this.controlButton.changeButtonIcon("control-full-screen-button", "gg-maximize");
          break;

        default:
      }
    }
  }, {
    key: "videoTimeChange",
    value: function videoTimeChange(time) {
      this.progressBar.setCurrentLength(time);
      this.timeCounter.currentTime = time / 1000;
    }
  }, {
    key: "__restartVideo",
    value: function __restartVideo() {
      this.progressBar.setCurrentLength(0);
      this.hypervideoController.restartVideo();
    }
  }, {
    key: "__toggleFullScreen",
    value: function __toggleFullScreen() {
      this.hypervideoController.toggleFullScreen();
    }
  }, {
    key: "__playButtonClicked",
    value: function __playButtonClicked() {
      this.hypervideoController.play();
    }
  }, {
    key: "__createTimeCounter",
    value: function __createTimeCounter() {
      var timeCounter = this.htmlManager.createElement("x-time-counter", {
        classList: ["time-counter"]
      });
      return timeCounter;
    }
  }, {
    key: "__createProgressBar",
    value: function __createProgressBar() {
      var progressBar = this.htmlManager.createElement("x-progress-bar", {
        classList: ["progress-container"]
      });
      progressBar.progressBarChanged = this.__progressBarChanged.bind(this);

      if (this.videoLength !== null) {
        progressBar.setMaxLength(this.videoLength * 1000);
      }

      return progressBar;
    }
  }, {
    key: "__progressBarChanged",
    value: function __progressBarChanged(progress) {
      this.hypervideoController.loadVideoProgress(progress);
    }
  }, {
    key: "__setProgressBarTimestamps",
    value: function __setProgressBarTimestamps() {
      var _iterator = _createForOfIteratorHelper(this.tags),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var t = _step.value;
          var timestamp = t.timeConfig.timestamp;
          this.progressBar.addMarkerAt(timestamp * 1000);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "__createVolumeBar",
    value: function __createVolumeBar() {
      var volumeBar = this.htmlManager.createElement("x-volume-bar", {
        classList: ["volume-bar"]
      });
      volumeBar.volumeChanged = this.__volumeChanged.bind(this);
      return volumeBar;
    }
  }, {
    key: "__volumeChanged",
    value: function __volumeChanged(volume) {
      this.hypervideoController.setVolume(volume / 100);
    }
  }]);

  return BottomBarController;
}();

var HyperimageController = /*#__PURE__*/function () {
  function HyperimageController(imageSRC, containerID, config, mediaManager) {
    _classCallCheck(this, HyperimageController);

    this.containerID = containerID;
    this.imageSRC = imageSRC;
    this.config = config;
    this.htmlManager = new HTMLManager();
    this.tagController = new TagsController(this.containerID, null);
    this.mediaManager = mediaManager;
    this.mediaManager.mediaStateChanged = this.__mediaStateChanged.bind(this);
  }

  _createClass(HyperimageController, [{
    key: "__mediaStateChanged",
    value: function __mediaStateChanged(state, target) {
      switch (state) {
        case MediaManager.ENTER_FULL_SCREEN:
          this.__fullScreenStateChanged(true);

          break;

        case MediaManager.EXIT_FULL_SCREEN:
          this.__fullScreenStateChanged(false);

          break;

        default:
      }
    }
  }, {
    key: "__fullScreenStateChanged",
    value: function __fullScreenStateChanged(isFullScreen) {
      var _this10 = this;

      if (this.imageContainer != null) {
        var hypervideo = document.getElementById(this.containerID);

        if (isFullScreen === true) {
          setTimeout(function () {
            hypervideo.style.width = "100%";
            hypervideo.style.height = "100%";
            var imageWidthMargin = (window.innerWidth - _this10.imageElement.naturalWidth) / _this10.imageElement.naturalWidth;
            var imageHeightMargin = (window.innerHeight - _this10.imageElement.naturalHeight) / _this10.imageElement.naturalHeight;
            var shouldWidthExpand = imageHeightMargin >= imageWidthMargin;
            var aspectRatio = _this10.imageElement.naturalWidth / _this10.imageElement.naturalHeight;
            var resizedWidth = window.innerHeight * aspectRatio + "px";
            var resizedHeight = window.innerWidth * (1 / aspectRatio) + "px";
            console.log(resizedWidth, resizedHeight);
            _this10.imageElement.style.width = "100%";
            _this10.imageElement.style.height = "100%";
            _this10.imageContainer.style.width = shouldWidthExpand ? "100%" : resizedWidth;
            _this10.imageContainer.style.height = !shouldWidthExpand ? "100%" : resizedHeight;
          }, 500);
        } else {
          var isVideoWidder = this.imageElement.naturalWidth >= this.imageElement.naturalHeight;
          var aspectRatio = this.imageElement.naturalWidth / this.imageElement.naturalHeight;
          hypervideo.style.width = isVideoWidder ? this.config.size.width + "px" : this.config.size.height * aspectRatio + "px";
          hypervideo.style.height = !isVideoWidder ? this.config.size.height + "px" : this.config.size.width * (1 / aspectRatio) + "px";
          this.imageElement.style.width = "inherit";
          this.imageElement.style.height = "inherit";
          this.imageContainer.style.width = "inherit";
          this.imageContainer.style.height = "inherit";
        }
      }

      if (this.tagController != null) {
        this.tagController.fullScreenStateChanged(isFullScreen);
      }

      if (this.fullScreenButton != null) {
        this.fullScreenButton.isFullScreenActive(isFullScreen);
      }
    }
  }, {
    key: "__imgLoaded",
    value: function __imgLoaded() {
      this.__addTags();

      var hypervideo = document.getElementById(this.containerID);
      var isVideoWidder = this.imageElement.naturalWidth >= this.imageElement.naturalHeight;
      var aspectRatio = this.imageElement.naturalWidth / this.imageElement.naturalHeight;
      hypervideo.style.width = isVideoWidder ? this.config.size.width + "px" : this.config.size.height * aspectRatio + "px";
      hypervideo.style.height = !isVideoWidder ? this.config.size.height + "px" : this.config.size.width * (1 / aspectRatio) + "px";
    }
  }, {
    key: "createSkeleton",
    value: function createSkeleton() {
      var hypervideo = document.getElementById(this.containerID);
      var container = this.htmlManager.createElement("div", {
        classList: ["hypervideo-container"]
      });
      this.imageContainer = this.htmlManager.createElement("div", {
        classList: ["img-container"]
      });
      hypervideo.appendChild(container);
      container.appendChild(this.imageContainer);

      this.__addImageElement(this.imageContainer);

      this.tagController.addTagContainer(this.imageContainer);

      if (this.htmlManager.isDesktopBrowser() === true) {
        this.__addFullScreenButton(container);
      }
    }
  }, {
    key: "__addFullScreenButton",
    value: function __addFullScreenButton(container) {
      this.fullScreenButton = this.htmlManager.createElement("x-full-screen-button");
      var thisReference = this;

      this.fullScreenButton.clickHandler = function () {
        thisReference.mediaManager.toggleFullScreen();
      };

      container.appendChild(this.fullScreenButton);
    }
  }, {
    key: "__addImageElement",
    value: function __addImageElement(container) {
      this.imageElement = this.htmlManager.createElement("img", {
        classList: ["hyperimage"],
        src: this.imageSRC
      });
      container.appendChild(this.imageElement);
      this.imageElement.addEventListener('load', this.__imgLoaded.bind(this));
    }
  }, {
    key: "__addTags",
    value: function __addTags() {
      this.tagController.addTags(this.config.tags, false);

      var _iterator2 = _createForOfIteratorHelper(this.config.tags),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var tag = _step2.value;
          this.tagController.setTagVisible(tag.id, true);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);

  return HyperimageController;
}();

var Hypervideo = /*#__PURE__*/function () {
  function Hypervideo(videoURL, videoType, hypervideoID) {
    _classCallCheck(this, Hypervideo);

    this.videoURL = videoURL;
    this.videoType = videoType;
    this.containerID = hypervideoID;
  }

  _createClass(Hypervideo, [{
    key: "__isDOMLoaded",
    value: function __isDOMLoaded() {
      return document != null && (document.readyState === "interactive" || document.readyState === "complete");
    }
  }, {
    key: "setupHypervideo",
    value: function setupHypervideo(config) {
      if (!this.__isDOMLoaded()) {
        throw "Error: Can't setup an hypervideo if DOM is not loaded.";
      }

      this.__addGlobalStyle();

      this.config = this.__assingIdToTags(config);
      var mediaManagerFactory = new MediaManagerFactory();
      var mediaManager = mediaManagerFactory.create(this.videoType, this.containerID);

      if (this.videoType === Hypervideo.IMAGE_TYPE) {
        var hyperImageController = new HyperimageController(this.videoURL, this.containerID, this.config, mediaManager);
        hyperImageController.createSkeleton();
      } else {
        var hypervideoController = new HypervideoController(this.videoURL, this.videoType, this.containerID, mediaManager, this.config);
        hypervideoController.createSkeleton();
      }
    }
  }, {
    key: "__assingIdToTags",
    value: function __assingIdToTags(config) {
      var _this11 = this;

      try {
        var i = 0;
        config.tags = config.tags.map(function (t) {
          t.id = _this11.containerID + "-tag-" + i++;
          return t;
        });
        return config;
      } catch (error) {
        throw "Error: Not valid JSON";
      }
    }
  }, {
    key: "__addGlobalStyle",
    value: function __addGlobalStyle() {
      var style = document.createElement('style');
      style.textContent = "\n            .hypervideo:-moz-full-screen {\n                background: black;\n                width: 100% !important;\n                height: 100% !important;\n            }\n            \n            .hypervideo:-webkit-full-screen {\n                background: black;\n                width: 100% !important;\n                height: 100% !important;\n            }\n            \n            .hypervideo:fullscreen {\n                background: black;\n                width: 100% !important;\n                height: 100% !important;\n            }\n\n            video {\n                width: 100%;\n                height: 100%;\n                background: black;\n            }\n            \n            button {\n                cursor: pointer;\n            }\n            \n            .youtube-frame {\n                width: 100%;\n                height: 100%;\n                position: absolute;\n                top: 0;\n                left: 0;\n            }\n    \n            .hyperimage {\n                width: 100%;\n                height: 100%;\n                object-fit: fill;\n            }\n            \n            .hypervideo-container {\n                position: relative;\n                width: 100%;\n                height: 100%;\n                text-align:center;\n                user-drag: none; \n                user-select: none;\n                -moz-user-select: none;\n                -webkit-user-drag: none;\n                -webkit-user-select: none;\n                -ms-user-select: none;\n            }\n    \n            .img-container {\n                margin: auto;\n                position: relative;\n                width: 100%;\n                height: 100%;\n                text-align: center;\n            }\n            \n            /* Top control bar */\n            .top-controller {\n                background: rgb(0,0,0);\n                background: linear-gradient(180deg, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                opacity: 0;\n                transition: opacity 0.2s;\n                text-align:left;\n            }\n    \n            .top-title {\n                color:white;\n                margin: 1em;\n                overflow: hidden;\n                text-overflow: ellipsis;\n                display: -webkit-box;\n                -webkit-line-clamp: 1;\n                -webkit-box-orient: vertical;\n            }\n    \n            .hypervideo-container:hover > .top-controller,\n            .hypervideo-container:focus > .top-controller {\n                opacity: 1;\n            }\n            \n    \n            /* Tags */\n    \n            x-tag-button {\n                pointer-events: all;\n                position: absolute;\n                width: 5%;\n                top: 50px;\n                left: 50px;\n                display: block;\n                visibility: hidden;\n            }\n    \n            .tags-container {\n                pointer-events: none;\n                position: absolute;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n            }\n    \n            /*  Bottom control bar  */\n            .bottom-controller {\n                display: flex;\n                opacity: 0;\n                justify-content: flex-start;\n                position: absolute;\n                bottom: 0;\n                left: 0;\n                right: 0;\n                background: rgb(0,0,0);\n                background: linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);\n                padding: 4px;\n                transition: opacity 0.2s;\n            }\n    \n            .hypervideo-container:hover > .bottom-controller,\n            .hypervideo-container:focus > .bottom-controller {\n                opacity: 1;\n            }\n            \n            .control-button-container {\n                background: rgba(0,0,0,0);\n                height: 2em;\n                padding-left: 0.4em;\n                padding-right: 0.4em;\n                border: none;\n                cursor: pointer;\n            }\n            \n            .control-button-container:not(:last-child) {\n                margin-right: 2px;\n            }\n            \n            .control-button {\n                color: white;  \n                border: none;\n                outline: none;\n                background-color: rgba(0,0,0,0);\n                height: 100%; \n                width: 2em;\n                margin: auto;\n                padding: 0;\n            }\n            \n            .control-button:hover,\n            .control-button:focus {\n                color: rgb(97, 87, 245);\n            }\n            \n            .progress-container {\n                flex-grow: 1;\n                margin-right: 2px;\n                height: 3px;\n                background: rgba(210,210,210,0.68);\n                align-self: center;\n                position: relative;\n                cursor: pointer; \n                transition: height 0.2s;\n            }        \n    \n            .progress-container:focus,\n            .progress-container:hover {\n                height: 5px;\n            }\n    \n            x-time-counter {\n                display: flex;\n                margin-right: 1em;\n                align-items: center;\n            }\n    \n            x-pause-screen {\n                width: 100%;\n                height: 100%;\n                margin: auto;\n                position: absolute;\n                top: 0;\n                left: 0;\n            }\n    \n            x-full-screen-button {\n                position: absolute;\n                bottom: 1em;\n                right: 1em;\n            }\n    \n            \n            /* ICONS */\n            \n            .gg-play-button {\n                box-sizing: border-box;\n                position: relative;\n                display: block;\n                transform: scale(var(--ggs,1));\n                width: 22px;\n                height: 22px;\n                margin: auto; /*Aquesta linia s'ha d'afegir*/\n            }\n            .gg-play-button::before {\n                content: \"\";\n                display: block;\n                box-sizing: border-box;\n                position: absolute;\n                width: 0;\n                height: 10px;\n                border-top: 5px solid transparent;\n                border-bottom: 5px solid transparent;\n                border-left: 6px solid;\n                top: 6px;\n                left: 9px;\n            }\n            \n            .gg-repeat {\n                box-sizing: border-box;\n                position: relative;\n                display: block;\n                transform: scale(var(--ggs,1));\n                box-shadow:\n                    -2px -2px 0 0,\n                    2px 2px 0 0;\n                width: 14px;\n                height: 6px;\n                margin: auto;\n            }\n            .gg-repeat::after,\n            .gg-repeat::before {\n                content: \"\";\n                display: block;\n                box-sizing: border-box;\n                position: absolute;\n                width: 0;\n                height: 0;\n                border-top: 3px solid transparent;\n                border-bottom: 3px solid transparent;\n            }\n            .gg-repeat::before {\n                border-left: 5px solid;\n                top: -4px;\n                right: 0;\n            }\n            .gg-repeat::after {\n                border-right: 5px solid;\n                bottom: -4px;\n                left: 0;\n            }\n            .gg-maximize {\n                box-sizing: border-box;\n                position: relative;\n                display: block;\n                transform: scale(var(--ggs,1));\n                width: 14px;\n                height: 14px;\n                box-shadow:\n                    -6px -6px 0 -4px,\n                    6px 6px 0 -4px,\n                    6px -6px 0 -4px,\n                    -6px 6px 0 -4px;\n                margin: auto;\n            }\n            \n            .gg-minimize {\n                box-sizing: border-box;\n                position: relative;\n                display: block;\n                transform: scale(var(--ggs,1));\n                width: 4px;\n                height: 4px;\n                box-shadow:\n                    -8px -4px 0 -1px,\n                    -6px -4px 0 -1px,\n                    8px 4px 0 -1px,\n                    6px 4px 0 -1px,\n                    8px -4px 0 -1px,\n                    6px -4px 0 -1px,\n                    -8px 4px 0 -1px,\n                    -6px 4px 0 -1px;\n                margin: auto;\n            }\n            .gg-minimize::after,\n            .gg-minimize::before {\n                content: \"\";\n                display: block;\n                box-sizing: border-box;\n                position: absolute;\n                width: 2px;\n                height: 18px;\n                border-top: 6px solid;\n                border-bottom: 6px solid;\n                box-shadow: 18px 0 0 -2px;\n                top: -7px;\n            }\n            .gg-minimize::after {\n                left: -3px;\n            }\n            .gg-minimize::before {\n                right: -3px;\n            }\n            \n            .gg-play-pause {\n                box-sizing: border-box;\n                position: relative;\n                display: block;\n                transform: scale(var(--ggs,1));\n                width: 8px;\n                height: 10px;\n                border-left: 3px solid;\n                border-right: 3px solid;\n                margin: auto;\n            }\n        ";
      document.querySelector("head").appendChild(style);
    }
  }]);

  return Hypervideo;
}();

_defineProperty(Hypervideo, "YOUTUBE_TYPE", "YOUTUBE");

_defineProperty(Hypervideo, "VIDEO_TYPE", "VIDEO");

_defineProperty(Hypervideo, "IMAGE_TYPE", "IMAGE");

var HypervideoController = /*#__PURE__*/function () {
  function HypervideoController(videoSRC, videoType, containerID, videoManager, config) {
    _classCallCheck(this, HypervideoController);

    this.videoLength = null;
    this.containerID = containerID;
    this.videoSRC = videoSRC;
    this.videoManager = videoManager;
    this.videoType = videoType;
    this.config = config;
    this.htmlManager = new HTMLManager();
    this.videoManager.mediaStateChanged = this.__videoStateChanged.bind(this);
    this.bottomBarController = new BottomBarController(this, containerID);
    this.topBarController = new TopBarController(this, containerID);
    this.tagController = new TagsController(this.containerID, videoManager);
  }

  _createClass(HypervideoController, [{
    key: "__videoStateChanged",
    value: function __videoStateChanged(state, target) {
      switch (state) {
        case MediaManager.LOADED:
          this.videoManager.setVolume(0.5);
          this.videoLength = target.duration;

          this.__filterTagsByDuration();

          this.bottomBarController.tags = this.config.tags;

          this.__addVideoTimeObserver();

          this.__addTags();

          break;

        case MediaManager.ENTER_FULL_SCREEN:
        case MediaManager.EXIT_FULL_SCREEN:
          if (this.tagController != null) {
            this.tagController.fullScreenStateChanged(state === MediaManager.ENTER_FULL_SCREEN);
          }

          break;

        default:
      }

      this.bottomBarController.videoStateChanged(state, target);
    }
  }, {
    key: "restartVideo",
    value: function restartVideo() {
      this.videoManager.restartVideo();
    }
  }, {
    key: "toggleFullScreen",
    value: function toggleFullScreen() {
      this.videoManager.toggleFullScreen();
    }
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      this.videoManager.setVolume(volume);
    }
  }, {
    key: "loadVideoProgress",
    value: function loadVideoProgress(progress) {
      this.videoManager.loadProgress(progress);
    }
  }, {
    key: "play",
    value: function play() {
      if (!this.videoManager.isVideoPlaying()) {
        this.videoManager.play();
      } else {
        this.videoManager.pause();
      }
    }
  }, {
    key: "createSkeleton",
    value: function createSkeleton() {
      var hypervideo = document.getElementById(this.containerID);
      var container = this.htmlManager.createElement("div", {
        classList: ["hypervideo-container"]
      });

      this.__maintainAspectRatio(hypervideo);

      hypervideo.appendChild(container);

      this.__addVideoElement(container);

      if (this.videoType != Hypervideo.YOUTUBE_TYPE) {
        this.topBarController.addTopBar(container, this.config.videoTitle);
      }

      this.__addPauseScreen(container);

      this.tagController.addTagContainer(container);
      this.bottomBarController.addBottomBar(container);
    }
  }, {
    key: "__maintainAspectRatio",
    value: function __maintainAspectRatio(hypervideo) {
      var isVideoWidder = this.config.size.width >= this.config.size.height;
      hypervideo.style.width = isVideoWidder ? this.config.size.width + "px" : Math.floor(this.config.size.height * HypervideoController.ASPECT_RATIO.x / HypervideoController.ASPECT_RATIO.y) + "px";
      hypervideo.style.height = !isVideoWidder ? this.config.size.height + "px" : Math.floor(this.config.size.width * HypervideoController.ASPECT_RATIO.y / HypervideoController.ASPECT_RATIO.x) + "px";
    }
  }, {
    key: "__filterTagsByDuration",
    value: function __filterTagsByDuration() {
      var _this12 = this;

      this.config.tags = this.config.tags.filter(function (e) {
        return e.timeConfig.timestamp <= _this12.videoManager.getVideoDuration();
      });
    }
  }, {
    key: "__addVideoTag",
    value: function __addVideoTag(container) {
      this.videoElementID = "video-" + this.containerID;
      var video = this.htmlManager.createElement("video", {
        id: this.videoElementID,
        src: this.videoSRC
      });
      video.setAttribute("webkit-playsinline", ""); //Block full screen on mobile

      video.setAttribute("playsinline", "");
      container.appendChild(video);
      this.videoManager.setupVideo();
    }
  }, {
    key: "__addVideoFromYotube",
    value: function __addVideoFromYotube(container) {
      this.videoElementID = "video-" + this.containerID;
      var youtubeFrameContainer = this.htmlManager.createElement("div", {
        classList: ["youtube-frame"],
        id: this.videoElementID
      });
      container.appendChild(youtubeFrameContainer);
      this.videoManager.addYoutubeScript(this.videoElementID, this.videoSRC);
    }
  }, {
    key: "__addVideoElement",
    value: function __addVideoElement(container) {
      switch (this.videoType) {
        case Hypervideo.YOUTUBE_TYPE:
          this.__addVideoFromYotube(container);

          break;

        default:
          this.__addVideoTag(container);

          break;
      }
    }
  }, {
    key: "__addPauseScreen",
    value: function __addPauseScreen(container) {
      var pauseScreen = this.htmlManager.createElement("x-pause-screen");
      var thisReference = this;

      pauseScreen.clickHandler = function () {
        if (thisReference.videoManager.isVideoPlaying()) {
          thisReference.videoManager.pause();
        } else {
          thisReference.videoManager.play();
        }
      };

      container.appendChild(pauseScreen);
    }
  }, {
    key: "__addVideoTimeObserver",
    value: function __addVideoTimeObserver() {
      var thisReference = this;
      var observer = new Observer(function (time) {
        thisReference.bottomBarController.videoTimeChange(time);

        thisReference.__manageTags(time / 1000);
      });
      this.videoManager.addObserver(observer);
    }
  }, {
    key: "__addTags",
    value: function __addTags() {
      this.tagController.addTags(this.config.tags, false);
    }
  }, {
    key: "__manageTags",
    value: function __manageTags(time) {
      var _iterator3 = _createForOfIteratorHelper(this.config.tags),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var tag = _step3.value;
          var tagTimestamp = tag.timeConfig.timestamp;
          var tagDuration = tag.timeConfig.duration;
          var isVisible = time >= parseInt(tagTimestamp) && time < parseInt(tagTimestamp) + parseInt(tagDuration);
          this.tagController.setTagVisible(tag.id, isVisible);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }]);

  return HypervideoController;
}();

_defineProperty(HypervideoController, "ASPECT_RATIO", {
  x: 16,
  y: 9
});

var TagsController = /*#__PURE__*/function () {
  function TagsController(containerID, mediaManager) {
    _classCallCheck(this, TagsController);

    this.containerID = containerID;
    this.mediaManager = mediaManager;
    this.htmlManager = new HTMLManager();
    this.plugins = [];
  }

  _createClass(TagsController, [{
    key: "addTagContainer",
    value: function addTagContainer(container) {
      this.tagsContainer = this.htmlManager.createElement("div", {
        classList: ["tags-container"]
      });
      container.appendChild(this.tagsContainer);
    }
  }, {
    key: "addTags",
    value: function addTags(tags, isVisible) {
      this.tags = tags;

      this.__addElementsContainer();

      var _iterator4 = _createForOfIteratorHelper(this.tags),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var tag = _step4.value;

          this.__addTagButton(tag, isVisible);

          var plugin = null;

          if (tag.plugin != null) {
            plugin = tag.plugin;
          }

          this.__createPluginForTagIfNeeded(tag.id, plugin);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "setTagVisible",
    value: function setTagVisible(id, isVisible) {
      var tagElement = document.querySelector("#" + this.containerID).querySelector("#" + id);
      tagElement.isVisible = isVisible;
    }
  }, {
    key: "fullScreenStateChanged",
    value: function fullScreenStateChanged(isFullScreen) {
      for (var key in this.plugins) {
        var plugin = this.plugins[key];
        plugin.fullScreenStateChanged(isFullScreen);
      }

      this.__moveElementsContainer(isFullScreen ? this.tagsContainer : document.body);
    }
  }, {
    key: "__addElementsContainer",
    value: function __addElementsContainer() {
      this.elementsContainer = this.htmlManager.createElement("div", {
        id: this.containerID + "-elements",
        style: {
          display: "none",
          position: "fixed",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          top: "0px",
          left: "0px",
          pointerEvents: "all"
        }
      });
      document.body.appendChild(this.elementsContainer);
    }
  }, {
    key: "__createTagElementsContainer",
    value: function __createTagElementsContainer(tagID) {
      var tagElementsContainer = this.htmlManager.createElement("div", {
        classList: ["tag-element-container"],
        id: tagID + "-container",
        style: {
          display: "none",
          position: "fixed",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0)",
          top: "0px",
          left: "0px"
        }
      });
      this.elementsContainer.appendChild(tagElementsContainer);
      return tagElementsContainer;
    }
  }, {
    key: "__moveElementsContainer",
    value: function __moveElementsContainer(parent) {
      parent.appendChild(this.elementsContainer);
    }
  }, {
    key: "__onClickTag",
    value: function __onClickTag(event) {
      var target = event.target;

      var tag = this.__getTagFromElement(target);

      if (tag == null) {
        return;
      }

      if (this.plugins[tag.id] == null) {
        return;
      }

      this.plugins[tag.id].onTagClick(event);
    }
  }, {
    key: "__onHoverTag",
    value: function __onHoverTag(event) {
      var target = event.target;

      var tag = this.__getTagFromElement(target);

      if (tag == null) {
        return;
      }

      if (this.plugins[tag.id] == null) {
        return;
      }

      this.plugins[tag.id].onTagHover(event);
    }
  }, {
    key: "__onLeaveTag",
    value: function __onLeaveTag(event) {
      var target = event.target;

      var tag = this.__getTagFromElement(target);

      if (tag == null) {
        return;
      }

      if (this.plugins[tag.id] == null) {
        return;
      }

      this.plugins[tag.id].onTagLeave(event);
    }
  }, {
    key: "__getTagFromElement",
    value: function __getTagFromElement(element) {
      var tag = this.tags.filter(function (t) {
        return t.id === element.id;
      });

      if (tag == null || tag.length <= 0) {
        return null;
      }

      return tag[0];
    }
  }, {
    key: "__createPluginForTagIfNeeded",
    value: function __createPluginForTagIfNeeded(tagID, plugin) {
      if (this.plugins.hasOwnProperty(tagID) && this.plugins[tagID] != null) {
        return;
      }

      if (plugin == null || Object.keys(plugin).length === 0) {
        this.plugins[tagID] = null;
        return;
      }

      var pluginName = plugin.name;
      var classInstance = eval("new ".concat(pluginName, "()"));

      var tagElementsContainer = this.__createTagElementsContainer(tagID);

      classInstance.onLoad(plugin.config, this.tagsContainer, tagElementsContainer, this.mediaManager);
      this.plugins[tagID] = classInstance;
    }
  }, {
    key: "__addTagButton",
    value: function __addTagButton(tag, isVisible) {
      var tagElement = this.htmlManager.createElement('x-tag-button', {
        id: tag.id
      });
      this.tagsContainer.appendChild(tagElement);
      tagElement.hexColor = tag.color ? tag.color : "#FFFFFF";
      tagElement.position = tag.position;
      tagElement.isVisible = isVisible;
      tagElement.clickHandler = this.__onClickTag.bind(this);
      tagElement.hoverHandler = this.__onHoverTag.bind(this);
      tagElement.leaveHandler = this.__onLeaveTag.bind(this);
    }
  }]);

  return TagsController;
}();

var TopBarController = /*#__PURE__*/function () {
  function TopBarController(hypervideoController, containerID) {
    _classCallCheck(this, TopBarController);

    this.hypervideoController = hypervideoController;
    this.htmlManager = new HTMLManager();
    this.containerID = containerID;
  }

  _createClass(TopBarController, [{
    key: "addTopBar",
    value: function addTopBar(container, videoTitle) {
      var topContainer = this.htmlManager.createElement("div", {
        classList: ["top-controller"]
      });
      var titleHeader = this.htmlManager.createElement("h3", {
        classList: ["top-title"],
        textContent: videoTitle
      });
      topContainer.appendChild(titleHeader);
      container.appendChild(topContainer);
    }
  }]);

  return TopBarController;
}();

var MediaManagerFactory = /*#__PURE__*/function () {
  function MediaManagerFactory() {
    _classCallCheck(this, MediaManagerFactory);
  }

  _createClass(MediaManagerFactory, [{
    key: "create",
    value: function create(hypervideoType, containerID) {
      switch (hypervideoType) {
        case Hypervideo.YOUTUBE_TYPE:
          return new YoutubeVideoManager(containerID);

        case Hypervideo.VIDEO_TYPE:
          return new VideoTagManager(containerID);

        default:
          return new MediaManager(containerID);
      }
    }
  }]);

  return MediaManagerFactory;
}();