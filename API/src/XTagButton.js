class XTagButton extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.attachShadow({mode: 'open'});

        const anchor = this.htmlManager.createElement("a", ["tag-anchor"]);
        const aspectRatioDiv = this.htmlManager.createElement("div", ["aspect-ratio-div"]);
        this.shadowRoot.appendChild(aspectRatioDiv);
        this.shadowRoot.appendChild(anchor);
        this.shadowRoot.appendChild(this.getStyle());
        this.__setupEventListeners(anchor);
    }

    set color(newValue) {
        const anchor = this.shadowRoot.querySelector(".tag-anchor");
        anchor.style.background = newValue;
    }

    get color() {return this.color;}

    __setupEventListeners(element) {
        element.addEventListener('mousedown', this.__onMouseDown.bind(this));
        element.addEventListener('click', this.__onClick.bind(this));
        element.addEventListener('mouseenter', this.__onHover.bind(this));
        element.addEventListener('mouseleave', this.__onMouseUp.bind(this));
        document.addEventListener('mouseup', this.__onMouseUp.bind(this));
    }

    __onClick() {
        console.log("Click");
    }

    __onHover() {
        console.log("Hover");
    }

    __onMouseDown() {
        console.log("Hold");
    }

    __onMouseUp() {
        console.log("Up");
    }

    getStyle() {

        let style = document.createElement("style");
        style.textContent = `

            .aspect-ratio-div {
                margin-top: 100%;
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
            }
        `;

        return style;

    }



}

customElements.define('x-tag-button', XTagButton);