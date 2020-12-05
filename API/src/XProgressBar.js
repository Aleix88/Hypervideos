class XProgressBar extends HTMLElement {

    constructor() {
        super();
        this.isMoving = false;
        this.htmlManager = new HTMLManager();
        this.maxLength = 100;
        this.currentLength = 0;
        this.currentProgress = 0;
        this.progressBarChanged = null;
        let shadow = this.attachShadow({mode: 'open'});

        this.__setupEventsListeners();
        const bar = this.htmlManager.createElement("div", ["progress-bar"]);
        shadow.appendChild(this.getStyle());
        shadow.appendChild(bar);

        this.addMarkerAt(10);
        this.addMarkerAt(40);
    }

    static POSITION_SET = "POSITION_SET";

    addMarkerAt(length) {
        const marker = this.htmlManager.createElement("div", ["progress-bar-marker"]);
        const progress = this.convertLengthToProgress(length);
        this.shadowRoot.appendChild(marker);
        marker.style.left = progress + "%";
    }

    __setupEventsListeners() {
        this.onmousedown = this.__mouseDown.bind(this);
        document.addEventListener('mouseup', this.__mouseUp.bind(this));
        document.addEventListener('mouseleave', this.__mouseLeave.bind(this));
        document.addEventListener('mousemove', this.__mouseMoving.bind(this));
    }
    
    __recalculatePosition(clientX) {
        const rect = this.getBoundingClientRect();
        const posX = clientX - rect.left;
        let progress = posX / rect.width;
        progress = progress > 1 ? 1 : progress;
        progress = progress < 0 ? 0 : progress;
        this.setCurrentLength(progress * this.maxLength);
    }

    __mouseLeave(event) {
        if (!this.isMoving) {return;}
        this.isMoving = false;
        this.__recalculatePosition(event.clientX);
        this.progressBarChanged(this.currentProgress);
    }

    __mouseUp(event) {
        if (!this.isMoving) {return;}
        this.isMoving = false;
        this.__recalculatePosition(event.clientX);
        this.progressBarChanged(this.currentProgress);
    }

    __mouseMoving(event) {
        if (!this.isMoving) {return;}
        this.__recalculatePosition(event.clientX);
    }

    __mouseDown(event) {
        this.isMoving = true;
        this.__recalculatePosition(event.clientX);
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
        this.currentLength = this.currentLength > this.maxLength ? this.maxLength : this.currentLength;
        this.currentLength = this.currentLength < 0 ? 0 : this.currentLength;
        const progressBar = this.shadowRoot.querySelector(".progress-bar");
        const progress = this.convertLengthToProgress(length);
        this.currentProgress = progress/100;
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
                background: rgb(97, 87, 245);
                position: absolute;
                height: 100%;
                width: 0%;
            }

            .progress-bar-marker {
                width: 7px;
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