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