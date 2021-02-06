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