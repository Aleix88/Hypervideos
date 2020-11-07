class HypervideoControlls {

    constructor(videoSRC, containerID){
        this.videoSRC = videoSRC;
        this.containerID = containerID;
        this.htmlManager = new HTMLManager(); 

    }

    pauseVideo() {}

    playVideo() {}

    createSkeleton() {
        const hypervideo = document.getElementById(this.containerID);
        const container = this.htmlManager.createElement("div", "hypervideo-container");
        const tagsContainer = this.htmlManager.createElement("div", "tags-container");

        hypervideo.appendChild(container);

        this.addVideoElement(container);
        this.addTopBarControlls(container);
        container.appendChild(tagsContainer);
        this.addBottomBarControlls(container);
    }

    addVideoElement(container) {
        const video = this.htmlManager.createElement("video");
        video.src = this.videoSRC;
        container.appendChild(video);
    }

    addTopBarControlls(container) {
        const topContainer = this.htmlManager.createElement("div", "top-controller");
        container.appendChild(topContainer);
    }

    addBottomBarControlls(container) {
        const bottomController = this.htmlManager.createElement("div", "bottom-controller");
        container.appendChild(bottomController);
    }

}