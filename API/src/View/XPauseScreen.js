class XPauseScreen extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.clickHandler = null;

        let shadow = this.attachShadow({mode: 'open'});
        const container = this.htmlManager.createElement('div', {classList: ["pause-container"]});
        container.addEventListener('click', this.__onClick.bind(this));
        shadow.appendChild(container);
        shadow.appendChild(this.__getStyle());
    }

    __onClick() {
        this.clickHandler();
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