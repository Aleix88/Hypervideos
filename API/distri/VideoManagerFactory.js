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