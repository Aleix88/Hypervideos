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