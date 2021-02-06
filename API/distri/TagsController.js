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
    value: function addTags(tags) {
      var _iterator = _createForOfIteratorHelper(tags),
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