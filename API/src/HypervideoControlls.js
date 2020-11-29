class HypervideoControlls {

    constructor(videoSRC, videoType, containerID, videoManager){
        this.videoLength = null;
        this.videoSRC = videoSRC;
        this.videoType = videoType;
        this.containerID = containerID;
        this.videoManager = videoManager;
        this.htmlManager = new HTMLManager(); 
        this.videoManager.videoStateChanged = this.__videoStateChanged.bind(this);
    }

    __videoStateChanged(state, target) {
        const progressBar = document.getElementById(this.containerID).querySelector("x-progress-bar");
        switch (state) {
            case VideoManager.PLAYING:
                progressBar.startMoving();
                this.changeButtonIcon("control-play-button", "gg-play-pause");
                break;
            case VideoManager.PAUSED:
                progressBar.stopMoving();
                this.changeButtonIcon("control-play-button", "gg-play-button");
                break;
            case VideoManager.LOADED:
                this.videoLength = target.duration;
                if (progressBar === null) break;
                progressBar.setMaxLength(target.duration);
            default:
        }
    }

    restartVideo() {
        const progressBar = document.getElementById(this.containerID).querySelector("x-progress-bar");
        progressBar.setCurrentLength(0);
        this.videoManager.restartVideo();
    }

    toggleFullScreen() {
        this.videoManager.toggleFullScreen();
        const iconName = this.videoManager.isFullScreen() ? "gg-minimize" : "gg-maximize";
        this.changeButtonIcon("control-full-screen-button", iconName);
    }

    playButtonClicked() {
        if (!this.videoManager.isVideoPlaying()) {
            this.videoManager.play();
        } else {
            this.videoManager.pause();
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
        this.addBottomBarControlls(container);
        container.appendChild(tagsContainer);
    }

    addVideoTag(container) {
        this.videoElementID = "video-" + this.containerID;
        const video = this.htmlManager.createElement("video", "", this.videoElementID);
        video.src = this.videoSRC;
        container.appendChild(video);
        this.videoManager.setupVideo();
    }

    addVideoFromYotube(container) {
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
        progressBar.progressBarChanged = this.__progressBarChanged.bind(this);
        if (this.videoLength !== null) {
            progressBar.setMaxLength(this.videoLength);
        }
        return progressBar;
    }

    __progressBarChanged(progress) {
        this.videoManager.loadProgress(progress);
    }

}
