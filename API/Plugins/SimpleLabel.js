class SimpleLabel {

    constructor() {}

    onLoad(config, container, videoManager) {
        this.config = config;
        this.container = container;
        this.videoManager = videoManager;
    }

    onTagClick(target) {
        console.log("Plugin click");
    }

    onTagHover(target) {
        console.log("Plugin hover");
        this.__createLabel();
    }

    __createLabel() {
        const labelContainer = document.createElement("div");
        const text = document.createElement("p");

        labelContainer.style.position = "absolute";
        labelContainer.style.top = "100px";
        labelContainer.style.left = "100px";
        text.textContent = "Text de prova";

        labelContainer.appendChild(text);
        this.container.appendChild(labelContainer);
    }

}