class XTagButton extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.attachShadow({mode: 'open'});
        this.oldIsVisible = false;
        this.hoverHandler = null;
        this.clickHandler = null;
        this.leaveHandler = null;

        this.tagCircleContainer = this.htmlManager.createElement("div", {classList: ["tag-circle-container"]});
        this.anchor = this.htmlManager.createElement("a", {classList: ["tag-anchor"]});
        this.aspectRatioDiv = this.htmlManager.createElement("div", {classList: ["aspect-ratio-div"]});

        this.shadowRoot.appendChild(this.tagCircleContainer);
        this.shadowRoot.appendChild(this.anchor);
        this.shadowRoot.appendChild(this.aspectRatioDiv);
        this.shadowRoot.appendChild(this.getStyle());
        this.__setupEventListeners(this);
    }

    set hexColor(newValue) {
        const anchor = this.shadowRoot.querySelector(".tag-anchor");
        const tagCircleContainer = this.shadowRoot.querySelector(".tag-circle-container");
        const rgba = this.htmlManager.hexToRGBA(newValue, 0.5);
        anchor.style.background = newValue;
        tagCircleContainer.style.background = rgba;
    }

    get hexColor() {return this.hexColor;}

    set position(newValue) {
        this.style.top = newValue.x + "%";
        this.style.left = newValue.y + "%";
        this.style.transform = "translate(-50%, -50%)";
    }

    set isVisible(newValue) {
        if (this.oldIsVisible === newValue) return;
        if (newValue === true) {
            this.__animateAppear();
        } else if (newValue === false) {
            this.__animateDisppear();
        }
        this.oldIsVisible = newValue;
    }

    __setupEventListeners(element) {
        element.addEventListener('click', this.__onClick.bind(this));
        element.addEventListener('mouseenter', this.__onHover.bind(this));
        element.addEventListener('mouseleave', this.__onMouseLeave.bind(this));
    }

    __onClick(event) {
        this.clickHandler(event);
    }

    __onHover(event) {
        this.__animateFocusScale();
        this.hoverHandler(event);
    }

    __onMouseLeave(event) {
        this.__animateDefaultScale();
        this.leaveHandler(event);
    }
    
    __animateDefaultScale() {
        this.anchor.classList.add("defaultScale");
        this.anchor.classList.remove("focusScale");
        this.anchor.classList.remove("appear");
    }

    __animateFocusScale() {
        this.anchor.classList.add("focusScale");
        this.anchor.classList.remove("defaultScale");
        this.anchor.classList.remove("appear");
    }

    __animateAppear() {
        this.style.visibility = "visible";
        this.anchor.classList.remove("disappear");
        this.tagCircleContainer.classList.remove("effectDissapear");
        this.anchor.classList.add("appear");
        this.tagCircleContainer.classList.add("effectAppear");
    }

    __animateDisppear() {

        const thisReference = this;
        const timer = setInterval(() => {
            thisReference.style.visibility = "hidden";
            clearTimeout(timer);
        }, 350);

        this.anchor.classList.remove("appear");
        this.tagCircleContainer.classList.remove("effectAppear");
        this.anchor.classList.add("disappear");
        this.tagCircleContainer.classList.add("effectDissapear");
    }

    getStyle() {

        let style = document.createElement("style");
        style.textContent = `

            .aspect-ratio-div {
                margin-top: 100%;
            }

            .tag-circle-container {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                opacity: 0;

                -webkit-transition: opacity 0.3s;
                -moz-transition: opacity 0.3s;
                -ms-transition: opacity 0.3s;
                -o-transition: opacity 0.3s;
                transition: opacity 0.3s;

                -webkit-animation: crescendo 1.5s alternate infinite ease-in;
                -moz-animation: crescendo 1.5s alternate infinite ease-in;
                -ms-animation: crescendo 1.5s alternate infinite ease-in;
                -o-animation: crescendo 1.5s alternate infinite ease-in;
                animation: crescendo 1.5s alternate infinite ease-in;

            }

            .tag-circle-container.effectAppear {
                opacity: 1;
            }

            .tag-circle-container.effectDissapear {
                opacity: 0;
            }


            @keyframes crescendo {
                0% {transform: scale(1);}
                100% {transform: scale(1.5);}
            }

            .tag-anchor {
                display:block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                cursor: pointer;
                transform: scale(0);
                -webkit-transition: transform 0.3s;
                -moz-transition: transform 0.3s;
                -ms-transition: transform 0.3s;
                -o-transition: transform 0.3s;
                transition: transform 0.3s;
            }

            .tag-anchor.defaultScale {
                transform: scale(1);
            }

            .tag-anchor.focusScale {
                transform: scale(1.5);
            }

            .tag-anchor.disappear {
                transform: scale(0);
            }

            .tag-anchor.appear {
                transform: scale(1);
            }
        `;

        return style;

    }



}

customElements.define('x-tag-button', XTagButton);