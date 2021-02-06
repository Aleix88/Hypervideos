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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VideoManager = /*#__PURE__*/function (_Subject) {
  _inherits(VideoManager, _Subject);

  var _super = _createSuper(VideoManager);

  function VideoManager(containerID) {
    var _this;

    _classCallCheck(this, VideoManager);

    _this = _super.call(this);
    _this.containerID = containerID;
    _this.videoStateChanged = null;
    _this.isFullScreen = false; //Convertim la classe en "abstract"

    if ((this instanceof VideoManager ? this.constructor : void 0) === VideoManager) {
      throw new TypeError("Cannot construct VideoManager instances directly");
    }

    _this.__exitFullScreenEventListeners();

    return _this;
  }

  _createClass(VideoManager, [{
    key: "play",
    value: function play() {}
  }, {
    key: "pause",
    value: function pause() {}
  }, {
    key: "restartVideo",
    value: function restartVideo() {}
  }, {
    key: "isVideoPlaying",
    value: function isVideoPlaying() {}
  }, {
    key: "loadProgress",
    //0-1
    value: function loadProgress(progress) {} //0-1

  }, {
    key: "setVolume",
    value: function setVolume(volume) {}
  }, {
    key: "__exitFullScreenEventListeners",
    value: function __exitFullScreenEventListeners() {
      document.addEventListener('fullscreenchange', this._exitFSHandler.bind(this), false);
      document.addEventListener('mozfullscreenchange', this._exitFSHandler.bind(this), false);
      document.addEventListener('MSFullscreenChange', this._exitFSHandler.bind(this), false);
      document.addEventListener('webkitfullscreenchange', this._exitFSHandler.bind(this), false);
    }
  }, {
    key: "_exitFSHandler",
    value: function _exitFSHandler(event) {
      if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        console.log("Exit full screen!");
        this.isFullScreen = false;
        this.videoStateChanged(VideoManager.EXIT_FULL_SCREEN);
      }
    }
  }, {
    key: "_enterFSHandler",
    value: function _enterFSHandler() {
      console.log("Enter full screen!");
      this.isFullScreen = true;
      this.videoStateChanged(VideoManager.ENTER_FULL_SCREEN);
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

        this._enterFSHandler();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();

        this._enterFSHandler();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();

        this._enterFSHandler();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();

        this._enterFSHandler();
      }
    }
  }, {
    key: "requestExitFullScreen",
    value: function requestExitFullScreen(container) {
      if (document.exitFullscreen) {
        document.exitFullscreen();

        this._exitFSHandler();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();

        this._exitFSHandler();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();

        this._exitFSHandler();
      }
    }
  }, {
    key: "currentTime",
    get: function get() {
      return 0;
    }
  }]);

  return VideoManager;
}(Subject);

_defineProperty(VideoManager, "PLAYING", 0);

_defineProperty(VideoManager, "PAUSED", 1);

_defineProperty(VideoManager, "LOADED", 2);

_defineProperty(VideoManager, "ENTER_FULL_SCREEN", 3);

_defineProperty(VideoManager, "EXIT_FULL_SCREEN", 4);