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
  }, {
    key: "hexToRGBA",
    value: function hexToRGBA(hexColor, alpha) {
      var r = parseInt(hexColor.slice(1, 3), 16);
      var g = parseInt(hexColor.slice(3, 5), 16);
      var b = parseInt(hexColor.slice(5, 7), 16);
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
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
      this.__addGlobalStyle();

      var container = document.getElementById(this.containerID);
      container.appendChild(this.getStyle());

      if (!this.isDOMLoaded()) {
        //TODO: AVISAR DE L'ERROR, PER ARA DEIXO UN CONSOLE LOG
        console.log("Error: Can't setup an hypervideo if DOM is not loaded.");
      } //TODO: Pensar si això ho necessitare guardar o no


      this.tagsJSON = tagsJSON;
      var videoManagerFactory = new VideoManagerFactory();
      var videoManager = videoManagerFactory.create(this.videoType, this.containerID);
      var hypervideoControlls = new HypervideoControlls(this.videoURL, this.videoType, this.containerID, videoManager);
      hypervideoControlls.createSkeleton();
      var tagsController = new TagsController(this.containerID, videoManager);
      tagsController.addTags(tagsJSON);
    }
  }, {
    key: "__addGlobalStyle",
    value: function __addGlobalStyle() {
      var style = document.createElement('style');
      style.textContent = "\n            .hypervideo:-moz-full-screen {\n                width: 100%;\n                height: 100%;\n            }\n            \n            .hypervideo:-webkit-full-screen {\n                width: 100%;\n                height: 100%;\n            }\n            \n            .hypervideo:fullscreen {\n                width: 100%;\n                height: 100%;\n            }\n        ";
      document.querySelector("head").appendChild(style);
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var style = document.createElement('style');
      style.textContent = "\n\n        video {\n            width: 100%;\n            height: 100%;\n            background: black;\n        }\n        \n        button {\n            cursor: pointer;\n        }\n        \n        .youtube-frame {\n            width: 100%;\n            height: 100%;\n        }\n        \n        .hypervideo-container {\n            position: relative;\n            width: 100%;\n            height: 100%;\n            user-drag: none; \n            user-select: none;\n            -moz-user-select: none;\n            -webkit-user-drag: none;\n            -webkit-user-select: none;\n            -ms-user-select: none;\n        }\n\n        .hypervideo-container-fullscreen {\n\n        }\n        \n        /* Top control bar */\n        .top-controller {\n            background-color: rgba(0, 150, 0, 0.37);;\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n        }\n        \n\n        /* Tags */\n\n        x-tag-button {\n            pointer-events: all;\n            position: absolute;\n            width: 5%;\n            top: 50px;\n            left: 50px;\n            display: block;\n            visibility: hidden;\n        }\n\n        .tags-container {\n            pointer-events: none;\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n        }\n\n        /*  Bottom control bar  */\n        .bottom-controller {\n            display: flex;\n            opacity: 0;\n            justify-content: flex-start;\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            background: rgb(2,0,36);\n            background: linear-gradient(0deg, rgba(2,0,36,1) 30%, rgba(0,212,255,0) 100%);\n            padding: 4px;\n            transition: opacity 0.2s;\n        }\n\n        .hypervideo-container:hover > .bottom-controller,\n        .hypervideo-container:focus > .bottom-controller {\n            opacity: 1;\n        }\n        \n        .control-button-container {\n            background: rgba(0,0,0,0);\n            height: 2em;\n            padding-left: 0.4em;\n            padding-right: 0.4em;\n            border: none;\n            cursor: pointer;\n        }\n        \n        .control-button-container:not(:last-child) {\n            margin-right: 2px;\n        }\n        \n        .control-button {\n            color: white;  \n            border: none;\n            outline: none;\n            background-color: rgba(0,0,0,0);\n            height: 100%; \n            width: 2em;\n            margin: auto;\n            padding: 0;\n        }\n        \n        .control-button:hover,\n        .control-button:focus {\n            color: rgb(97, 87, 245);\n        }\n        \n        .progress-container {\n            flex-grow: 1;\n            margin-right: 2px;\n            height: 3px;\n            background: rgba(210,210,210,0.68);\n            align-self: center;\n            position: relative;\n            cursor: pointer; \n            transition: height 0.2s;\n        }        \n\n        .progress-container:focus,\n        .progress-container:hover {\n            height: 5px;\n        }\n\n        x-pause-screen {\n            width: 100%;\n            height: 100%;\n            margin: auto;\n            position: absolute;\n            top: 0;\n            left: 0;\n        }\n\n        \n        /* ICONS */\n        \n        .gg-play-button {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            width: 22px;\n            height: 22px;\n            margin: auto; /*Aquesta linia s'ha d'afegir*/\n        }\n        .gg-play-button::before {\n            content: \"\";\n            display: block;\n            box-sizing: border-box;\n            position: absolute;\n            width: 0;\n            height: 10px;\n            border-top: 5px solid transparent;\n            border-bottom: 5px solid transparent;\n            border-left: 6px solid;\n            top: 6px;\n            left: 9px;\n        }\n        \n        .gg-repeat {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            box-shadow:\n                -2px -2px 0 0,\n                2px 2px 0 0;\n            width: 14px;\n            height: 6px;\n            margin: auto;\n        }\n        .gg-repeat::after,\n        .gg-repeat::before {\n            content: \"\";\n            display: block;\n            box-sizing: border-box;\n            position: absolute;\n            width: 0;\n            height: 0;\n            border-top: 3px solid transparent;\n            border-bottom: 3px solid transparent;\n        }\n        .gg-repeat::before {\n            border-left: 5px solid;\n            top: -4px;\n            right: 0;\n        }\n        .gg-repeat::after {\n            border-right: 5px solid;\n            bottom: -4px;\n            left: 0;\n        }\n        .gg-maximize {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            width: 14px;\n            height: 14px;\n            box-shadow:\n                -6px -6px 0 -4px,\n                6px 6px 0 -4px,\n                6px -6px 0 -4px,\n                -6px 6px 0 -4px;\n            margin: auto;\n        }\n        \n        .gg-minimize {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            width: 4px;\n            height: 4px;\n            box-shadow:\n                -8px -4px 0 -1px,\n                -6px -4px 0 -1px,\n                8px 4px 0 -1px,\n                6px 4px 0 -1px,\n                8px -4px 0 -1px,\n                6px -4px 0 -1px,\n                -8px 4px 0 -1px,\n                -6px 4px 0 -1px;\n            margin: auto;\n        }\n        .gg-minimize::after,\n        .gg-minimize::before {\n            content: \"\";\n            display: block;\n            box-sizing: border-box;\n            position: absolute;\n            width: 2px;\n            height: 18px;\n            border-top: 6px solid;\n            border-bottom: 6px solid;\n            box-shadow: 18px 0 0 -2px;\n            top: -7px;\n        }\n        .gg-minimize::after {\n            left: -3px;\n        }\n        .gg-minimize::before {\n            right: -3px;\n        }\n        \n        .gg-play-pause {\n            box-sizing: border-box;\n            position: relative;\n            display: block;\n            transform: scale(var(--ggs,1));\n            width: 8px;\n            height: 10px;\n            border-left: 3px solid;\n            border-right: 3px solid;\n            margin: auto;\n        }\n        \n        ";
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
  function HypervideoControlls(videoSRC, videoType, containerID, videoManager) {
    _classCallCheck(this, HypervideoControlls);

    this.videoLength = null;
    this.videoSRC = videoSRC;
    this.videoType = videoType;
    this.containerID = containerID;
    this.videoManager = videoManager;
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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TagsController = /*#__PURE__*/function () {
  function TagsController(containerID, videoManager) {
    _classCallCheck(this, TagsController);

    this.containerID = containerID;
    this.videoManager = videoManager;
    this.tagsContainer = document.getElementById(containerID).querySelector(".tags-container");
  }

  _createClass(TagsController, [{
    key: "addTags",
    value: function addTags(tagsJSON) {
      try {
        var tagsConfig = JSON.parse(tagsJSON).tags;

        var _iterator = _createForOfIteratorHelper(tagsConfig),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var tag = _step.value;

            this.__addTagButton(tag);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } catch (error) {
        throw "Error: Not valid JSON";
      }
    }
  }, {
    key: "__addTagButton",
    value: function __addTagButton(tag) {
      var tagElement = document.createElement('x-tag-button');
      this.tagsContainer.appendChild(tagElement);
      var observer = new Observer(function (timeStamp) {
        var tagTimestamp = tag.timeConfig.timestamp;
        var tagDuration = tag.timeConfig.duration;
        var isVisible = timeStamp >= tagTimestamp && timeStamp < tagTimestamp + tagDuration;
        tagElement.isVisible = isVisible;
      });
      this.videoManager.addObserver(observer);
      tagElement.hexColor = tag.color ? tag.color : "#FFFFFF";
      tagElement.position = tag.position;
    }
  }]);

  return TagsController;
}();
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
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VideoManagerFactory = /*#__PURE__*/function () {
  function VideoManagerFactory() {
    _classCallCheck(this, VideoManagerFactory);
  }

  _createClass(VideoManagerFactory, [{
    key: "create",
    value: function create(hypervideoType, containerID) {
      switch (hypervideoType) {
        case Hypervideo.YOUTUBE_TYPE:
          return new YoutubeVideoManager(containerID);

        default:
          return new VideoTagManager(containerID);
      }
    }
  }]);

  return VideoManagerFactory;
}();
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
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VideoTimer = /*#__PURE__*/function () {
  function VideoTimer(timeHandler) {
    _classCallCheck(this, VideoTimer);

    this.loopCounter = 0;
    this.timeHandler = timeHandler;
  }

  _createClass(VideoTimer, [{
    key: "play",
    value: function play() {
      this.timer = setInterval(this.__handleTime.bind(this), VideoTimer.LOOP_TIME);
    }
  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this.timer);
    }
  }, {
    key: "loadOffset",
    value: function loadOffset(offset) {
      this.loopCounter = parseInt(offset / VideoTimer.LOOP_TIME);
    }
  }, {
    key: "__handleTime",
    value: function __handleTime() {
      this.loopCounter++;

      if (this.loopCounter >= 10) {
        this.timeHandler();
        this.loopCounter = 0;
      }
    }
  }], [{
    key: "LOOP_TIME",
    get: function get() {
      return 100;
    }
  }]);

  return VideoTimer;
}();
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var XPauseScreen = /*#__PURE__*/function (_HTMLElement) {
  _inherits(XPauseScreen, _HTMLElement);

  var _super = _createSuper(XPauseScreen);

  function XPauseScreen() {
    var _this;

    _classCallCheck(this, XPauseScreen);

    _this = _super.call(this);
    _this.htmlManager = new HTMLManager();
    _this.didClick = null;

    var shadow = _this.attachShadow({
      mode: 'open'
    });

    var container = _this.htmlManager.createElement('div', ["pause-container"]);

    container.addEventListener('click', _this.__onClick.bind(_assertThisInitialized(_this))); //this.__addPlayIcon(container);

    shadow.appendChild(container);
    shadow.appendChild(_this.__getStyle());
    return _this;
  }

  _createClass(XPauseScreen, [{
    key: "hide",
    value: function hide() {
      var container = this.shadowRoot.querySelector(".pause-container");
      container.classList.add("hide");
    }
  }, {
    key: "show",
    value: function show() {
      var container = this.shadowRoot.querySelector(".pause-container");
      container.classList.remove("hide");
    }
  }, {
    key: "__onClick",
    value: function __onClick() {
      this.didClick();
    }
  }, {
    key: "__addPlayIcon",
    value: function __addPlayIcon(container) {
      var img = this.htmlManager.createElement("img", ["play-image"]);
      img.src = "./../../API/assets/play-button.svg";
      container.appendChild(img);
    }
  }, {
    key: "__getStyle",
    value: function __getStyle() {
      var style = document.createElement("style");
      style.textContent = "\n\n            .pause-container {\n                width: 100%;\n                height: 100%;\n                background: rgba(0,0,0,0.1);\n                cursor: pointer;\n                display: flex;\n                margin: 0;\n            }\n\n            .hide {\n                opacity: 0;\n            }\n\n            .play-image {\n                width: 100px;\n                height: 100px;\n                margin: auto;\n            }\n        ";
      return style;
    }
  }]);

  return XPauseScreen;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('x-pause-screen', XPauseScreen);
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var XProgressBar = /*#__PURE__*/function (_HTMLElement) {
  _inherits(XProgressBar, _HTMLElement);

  var _super = _createSuper(XProgressBar);

  function XProgressBar() {
    var _this;

    _classCallCheck(this, XProgressBar);

    _this = _super.call(this);
    _this.isMoving = false;
    _this.htmlManager = new HTMLManager();
    _this.maxLength = 100;
    _this.currentLength = 0;
    _this.currentProgress = 0;
    _this.progressBarChanged = null;

    var shadow = _this.attachShadow({
      mode: 'open'
    });

    _this.__setupEventsListeners();

    var bar = _this.htmlManager.createElement("div", ["progress-bar"]);

    shadow.appendChild(_this.getStyle());
    shadow.appendChild(bar);

    _this.addMarkerAt(10);

    _this.addMarkerAt(40);

    return _this;
  }

  _createClass(XProgressBar, [{
    key: "addMarkerAt",
    value: function addMarkerAt(length) {
      var marker = this.htmlManager.createElement("div", ["progress-bar-marker"]);
      var progress = this.convertLengthToProgress(length);
      this.shadowRoot.appendChild(marker);
      marker.style.left = progress + "%";
    }
  }, {
    key: "__setupEventsListeners",
    value: function __setupEventsListeners() {
      this.onmousedown = this.__mouseDown.bind(this);
      document.addEventListener('mouseup', this.__mouseUp.bind(this));
      document.addEventListener('mouseleave', this.__mouseLeave.bind(this));
      document.addEventListener('mousemove', this.__mouseMoving.bind(this));
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
    value: function __mouseLeave(event) {
      if (!this.isMoving) {
        return;
      }

      this.isMoving = false;

      this.__recalculatePosition(event.clientX);

      this.progressBarChanged(this.currentProgress);
    }
  }, {
    key: "__mouseUp",
    value: function __mouseUp(event) {
      if (!this.isMoving) {
        return;
      }

      this.isMoving = false;

      this.__recalculatePosition(event.clientX);

      this.progressBarChanged(this.currentProgress);
    }
  }, {
    key: "__mouseMoving",
    value: function __mouseMoving(event) {
      if (!this.isMoving) {
        return;
      }

      this.__recalculatePosition(event.clientX);
    }
  }, {
    key: "__mouseDown",
    value: function __mouseDown(event) {
      this.isMoving = true;

      this.__recalculatePosition(event.clientX);
    }
    /*startMoving() {
        const progressBar = this;
        this.__timeInterval = setInterval(() => {
            progressBar.increment(1);
        }, 1000);
    }
     stopMoving() {
        if (this.__timeInterval !== undefined && this.__timeInterval !== null) {
            clearInterval(this.__timeInterval);
        }
    }
    */

  }, {
    key: "convertLengthToProgress",
    value: function convertLengthToProgress(length) {
      return length / this.maxLength * 100;
    }
  }, {
    key: "setCurrentLength",
    value: function setCurrentLength(length) {
      this.currentLength = length;
      this.currentLength = this.currentLength > this.maxLength ? this.maxLength : this.currentLength;
      this.currentLength = this.currentLength < 0 ? 0 : this.currentLength;
      var progressBar = this.shadowRoot.querySelector(".progress-bar");
      var progress = this.convertLengthToProgress(length);
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
    key: "getStyle",
    value: function getStyle() {
      var style = document.createElement("style");
      style.textContent = "\n            .progress-bar {\n                background: rgb(97, 87, 245);\n                position: absolute;\n                height: 100%;\n                width: 0%;\n            }\n\n            .progress-bar-marker {\n                width: 7px;\n                height: 100%;\n                top: 0;\n                background: yellow;\n                position: absolute;\n            }\n        ";
      return style;
    }
  }]);

  return XProgressBar;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

_defineProperty(XProgressBar, "POSITION_SET", "POSITION_SET");

customElements.define('x-progress-bar', XProgressBar);
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var XTagButton = /*#__PURE__*/function (_HTMLElement) {
  _inherits(XTagButton, _HTMLElement);

  var _super = _createSuper(XTagButton);

  function XTagButton() {
    var _this;

    _classCallCheck(this, XTagButton);

    _this = _super.call(this);
    _this.htmlManager = new HTMLManager();

    _this.attachShadow({
      mode: 'open'
    });

    _this.oldIsVisible = false;

    var tagCircleContainer = _this.htmlManager.createElement("div", ["tag-circle-container"]);

    var anchor = _this.htmlManager.createElement("a", ["tag-anchor"]);

    var aspectRatioDiv = _this.htmlManager.createElement("div", ["aspect-ratio-div"]);

    _this.shadowRoot.appendChild(tagCircleContainer);

    _this.shadowRoot.appendChild(anchor);

    _this.shadowRoot.appendChild(aspectRatioDiv);

    _this.shadowRoot.appendChild(_this.getStyle());

    _this.__setupEventListeners(anchor);

    return _this;
  }

  _createClass(XTagButton, [{
    key: "__setupEventListeners",
    value: function __setupEventListeners(element) {
      element.addEventListener('mousedown', this.__onMouseDown.bind(this));
      element.addEventListener('click', this.__onClick.bind(this));
      element.addEventListener('mouseenter', this.__onHover.bind(this));
      element.addEventListener('mouseleave', this.__onMouseLeave.bind(this));
    }
  }, {
    key: "__onClick",
    value: function __onClick() {
      console.log("Click");
    }
  }, {
    key: "__onHover",
    value: function __onHover() {
      console.log("Hover");

      this.__animateFocusScale();
    }
  }, {
    key: "__onMouseDown",
    value: function __onMouseDown() {
      console.log("Hold");
    }
  }, {
    key: "__onMouseLeave",
    value: function __onMouseLeave() {
      this.__animateDefaultScale();
    }
  }, {
    key: "__animateDefaultScale",
    value: function __animateDefaultScale() {
      console.log("Default scale");
      var anchor = this.shadowRoot.querySelector(".tag-anchor");
      anchor.classList.add("defaultScale");
      anchor.classList.remove("focusScale");
      anchor.classList.remove("appear");
    }
  }, {
    key: "__animateFocusScale",
    value: function __animateFocusScale() {
      var anchor = this.shadowRoot.querySelector(".tag-anchor");
      anchor.classList.add("focusScale");
      anchor.classList.remove("defaultScale");
      anchor.classList.remove("appear");
    }
  }, {
    key: "__animateAppear",
    value: function __animateAppear() {
      this.style.visibility = "visible";
      var circleContainer = this.shadowRoot.querySelector(".tag-circle-container");
      var anchor = this.shadowRoot.querySelector(".tag-anchor");
      anchor.classList.remove("disappear");
      circleContainer.classList.remove("effectDissapear");
      anchor.classList.add("appear");
      circleContainer.classList.add("effectAppear");
    }
  }, {
    key: "__animateDisppear",
    value: function __animateDisppear() {
      var thisReference = this;
      var timer = setInterval(function () {
        thisReference.style.visibility = "hidden";
        clearTimeout(timer);
      }, 350);
      var circleContainer = this.shadowRoot.querySelector(".tag-circle-container");
      var anchor = this.shadowRoot.querySelector(".tag-anchor");
      anchor.classList.remove("appear");
      circleContainer.classList.remove("effectAppear");
      anchor.classList.add("disappear");
      circleContainer.classList.add("effectDissapear");
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
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
      this.style.top = newValue.x + "%";
      this.style.left = newValue.y + "%";
      this.style.transform = "translate(-50%, -50%)";
    }
  }, {
    key: "isVisible",
    set: function set(newValue) {
      if (this.oldIsVisible === newValue) return;

      if (newValue === true) {
        this.__animateAppear();
      } else if (newValue === false) {
        this.__animateDisppear();
      }

      this.oldIsVisible = newValue;
    }
  }]);

  return XTagButton;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('x-tag-button', XTagButton);
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var XVolumeBar = /*#__PURE__*/function (_HTMLElement) {
  _inherits(XVolumeBar, _HTMLElement);

  var _super = _createSuper(XVolumeBar);

  function XVolumeBar() {
    var _this;

    _classCallCheck(this, XVolumeBar);

    _this = _super.call(this);
    _this.htmlManager = new HTMLManager();
    _this.maxVolume = 100;
    _this.volume = 0;
    _this.isVolMoving = false;

    _this.volumeChanged = function () {};

    var shadow = _this.attachShadow({
      mode: 'open'
    });

    var container = _this.htmlManager.createElement("div", ["volume-bar-container"]);

    var volumeButton = _this.createVolumeButton();

    var volumeBar = _this.htmlManager.createElement("div", ["volume-bar-rect"]);

    var volumeLevelBar = _this.htmlManager.createElement("div", ["volume-bar-level"]);

    container.appendChild(volumeButton);
    container.appendChild(volumeBar);
    volumeBar.appendChild(volumeLevelBar);
    shadow.appendChild(container);
    shadow.appendChild(_this.getStyle());

    _this.__setupEventsListeners(volumeBar, container);

    return _this;
  }

  _createClass(XVolumeBar, [{
    key: "createVolumeButton",
    value: function createVolumeButton() {
      var buttonContainer = this.htmlManager.createElement("div", ["volume-icon-container"]);
      var button = this.htmlManager.createElement("button", ["volume-button"]);
      var icon = this.htmlManager.createElement("i", ["gg-volume"]);
      buttonContainer.appendChild(button);
      button.appendChild(icon);
      return buttonContainer;
    }
  }, {
    key: "__setupEventsListeners",
    value: function __setupEventsListeners(volumeBar, container) {
      volumeBar.onmousedown = this.__mouseDown.bind(this);
      container.onmouseenter = this.__mouseEnter.bind(this);
      container.onmouseleave = this.__mouseLeaveElement.bind(this);
      document.addEventListener('mouseup', this.__mouseUp.bind(this));
      document.addEventListener('mouseleave', this.__mouseLeaveDocument.bind(this));
      document.addEventListener('mousemove', this.__mouseMoving.bind(this));
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
    value: function __mouseMoving(event) {
      if (!this.isVolMoving) {
        return;
      }

      this.__calculateVolumePosition(event.clientX);
    }
  }, {
    key: "__mouseDown",
    value: function __mouseDown(event) {
      this.isVolMoving = true;

      this.__calculateVolumePosition(event.clientX);
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
      volume = volume > 100 ? 100 : volume;
      this.volume = volume;
      this.volumeChanged(volume);
      var volumeLevelBar = this.shadowRoot.querySelector(".volume-bar-level");
      volumeLevelBar.style.width = volume + "%";
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var style = document.createElement("style");
      style.textContent = "\n            .volume-bar-container {\n                margin-right: 0.5px;\n                cursor: pointer;\n                display: flex;\n            }\n\n            .volume-bar-container:hover,\n            .volume-bar-container:focus {\n                color: rgb(97, 87, 245);\n            }\n            \n            .volume-bar-rect {\n                display: none;\n                height: 3px;\n                background:white;\n                width: 50px;\n                margin: auto;\n                cursor: pointer;\n                transition: height 0.2s;\n            }\n\n            .volume-bar-rect:hover,\n            .volume-bar-rect:focus {\n                height: 7px;\n            }\n            \n             .volume-bar-rect-focus {\n                display: block;\n            }\n\n            .volume-bar-level {\n                height: 100%;\n                width: 0%;\n                background: rgb(97, 87, 245);\n            }\n            \n            .volume-icon-container {\n                background: rgba(0,0,0,0);\n                height: 2em;\n                padding-left: 0.4em;\n                padding-right: 0.4em;\n                border: none;\n                cursor: pointer;\n            }\n            \n            .volume-button {\n                color: white;  \n                border: none;\n                outline: none;\n                background-color: rgba(0,0,0,0);\n                height: 100%; \n                width: 2em;\n                margin: auto;\n                padding: 0;\n                cursor: pointer;\n            }\n            \n            .volume-button:hover,\n            .volume-button:focus {\n                color: rgb(97, 87, 245);\n            }\n\n            /* ICON */\n            /* ICON */\n            .gg-volume {\n                box-sizing: border-box;\n                position: relative;\n                display: block;\n                transform: scale(var(--ggs,1));\n                width: 8px;\n                height: 8px;\n                border: 2px solid;\n                border-right: 0;\n                -webkit-perspective: 12px;\n                perspective: 12px;\n                border-top-left-radius: 4px;\n                border-bottom-left-radius: 4px;\n                margin: 0;\n            }\n            .gg-volume::after,\n            .gg-volume::before {\n                content: \"\";\n                display: block;\n                box-sizing: border-box;\n                position: absolute;\n            }\n            .gg-volume::before {\n                left: 2px;\n                transform: rotateY(-90deg);\n                width: 10px;\n                height: 10px;\n                border: 2px solid;\n                border-left: 0;\n                top: -3px;\n            }\n            .gg-volume::after {\n                width: 8px;\n                height: 16px;\n                border: 6px double;\n                border-left: 0;\n                border-top-right-radius: 100px;\n                border-bottom-right-radius: 100px;\n                right: -14px;\n                top: -6px;\n            }    \n        ";
      return style;
    }
  }]);

  return XVolumeBar;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('x-volume-bar', XVolumeBar);
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