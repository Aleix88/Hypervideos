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
        throw "Error: Can't setup an hypervideo if DOM is not loaded.";
      }

      this.tags = this.__tagsJSONToObject(tagsJSON);
      var videoManagerFactory = new VideoManagerFactory();
      var videoManager = videoManagerFactory.create(this.videoType, this.containerID);
      var hypervideoControlls = new HypervideoControlls(this.videoURL, this.videoType, this.containerID, videoManager, this.tags);
      hypervideoControlls.createSkeleton();
      var tagsController = new TagsController(this.containerID, videoManager);
      tagsController.addTags(this.tags);
    }
  }, {
    key: "__tagsJSONToObject",
    value: function __tagsJSONToObject(tagsJSON) {
      try {
        var tagsConfig = JSON.parse(tagsJSON).tags;
        return tagsConfig;
      } catch (error) {
        throw "Error: Not valid JSON";
      }
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