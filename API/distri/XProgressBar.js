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
    _this.maxLength = 100; //Max lenghts represents the video duration in seconds. Default value: 100s

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
  }, {
    key: "convertLengthToProgress",
    value: function convertLengthToProgress(length) {
      return Math.round(parseFloat(length) / parseFloat(this.maxLength) * 100);
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