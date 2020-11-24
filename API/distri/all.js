"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HTMLManager = /*#__PURE__*/function () {
  function HTMLManager() {
    _classCallCheck(this, HTMLManager);
  }

  _createClass(HTMLManager, [{
    key: "createElement",
    value: function createElement(type, elementClass, id) {
      var element = document.createElement(type);

      if (Array.isArray(elementClass) && elementClass.length > 0) {
        elementClass.forEach(function (c) {
          element.classList.add(c);
        });
      }

      if (id !== undefined && id !== null) {
        element.id = id;
      }

      return element;
    }
  }, {
    key: "getShadowElementByID",
    value: function getShadowElementByID(containerID, id) {
      var shadowContainer = document.getElementById(containerID).shadowRoot;
      return shadowContainer.getElementById(id);
    }
  }, {
    key: "getShadowElementByClassName",
    value: function getShadowElementByClassName(containerID, className) {
      var shadowContainer = document.getElementById(containerID).shadowRoot;
      return shadowContainer.querySelector("." + className);
    }
  }]);

  return HTMLManager;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Hypervideo = /*#__PURE__*/function () {
  function Hypervideo(videoURL, videoType, hypervideoID) {
    _classCallCheck(this, Hypervideo);

    this.videoURL = videoURL;
    this.videoType = videoType;
    this.containerID = hypervideoID;
  }

  _createClass(Hypervideo, [{
    key: "isDOMLoaded",
    value: function isDOMLoaded() {
      return document != null && (document.readyState === "interactive" || document.readyState === "complete");
    }
  }, {
    key: "setupHypervideo",
    value: function setupHypervideo(tagsJSON) {
      var container = document.getElementById(this.containerID);
      container.attachShadow({
        mode: 'open'
      });
      container.shadowRoot.appendChild(this.getStyle());

      if (!this.isDOMLoaded()) {
        //TODO: AVISAR DE L'ERROR, PER ARA DEIXO UN CONSOLE LOG
        console.log("Error: Can't setup an hypervideo if DOM is not loaded.");
      } //TODO: Pensar si això ho necessitare guardar o no


      this.tagsJSON = tagsJSON;
      var hypervideoControlls = new HypervideoControlls(this.videoURL, this.videoType, this.containerID);
      hypervideoControlls.createSkeleton();
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var style = document.createElement('style');
      style.textContent = "\n        video {\n            width: 100%;\n            height: 100%;\n        }\n        \n        button {\n            cursor: pointer;\n        }\n        \n        .youtube-frame {\n            width: 100%;\n            height: 100%;\n        }\n        \n        .hypervideo-container {\n            position: relative;\n            width: 100%;\n            height: 100%;\n        }\n        \n        /* Top control bar */\n        .top-controller {\n            background-color: rgba(0, 150, 0, 0.37);;\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n        }\n        \n        /*  Bottom control bar  */\n        .bottom-controller {\n            display: flex;\n            justify-content: flex-start;\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            background-color: rgba(255, 255, 255, 0.521);\n            padding: 4px;\n        }\n        \n        .control-button-container {\n            background: white;\n            height: 2em;\n            padding-left: 0.4em;\n            padding-right: 0.4em;\n            border: 0.3px solid black;\n            cursor: pointer;\n        }\n        \n        .control-button-container:not(:last-child) {\n            margin-right: 2px;\n        }\n        \n        .control-button-container:hover,\n        .control-button-container:focus {\n            background: lightgray;\n        }\n        \n        .control-button {\n            color: black;  \n            border: none;\n            outline: none;\n            background-color: rgba(0,0,0,0);\n            height: 100%; \n            width: 2em;\n            margin: auto;\n            padding: 0;\n        }\n        \n        .control-button:hover,\n        .control-button:focus {\n            color: rgb(97, 87, 245);\n        }\n        \n        .progress-container {\n            flex-grow: 1;\n            margin-right: 2px;\n            height: 10px;\n            background: red;\n            align-self: center;\n        }\n        \n        \n        /* ICONS */\n        \n        .gg-play-button {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            width: 22px;\n            height: 22px;\n            margin: auto; /*Aquesta linia s'ha d'afegir*/\n        }\n        .gg-play-button::before {\n            content: \"\";\n            display: block;\n            box-sizing: border-box;\n            position: absolute;\n            width: 0;\n            height: 10px;\n            border-top: 5px solid transparent;\n            border-bottom: 5px solid transparent;\n            border-left: 6px solid;\n            top: 6px;\n            left: 9px;\n        }\n        \n        .gg-repeat {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            box-shadow:\n                -2px -2px 0 0,\n                2px 2px 0 0;\n            width: 14px;\n            height: 6px;\n            margin: auto;\n        }\n        .gg-repeat::after,\n        .gg-repeat::before {\n            content: \"\";\n            display: block;\n            box-sizing: border-box;\n            position: absolute;\n            width: 0;\n            height: 0;\n            border-top: 3px solid transparent;\n            border-bottom: 3px solid transparent;\n        }\n        .gg-repeat::before {\n            border-left: 5px solid;\n            top: -4px;\n            right: 0;\n        }\n        .gg-repeat::after {\n            border-right: 5px solid;\n            bottom: -4px;\n            left: 0;\n        }\n        .gg-maximize {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            width: 14px;\n            height: 14px;\n            box-shadow:\n                -6px -6px 0 -4px,\n                6px 6px 0 -4px,\n                6px -6px 0 -4px,\n                -6px 6px 0 -4px;\n            margin: auto;\n        }\n        \n        .gg-minimize {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            width: 4px;\n            height: 4px;\n            box-shadow:\n                -8px -4px 0 -1px,\n                -6px -4px 0 -1px,\n                8px 4px 0 -1px,\n                6px 4px 0 -1px,\n                8px -4px 0 -1px,\n                6px -4px 0 -1px,\n                -8px 4px 0 -1px,\n                -6px 4px 0 -1px;\n            margin: auto;\n        }\n        .gg-minimize::after,\n        .gg-minimize::before {\n            content: \"\";\n            display: block;\n            box-sizing: border-box;\n            position: absolute;\n            width: 2px;\n            height: 18px;\n            border-top: 6px solid;\n            border-bottom: 6px solid;\n            box-shadow: 18px 0 0 -2px;\n            top: -7px;\n        }\n        .gg-minimize::after {\n            left: -3px;\n        }\n        .gg-minimize::before {\n            right: -3px;\n        }\n        \n        .gg-volume {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            width: 8px;\n            height: 8px;\n            border: 2px solid;\n            border-right: 0;\n            -webkit-perspective: 12px;\n            perspective: 12px;\n            border-top-left-radius: 4px;\n            border-bottom-left-radius: 4px;\n            margin: 0;\n        }\n        .gg-volume::after,\n        .gg-volume::before {\n            content: \"\";\n            display: block;\n            box-sizing: border-box;\n            position: absolute;\n        }\n        .gg-volume::before {\n            left: 2px;\n            transform: rotateY(-90deg);\n            width: 10px;\n            height: 10px;\n            border: 2px solid;\n            border-left: 0;\n            top: -3px;\n        }\n        .gg-volume::after {\n            width: 8px;\n            height: 16px;\n            border: 6px double;\n            border-left: 0;\n            border-top-right-radius: 100px;\n            border-bottom-right-radius: 100px;\n            right: -14px;\n            top: -6px;\n        }\n        \n        .gg-play-pause {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            width: 8px;\n            height: 10px;\n            border-left: 3px solid;\n            border-right: 3px solid;\n            margin: auto;\n        }\n        ";
      return style;
    }
  }]);

  return Hypervideo;
}();

