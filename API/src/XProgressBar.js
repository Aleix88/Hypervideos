class XProgressBar extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.maxLength = 100;
        this.currentLength = 0;
        let shadow = this.attachShadow({mode: 'open'});

        this.addEventListener('click', this.onClickBar);
        const bar = this.htmlManager.createElement("div", ["progress-bar"]);
        shadow.appendChild(this.getStyle());
        shadow.appendChild(bar);

        this.addMarkerAt(10);
        this.addMarkerAt(40);
    }

    addMarkerAt(length) {
        const marker = this.htmlManager.createElement("div", ["progress-bar-marker"]);
        const progress = this.convertLengthToProgress(length);
        this.shadowRoot.appendChild(marker);
        marker.style.left = progress + "%";
    }

    onClickBar(event) {
        const rect = event.target.getBoundingClientRect();
        const posX = event.clientX - rect.left;
        const progress = posX / rect.width;
        this.setCurrentLength(progress * this.maxLength);
        this.progressBarChanged(progress);
    }

    startMoving() {
        const progressBar = this;
        this.__timeInterval = setInterval(() => {
            progressBar.increment(1);
        }, 1000);
    }

    stopMoving() {
        if (this.__timeInterval !== undefined && this.__timeInterval !== null) {
            clearInterval(this.__timeInterval);
        }
    }

    convertLengthToProgress(length) {
        return (length / this.maxLength) * 100;
    }

    setCurrentLength(length) {
        this.currentLength = length;
        const progressBar = this.shadowRoot.querySelector(".progress-bar");
        const progress = this.convertLengthToProgress(length);
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
                position: absolute;
                height: 100%;
                width: 0%;
            }

            .progress-bar-marker {
                width: 10px;
                height: 100%;
                top: 0;
                background: yellow;
                position: absolute;
            }
        `;
        return style;
    }

}

customElements.define('x-progress-bar', XProgressBar);