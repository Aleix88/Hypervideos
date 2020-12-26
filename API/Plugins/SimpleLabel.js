class SimpleLabel {

    constructor() {}

    onLoad(config, container, elementsContainerID, videoManager) {
        this.config = config;
        this.container = container;
        this.elementsContainerID = elementsContainerID;
        this.videoManager = videoManager;
        this.focus = false;
        this.__createLabel();
        document.addEventListener("click", this.__documentClicked.bind(this));
    }

    onTagClick(event) {
        this.focus = true;
        event.stopPropagation();
    }

    onTagHover(event) {
        const target = event.target;
        this.__showLabel();
        this.__repositionLabel(target);
    }

    onTagLeave(event) {
        if (this.focus === true) {return;}
        this.__hideLabel();
    }

    fullScreenStateChanged(isFullScreen) {
        this.__hideLabel();
        this.focus = false;
    }

    __documentClicked(event) {
        this.__hideLabel();
        this.focus = false;
    }

    __hideLabel() {
        this.labelContainer.style.display = "none";
    }

    __showLabel() {
        this.labelContainer.style.display = "block";
    }
    
    __repositionLabel(target) {
        const containerTop = this.container.getBoundingClientRect().top;
        const containerLeft = this.container.getBoundingClientRect().left;
        const containerHeight = this.container.getBoundingClientRect().height;
        const containerWidth = this.container.getBoundingClientRect().width;
        const targetTop = target.getBoundingClientRect().top;
        const targetLeft = target.getBoundingClientRect().left;
        const targetRelTop = targetTop - containerTop;
        const targetRelLeft = targetLeft - containerLeft;
        const targetWidth = target.getBoundingClientRect().width;
        const targetHeight = target.getBoundingClientRect().height;
        const x = targetRelLeft / containerWidth;
        const y = targetRelTop / containerHeight;

        const labelContainerHeight = this.labelContainer.getBoundingClientRect().height;
        const labelContainerWidth = this.labelContainer.getBoundingClientRect().width;

        const labelTop = y < 0.5 ? targetRelTop + targetHeight : targetRelTop - labelContainerHeight;
        const labelLeft = x < 0.5 ? targetRelLeft + targetWidth : targetRelLeft - labelContainerWidth;

        this.labelContainer.style.top = labelTop + "px";
        this.labelContainer.style.left = labelLeft + "px";
    }

    __createLabel() {
        this.labelContainer = document.createElement("div");
        this.textElement = document.createElement("p");

        this.labelContainer.style.display = "none";
        this.labelContainer.style.position = "absolute";
        this.labelContainer.style.top = "100px";
        this.labelContainer.style.left = "100px";
        this.labelContainer.style.background = "rgba(0,0,0, 0.7)";
        this.labelContainer.style.borderRadius = "5px";
        this.labelContainer.style.maxHeight = "30%";
        this.labelContainer.style.maxWidth = "30%";
        this.labelContainer.style.pointerEvents = "all";

        this.textElement.innerHTML = this.config.text;
        this.textElement.style.color = "white";
        this.textElement.style.margin = "1.3em .7em";

        this.labelContainer.appendChild(this.textElement);
        this.container.appendChild(this.labelContainer);
    }

}