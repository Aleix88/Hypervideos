class HypervideoControlls {

    constructor(videoSRC, videoType, containerID){
        this.videoSRC = videoSRC;
        this.videoType = videoType;
        this.containerID = containerID;
        this.htmlManager = new HTMLManager(); 

    }

    pauseVideo() {}

    playVideo() {}

    createSkeleton() {
        const hypervideo = document.getElementById(this.containerID);
        const container = this.htmlManager.createElement("div", ["hypervideo-container"]);
        const tagsContainer = this.htmlManager.createElement("div", ["tags-container"]);

        hypervideo.appendChild(container);

        this.addVideoElement(container);
        if (this.videoType != Hypervideo.YOUTUBE_TYPE) {
            this.addTopBarControlls(container);
        }
        container.appendChild(tagsContainer);
        this.addBottomBarControlls(container);
    }

    addVideoTag(container) {
        const video = this.htmlManager.createElement("video");
        video.src = this.videoSRC;
        container.appendChild(video);
    }

    addVideoFromYotube(container) {
        //TODO: L'enables API segurament ho necessesitare per implementar alguna cosa dels tags.
        const frame = this.htmlManager.createElement("iframe", ["youtube-frame"]);
        let src = this.videoSRC;
        src += "?autoplay=0&controls=0&showinfo=0&disablekb=1&fs=0&playsinline=1&wmode=opaque&iv_load_policy=3&modestbranding=1&rel=0";
        frame.src = src;
        frame.frameBorder = 0;
        container.appendChild(frame);
    }

    addVideoElement(container) {
        switch (this.videoType) {
            case Hypervideo.YOUTUBE_TYPE:
                this.addVideoFromYotube(container);
                break;
            default:
                this.addVideoTag(container);
                break;
        }
    }

    addTopBarControlls(container) {
        const topContainer = this.htmlManager.createElement("div", ["top-controller"]);
        container.appendChild(topContainer);
    }

    addBottomBarControlls(container) {
        const bottomController = this.htmlManager.createElement("div",["bottom-controller"]);
        container.appendChild(bottomController);
        const playButton = this.createControlButton("control-play-button", "gg-play-button");
        const replayButton = this.createControlButton("control-repeat-button", "gg-repeat");
        const fullScreenButton = this.createControlButton( "control-full-screen-button", "gg-ratio");
        const volumeButton = this.createControlButton("control-volume-button", "gg-volume");
        const progressBar = this.createProgressBar();
        bottomController.appendChild(playButton);
        bottomController.appendChild(replayButton);
        bottomController.appendChild(fullScreenButton);
        bottomController.appendChild(progressBar);
        bottomController.appendChild(volumeButton);
    }

    createControlButton(buttonClass, buttonIcon) {
        const buttonContainer = this.htmlManager.createElement("div", ["control-button-container"]);
        const button = this.htmlManager.createElement("button", ["control-button",buttonClass]);
        const icon = this.htmlManager.createElement("i", [buttonIcon]);
        buttonContainer.appendChild(button);
        button.appendChild(icon);
        return buttonContainer;
    }

    createProgressBar() {
        const progressContainer = this.htmlManager.createElement("div", ["progress-container"]);
        
        return progressContainer;
    }

}