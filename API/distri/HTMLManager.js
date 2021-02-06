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