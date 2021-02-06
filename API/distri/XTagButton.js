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