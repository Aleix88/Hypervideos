class XPauseScreen extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.didClick = null;

        let shadow = this.attachShadow({mode: 'open'});
        const container = this.htmlManager.createElement('div', {classList: ["pause-container"]});
        container.addEventListener('click', this.__onClick.bind(this));
        //this.__addPlayIcon(container);
        shadow.appendChild(container);
        shadow.appendChild(this.__getStyle());
    }

    hide() {
        const container = this.shadowRoot.querySelector(".pause-container");
        container.classList.add("hide");
    }

    show() {
        const container = this.shadowRoot.querySelector(".pause-container");
        container.classList.remove("hide");
    }

    __onClick() {
        this.didClick();
    }

    __addPlayIcon(container) {
        const img = this.htmlManager.createElement("img", {classList: ["play-image"]});
        img.src = "./../../API/assets/play-button.svg";
        container.appendChild(img);
    }

    __getStyle () {
        const style = document.createElement("style");
        style.textContent = `

            .pause-container {
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.1);
                cursor: pointer;
                display: flex;
                margin: 0;
            }

            .hide {
                opacity: 0;
            }

            .play-image {
                width: 100px;
                height: 100px;
                margin: auto;
            }
        `;

        return style;
    }

}

customElements.define('x-pause-screen', XPauseScreen);