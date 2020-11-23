class HypervideoControlls {

    constructor(videoSRC, videoType, containerID){
        this.videoSRC = videoSRC;
        this.videoType = videoType;
        this.containerID = containerID;
        this.isVideoPaused = true;
        this.htmlManager = new HTMLManager(); 
    }

    setVolume(volume) {
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        const video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
        video.volume = volume;
    }

    pauseVideo() {
        const video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
        video.pause();
        this.changeButtonIcon("control-play-button", "gg-play-button");
        this.isVideoPaused = true;
    }

    playVideo() {
        const video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
        video.play();
        this.changeButtonIcon("control-play-button", "gg-play-pause");
        this.isVideoPaused = false;
    }

    setVideoCurrentTime(seconds) {
        const video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
        video.currentTime = seconds;
    }

    restartVideo() {
        this.setVideoCurrentTime(0);
    }

    isFullScreen() {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    }

    requestFullScreen(container) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
            this.changeButtonIcon("control-full-screen-button", "gg-minimize");
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
            this.changeButtonIcon("control-full-screen-button", "gg-minimize");
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
            this.changeButtonIcon("control-full-screen-button", "gg-minimize");
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
            this.changeButtonIcon("control-full-screen-button", "gg-minimize");
        }
    }

    requestExitFullScreen(container) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            this.changeButtonIcon("control-full-screen-button", "gg-maximize");
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            this.changeButtonIcon("control-full-screen-button", "gg-maximize");
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            this.changeButtonIcon("control-full-screen-button", "gg-maximize");
        }
    }

    toggleFullScreen() {
        const container = document.getElementById(this.containerID);
        if (this.isFullScreen()) {
            this.requestExitFullScreen(container);
        } else {
            this.requestFullScreen(container);
        }
    }

    playButtonClicked() {
        if (this.isVideoPaused) {
            this.playVideo();
        } else {
            this.pauseVideo();
        }
    }

    changeButtonIcon(buttonClass, iconName) {
        let button = this.htmlManager.getShadowElementByClassName(this.containerID, buttonClass);
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
        const hypervideo = document.getElementById(this.containerID).shadowRoot;
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
        const progressContainer = this.htmlManager.createElement("div", ["progress-container"]);
        
        return progressContainer;
    }

}
