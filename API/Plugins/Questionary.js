class Questionary {

    constructor() {}

    onLoad(config, container, elementsContainerID, videoManager) {
        this.config = config;
        this.container = container;
        this.elementsContainerID = elementsContainerID;
        this.videoManager = videoManager;
        this.focus = false;
    }

    onTagClick(event) {
        const elementsContainer = document.getElementById(this.elementsContainerID);
        elementsContainer.style.display = "block";
    }

    onTagHover(event) {
    }

    onTagLeave(event) {
    }

    fullScreenStateChanged(isFullScreen) {
    }

}