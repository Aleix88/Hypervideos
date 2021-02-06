"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HypervideoControlls = /*#__PURE__*/function () {
  function HypervideoControlls(videoSRC, videoType, containerID, videoManager, tags) {
    _classCallCheck(this, HypervideoControlls);

    this.videoLength = null;
    this.containerID = containerID;
    this.videoSRC = videoSRC;
    this.videoManager = videoManager;
    this.videoType = videoType;
    this.tags = tags;
    this.htmlManager = new HTMLManager();
    this.videoManager.videoStateChanged = this.__videoStateChanged.bind(this);
  }

  _createClass(HypervideoControlls, [{
    key: "__videoStateChanged",
    value: function __videoStateChanged(state, target) {
      var progressBar = document.getElementById(this.containerID).querySelector("x-progress-bar");
      var pauseScreen = document.getElementById(this.containerID).querySelector("x-pause-screen");
      var volumeBar = document.getElementById(this.containerID).querySelector("x-volume-bar");

      switch (state) {
        case VideoManager.PLAYING:
          pauseScreen.hide();
          this.changeButtonIcon("control-play-button", "gg-play-pause");
          break;

        case VideoManager.PAUSED:
          pauseScreen.show();
          this.changeButtonIcon("control-play-button", "gg-play-button");
          break;

        case VideoManager.LOADED:
          volumeBar.setVolume(50);
          this.videoManager.setVolume(0.5);
          this.videoLength = target.duration;
          if (progressBar === null) break;
          progressBar.setMaxLength(target.duration);

          this.__setProgressBarTimestamps();

          break;

        case VideoManager.ENTER_FULL_SCREEN:
          this.changeButtonIcon("control-full-screen-button", "gg-minimize");
          break;

        case VideoManager.EXIT_FULL_SCREEN:
          this.changeButtonIcon("control-full-screen-button", "gg-maximize");
          break;

        default:
      }
    }
  }, {
    key: "restartVideo",
    value: function restartVideo() {
      var progressBar = document.getElementById(this.containerID).querySelector("x-progress-bar");
      progressBar.setCurrentLength(0);
      this.videoManager.restartVideo();
    }
  }, {
    key: "toggleFullScreen",
    value: function toggleFullScreen() {
      this.videoManager.toggleFullScreen();
    }
  }, {
    key: "playButtonClicked",
    value: function playButtonClicked() {
      console.log("Click play");

      if (!this.videoManager.isVideoPlaying()) {
        this.videoManager.play();
      } else {
        this.videoManager.pause();
      }
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
  }, {
    key: "createSkeleton",
    value: function createSkeleton() {
      var hypervideo = document.getElementById(this.containerID);
      var container = this.htmlManager.createElement("div", ["hypervideo-container"]);
      var tagsContainer = this.htmlManager.createElement("div", ["tags-container"]);
      hypervideo.appendChild(container);
      this.addVideoElement(container);

      if (this.videoType != Hypervideo.YOUTUBE_TYPE) {
        this.addTopBarControlls(container);
      }

      this.__addPauseScreen(container);

      container.appendChild(tagsContainer);
      this.addBottomBarControlls(container);
    }
  }, {
    key: "addVideoTag",
    value: function addVideoTag(container) {
      this.videoElementID = "video-" + this.containerID;
      var video = this.htmlManager.createElement("video", "", this.videoElementID);
      video.src = this.videoSRC;
      container.appendChild(video);
      this.videoManager.setupVideo();
    }
  }, {
    key: "addVideoFromYotube",
    value: function addVideoFromYotube(container) {
      this.videoElementID = "video-" + this.containerID;
      var div = this.htmlManager.createElement("div", ["youtube-frame"]);
      div.id = this.videoElementID;
      container.appendChild(div);
      this.videoManager.addYoutubeScript(this.videoElementID);
    }
  }, {
    key: "addVideoElement",
    value: function addVideoElement(container) {
      switch (this.videoType) {
        case Hypervideo.YOUTUBE_TYPE:
          this.addVideoFromYotube(container);
          break;

        default:
          this.addVideoTag(container);
          break;
      }
    }
  }, {
    key: "addTopBarControlls",
    value: function addTopBarControlls(container) {
      var topContainer = this.htmlManager.createElement("div", ["top-controller"]);
      container.appendChild(topContainer);
    }
  }, {
    key: "__addPauseScreen",
    value: function __addPauseScreen(container) {
      var pauseScreen = this.htmlManager.createElement("x-pause-screen");
      var thisReference = this;

      pauseScreen.didClick = function () {
        if (thisReference.videoManager.isVideoPlaying()) {
          thisReference.videoManager.pause();
        } else {
          thisReference.videoManager.play();
        }
      };

      container.appendChild(pauseScreen);
    }
  }, {
    key: "addBottomBarControlls",
    value: function addBottomBarControlls(container) {
      var bottomController = this.htmlManager.createElement("div", ["bottom-controller"]);
      container.appendChild(bottomController);
      var playButton = this.createControlButton("control-play-button", "gg-play-button", this.playButtonClicked);
      var replayButton = this.createControlButton("control-repeat-button", "gg-repeat", this.restartVideo);
      var fullScreenButton = this.createControlButton("control-full-screen-button", "gg-maximize", this.toggleFullScreen);
      var progressBar = this.createProgressBar();
      var volumeBar = this.createVolumeBar();
      bottomController.appendChild(playButton);
      bottomController.appendChild(replayButton);
      bottomController.appendChild(fullScreenButton);
      bottomController.appendChild(progressBar);
      bottomController.appendChild(volumeBar);
    }
  }, {
    key: "createControlButton",
    value: function createControlButton(buttonClass, buttonIcon, eventHandler) {
      var buttonContainer = this.htmlManager.createElement("div", ["control-button-container"]);
      var button = this.htmlManager.createElement("button", ["control-button", buttonClass]);
      var icon = this.htmlManager.createElement("i", [buttonIcon]);
      buttonContainer.appendChild(button);
      button.appendChild(icon);

      if (eventHandler !== null && eventHandler !== undefined) {
        buttonContainer.addEventListener("click", eventHandler.bind(this));
      }

      return buttonContainer;
    }
  }, {
    key: "createProgressBar",
    value: function createProgressBar() {
      var progressBar = this.htmlManager.createElement("x-progress-bar", ["progress-container"]);
      progressBar.progressBarChanged = this.__progressBarChanged.bind(this);

      if (this.videoLength !== null) {
        progressBar.setMaxLength(this.videoLength);
      }

      this.__setupProgressBarTimer(progressBar);

      return progressBar;
    }
  }, {
    key: "__setupProgressBarTimer",
    value: function __setupProgressBarTimer(progressBar) {
      var observer = new Observer(function () {
        progressBar.increment();
      });
      this.videoManager.addObserver(observer);
    }
  }, {
    key: "__progressBarChanged",
    value: function __progressBarChanged(progress) {
      this.videoManager.loadProgress(progress);
    }
  }, {
    key: "__setProgressBarTimestamps",
    value: function __setProgressBarTimestamps() {
      var progressBar = document.getElementById(this.containerID).querySelector("x-progress-bar");

      var _iterator = _createForOfIteratorHelper(this.tags),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var t = _step.value;
          var timestamp = t.timeConfig.timestamp;
          progressBar.addMarkerAt(timestamp);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "createVolumeBar",
    value: function createVolumeBar() {
      var volumeBar = this.htmlManager.createElement("x-volume-bar", ["volume-bar"]);
      volumeBar.volumeChanged = this.__volumeChanged.bind(this);
      return volumeBar;
    }
  }, {
    key: "__volumeChanged",
    value: function __volumeChanged(volume) {
      this.videoManager.setVolume(volume / 100);
    }
  }]);

  return HypervideoControlls;
}();