_defineProperty(Hypervideo, "YOUTUBE_TYPE", "YOUTUBE");

_defineProperty(Hypervideo, "VIDEO_TYPE", "VIDEO");
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HypervideoControlls = /*#__PURE__*/function () {
  function HypervideoControlls(videoSRC, videoType, containerID) {
    _classCallCheck(this, HypervideoControlls);

    this.videoSRC = videoSRC;
    this.videoType = videoType;
    this.containerID = containerID;
    this.isVideoPaused = true;
    this.htmlManager = new HTMLManager();
  }

  _createClass(HypervideoControlls, [{
    key: "setVolume",
    value: function setVolume(volume) {
      volume = volume > 1 ? 1 : volume;
      volume = volume < 0 ? 0 : volume;
      var video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
      video.volume = volume;
    }
  }, {
    key: "pauseVideo",
    value: function pauseVideo() {
      var video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
      video.pause();
      this.changeButtonIcon("control-play-button", "gg-play-button");
      this.isVideoPaused = true;
    }
  }, {
    key: "playVideo",
    value: function playVideo() {
      var video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
      video.play();
      this.changeButtonIcon("control-play-button", "gg-play-pause");
      this.isVideoPaused = false;
    }
  }, {
    key: "setVideoCurrentTime",
    value: function setVideoCurrentTime(seconds) {
      var video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
      video.currentTime = seconds;
    }
  }, {
    key: "restartVideo",
    value: function restartVideo() {
      this.setVideoCurrentTime(0);
    }
  }, {
    key: "isFullScreen",
    value: function isFullScreen() {
      return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    }
  }, {
    key: "requestFullScreen",
    value: function requestFullScreen(container) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
        this.changeButtonIcon("control-full-screen-button", "gg-minimize");
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
        this.changeButtonIcon("control-full-screen-button", "gg-minimize");
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
        this.changeButtonIcon("control-full-screen-button", "gg-minimize");
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
        this.changeButtonIcon("control-full-screen-button", "gg-minimize");
      }
    }
  }, {
    key: "requestExitFullScreen",
    value: function requestExitFullScreen(container) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.changeButtonIcon("control-full-screen-button", "gg-maximize");
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        this.changeButtonIcon("control-full-screen-button", "gg-maximize");
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        this.changeButtonIcon("control-full-screen-button", "gg-maximize");
      }
    }
  }, {
    key: "toggleFullScreen",
    value: function toggleFullScreen() {
      var container = document.getElementById(this.containerID);

      if (this.isFullScreen()) {
        this.requestExitFullScreen(container);
      } else {
        this.requestFullScreen(container);
      }
    }
  }, {
    key: "playButtonClicked",
    value: function playButtonClicked() {
      if (this.isVideoPaused) {
        this.playVideo();
      } else {
        this.pauseVideo();
      }
    }
  }, {
    key: "changeButtonIcon",
    value: function changeButtonIcon(buttonClass, iconName) {
      var button = this.htmlManager.getShadowElementByClassName(this.containerID, buttonClass);

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
      var hypervideo = document.getElementById(this.containerID).shadowRoot;
      var container = this.htmlManager.createElement("div", ["hypervideo-container"]);
      var tagsContainer = this.htmlManager.createElement("div", ["tags-container"]);
      hypervideo.appendChild(container);
      this.addVideoElement(container);

      if (this.videoType != Hypervideo.YOUTUBE_TYPE) {
        this.addTopBarControlls(container);
      }

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
    }
  }, {
    key: "addVideoFromYotube",
    value: function addVideoFromYotube(container) {
      //TODO: L'enables API segurament ho necessesitare per implementar alguna cosa dels tags.
      var frame = this.htmlManager.createElement("iframe", ["youtube-frame"]);
      var src = this.videoSRC;
      src += "?autoplay=0&controls=0&showinfo=0&disablekb=1&fs=0&playsinline=1&wmode=opaque&iv_load_policy=3&modestbranding=1&rel=0";
      frame.src = src;
      frame.frameBorder = 0;
      container.appendChild(frame);
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
    key: "addBottomBarControlls",
    value: function addBottomBarControlls(container) {
      var bottomController = this.htmlManager.createElement("div", ["bottom-controller"]);
      container.appendChild(bottomController);
      var playButton = this.createControlButton("control-play-button", "gg-play-button", this.playButtonClicked);
      var replayButton = this.createControlButton("control-repeat-button", "gg-repeat", this.restartVideo);
      var fullScreenButton = this.createControlButton("control-full-screen-button", "gg-maximize", this.toggleFullScreen);
      var volumeButton = this.createControlButton("control-volume-button", "gg-volume");
      var progressBar = this.createProgressBar();
      bottomController.appendChild(playButton);
      bottomController.appendChild(replayButton);
      bottomController.appendChild(fullScreenButton);
      bottomController.appendChild(progressBar);
      bottomController.appendChild(volumeButton);
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
      var progressContainer = this.htmlManager.createElement("div", ["progress-container"]);
      return progressContainer;
    }
  }]);

  return HypervideoControlls;
}();
"use strict";

function includeJs(jsFilePath, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = jsFilePath;
  script.onreadystatechange = callback;
  script.onload = callback;
  document.body.appendChild(script);
}

var files = ["../../API/src/HTMLManager.js", "../../API/src/HypervideoControlls.js", "../../API/src/Hypervideo.js"];
var scriptsLoaded = 0;

function importHypervideoAPI(callback) {
  files.forEach(function (file) {
    includeJs(file, function () {
      scriptsLoaded++;

      if (scriptsLoaded === files.length) {
        callback();
      }
    });
  });
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressBar = function ProgressBar() {
  _classCallCheck(this, ProgressBar);
};