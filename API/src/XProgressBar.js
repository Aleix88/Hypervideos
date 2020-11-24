class XProgressBar extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.maxLength = 100;
        this.currentLength = 0;
        let shadow = this.attachShadow({mode: 'open'});
        
        const bar = this.htmlManager.createElement("div", ["progress-bar"]);
        shadow.appendChild(this.getStyle());
        shadow.appendChild(bar);
    }

    setCurrentLength(length) {
        this.currentLength = length;
        const progressBar = this.shadowRoot.querySelector(".progress-bar");
        const progress = (length / this.maxLength) * 100;
        progressBar.style.width = progress + "%";
    }

    setMaxLength(length) {
        this.maxLength = length;
    }

    increment(value) {
        let inc = 1;
        if (value !== undefined && value !== null && !isNaN(value)) {
            inc = value;
        }
        this.setCurrentLength(this.currentLength + inc);
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