class XProgressBar extends HTMLElement {

    constructor() {
        super();
        this.isMoving = false;
        this.htmlManager = new HTMLManager();
        this.maxLength = 100; //Max lenghts represents the video duration in seconds. Default value: 100s
        this.currentLength = 0;
        this.currentProgress = 0;
        this.progressBarChanged = null;
        let shadow = this.attachShadow({mode: 'open'});

        this.__setupEventsListeners();
        const bar = this.htmlManager.createElement("div", {classList: ["progress-bar"]});
        shadow.appendChild(this.__getStyle());
        shadow.appendChild(bar);
    }

    addMarkerAt(length) {
        const marker = this.htmlManager.createElement("div", {classList: ["progress-bar-marker"]});
        const progress = this.__convertLengthToProgress(length);
        this.shadowRoot.appendChild(marker);
        marker.style.left = progress + "%";
    }

    __setupEventsListeners() {
        const eventsManager = new TouchEventsManager();
        eventsManager.touchStart(this, this.__mouseDown.bind(this));
        eventsManager.touchEnd(document, this.__mouseUp.bind(this));
        eventsManager.touchLeave(document, this.__mouseLeave.bind(this));
        eventsManager.touchMove(document, this.__mouseMoving.bind(this));
    }
    
    __recalculatePosition(clientX) {
        const rect = this.getBoundingClientRect();
        const posX = clientX - rect.left;
        let progress = posX / rect.width;
        progress = progress > 1 ? 1 : progress;
        progress = progress < 0 ? 0 : progress;
        this.setCurrentLength(progress * this.maxLength);
    }

    __mouseLeave(type, event) {
        if (!this.isMoving) {return;}
        this.isMoving = false;
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.changedTouches[0].clientX : event.clientX;
        this.__recalculatePosition(clientX);
        this.progressBarChanged(this.currentProgress);
    }

    __mouseUp(type, event) {
        if (!this.isMoving) {return;}
        this.isMoving = false;
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.changedTouches[0].clientX : event.clientX;
        this.__recalculatePosition(clientX);
        this.progressBarChanged(this.currentProgress);
    }

    __mouseMoving(type, event) {
        if (!this.isMoving) {return;}
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;
        this.__recalculatePosition(clientX);
    }

    __mouseDown(type, event) {
        this.isMoving = true;
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;
        this.__recalculatePosition(clientX);
    }

    __convertLengthToProgress(length) {
        return Math.round((parseFloat(length) / parseFloat(this.maxLength)) * 100); 
    }

    setCurrentLength(length) {
        this.currentLength = length;
        this.currentLength = this.currentLength > this.maxLength ? this.maxLength : this.currentLength;
        this.currentLength = this.currentLength < 0 ? 0 : this.currentLength;
        const progressBar = this.shadowRoot.querySelector(".progress-bar");
        const progress = this.__convertLengthToProgress(length);
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

    __getStyle() {
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