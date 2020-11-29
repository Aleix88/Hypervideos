class HypervideoControlls {

    constructor(videoSRC, videoType, containerID, videoManager){
        this.videoSRC = videoSRC;
        this.videoType = videoType;
        this.containerID = containerID;
        this.videoManager = videoManager;
        this.htmlManager = new HTMLManager(); 
    }

    restartVideo() {
        this.videoManager.restartVideo();
    }

    toggleFullScreen() {
        this.videoManager.toggleFullScreen();
        const iconName = this.videoManager.isFullScreen() ? "gg-minimize" : "gg-maximize";
        this.changeButtonIcon("control-full-screen-button", iconName);
    }

    playButtonClicked() {
        if (this.videoManager.isPaused) {
            this.videoManager.play();
            this.changeButtonIcon("control-play-button", "gg-play-pause");
        } else {
            this.videoManager.pause();
            this.changeButtonIcon("control-play-button", "gg-play-button");
        }
    }

    changeButtonIcon(buttonClass, iconName) {
        let button = document.getElementById(this.containerID).querySelector("."+buttonClass);
        if (button.length <= 0) {
            return;
        }
        let icon = button.getElementsByTagName("i");
        if (icon.length <= 0) {
            return;
        }
        icon[0].className = iconName;
    }

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
        this.videoElementID = "video-" + this.containerID;
        const video = this.htmlManager.createElement("video", "", this.videoElementID);
        video.src = this.videoSRC;
        container.appendChild(video);
    }

    addVideoFromYotube(container) {
        //TODO: L'enables API segurament ho necessesitare per implementar alguna cosa dels tags.
       /* const frame = this.htmlManager.createElement("iframe", ["youtube-frame"]);
        let src = this.videoSRC;
        src += "?autoplay=0&controls=0&showinfo=0&disablekb=1&fs=0&playsinline=1&wmode=opaque&iv_load_policy=3&modestbranding=1&rel=0";
        frame.src = src;
        frame.id = "player";
        frame.frameBorder = 0;*/
        this.videoElementID = "video-" + this.containerID;
        const div = this.htmlManager.createElement("div", ["youtube-frame"]);
        div.id = this.videoElementID;
        container.appendChild(div);
        this.videoManager.addYoutubeScript(this.videoElementID);
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
        const playButton = this.createControlButton("control-play-button", "gg-play-button", this.playButtonClicked);
        const replayButton = this.createControlButton("control-repeat-button", "gg-repeat", this.restartVideo);
        const fullScreenButton = this.createControlButton( "control-full-screen-button", "gg-maximize", this.toggleFullScreen);
        const volumeButton = this.createControlButton("control-volume-button", "gg-volume");
        const progressBar = this.createProgressBar();
        bottomController.appendChild(playButton);
        bottomController.appendChild(replayButton);
        bottomController.appendChild(fullScreenButton);
        bottomController.appendChild(progressBar);
        bottomController.appendChild(volumeButton);
    }

    createControlButton(buttonClass, buttonIcon, eventHandler) {
        const buttonContainer = this.htmlManager.createElement("div", ["control-button-container"]);
        const button = this.htmlManager.createElement("button", ["control-button",buttonClass]);
        const icon = this.htmlManager.createElement("i", [buttonIcon]);
        buttonContainer.appendChild(button);
        button.appendChild(icon);
        if (eventHandler !== null && eventHandler !== undefined) {
            buttonContainer.addEventListener("click", eventHandler.bind(this));
        }
        return buttonContainer;
    }

    createProgressBar() {
        const progressBar = this.htmlManager.createElement("x-progress-bar", ["progress-container"]);
        
        return progressBar;
    }

}
