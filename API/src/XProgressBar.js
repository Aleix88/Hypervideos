class XProgressBar extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        let shadow = this.attachShadow({mode: 'open'});
        
        const bar = this.htmlManager.createElement("div", ["progress-bar"]);
        shadow.appendChild(this.getStyle());
        shadow.appendChild(bar);

    }

    setProgress(progress) {
        const progressBar = this.shadowRoot.querySelector(".progress-bar");
        progressBar.style.width = progress + "%";
    }

    getStyle() {
        const style = document.createElement("style");
        style.textContent = `
            .progress-bar {
                background: blue;
                height: 100%;
                width: 50%;
            }
        `;
        return style;
    }

}

customElements.define('x-progress-bar', XProgressBar);