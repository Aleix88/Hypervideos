class SimpleLabel {

    constructor() {}

    onLoad(config, container, videoManager) {
        this.config = config;
        this.container = container;
        this.videoManager = videoManager;
        this.__createLabel();
    }

    onTagClick(target) {}

    onTagHover(target) {
        this.__showLabel();
        this.__repositionLabel(target);
    }

    onTagLeave(target) {
        this.__hideLabel();
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
        const scrollTop = window.pageYOffset || document.documentElement || document.body.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
        const targetTop = target.getBoundingClientRect().top + scrollTop;
        const targetLeft = target.getBoundingClientRect().left + scrollLeft;
        const targetRelTop = targetTop - containerTop;
        const targetRelLeft = targetLeft - containerLeft;
        const targetWidth = target.getBoundingClientRect().width;
        const targetHeight = target.getBoundingClientRect().height;
        const x = targetRelLeft / containerWidth;
        const y = targetRelTop / containerHeight;


        const labelContainerHeight = this.labelContainer.getBoundingClientRect().height;
        const labelContainerWidth = this.labelContainer.getBoundingClientRect().width;


        const labelTop = y < 0.5 ? targetTop + targetHeight : targetTop - labelContainerHeight;
        const labelLeft = x < 0.5 ? targetLeft + targetWidth : targetLeft - labelContainerWidth;

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

        this.textElement.textContent = this.config.text;
        this.textElement.style.color = "white";
        this.textElement.style.margin = "1.3em .7em";

        this.labelContainer.appendChild(this.textElement);
        document.body.appendChild(this.labelContainer);
    }

}