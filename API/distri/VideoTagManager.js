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

var VideoTagManager = /*#__PURE__*/function (_VideoManager) {
  _inherits(VideoTagManager, _VideoManager);

  var _super = _createSuper(VideoTagManager);

  function VideoTagManager(containerID) {
    var _this;

    _classCallCheck(this, VideoTagManager);

    _this = _super.call(this, containerID);
    _this.videoTimer = new VideoTimer(_this.__timeHandler.bind(_assertThisInitialized(_this)));
    return _this;
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
      var video = document.getElementById(this.containerID).querySelector("video");
      video.currentTime = 0;
    }
  }, {
    key: "isVideoPlaying",
    value: function isVideoPlaying() {
      var video = document.getElementById(this.containerID).querySelector("video");
      return !video.paused;
    }
  }, {
    key: "loadProgress",
    //0-1
    value: function loadProgress(progress) {
      var video = document.getElementById(this.containerID).querySelector("video");
      video.currentTime = video.duration * progress;
      this.videoTimer.loadOffset(video.currentTime - Math.floor(video.currentTime));
      this.notify(video.currentTime);
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
      this.videoStateChanged(VideoManager.PLAYING);
      this.videoTimer.play();
    }
  }, {
    key: "__videoIsPaused",
    value: function __videoIsPaused() {
      this.videoStateChanged(VideoManager.PAUSED);
      this.videoTimer.pause();
    }
  }, {
    key: "__videoLoaded",
    value: function __videoLoaded() {
      var video = document.getElementById(this.containerID).querySelector("video");
      this.videoStateChanged(VideoManager.LOADED, {
        duration: video.duration
      });
    }
  }, {
    key: "__timeHandler",
    value: function __timeHandler() {
      var video = document.getElementById(this.containerID).querySelector("video");
      this.notify(video.currentTime);
    } //0-1

  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      volume = volume > 1 ? 1 : volume;
      volume = volume < 0 ? 0 : volume;
      var video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
      video.volume = volume;
    }
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
}(VideoManager);