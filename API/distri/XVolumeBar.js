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