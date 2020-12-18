class HypervideoControlls {

    constructor(videoSRC, videoType, containerID, videoManager, tags){
        this.videoLength = null;
        this.containerID = containerID;
        this.videoSRC = videoSRC;
        this.videoManager = videoManager;
        this.videoType = videoType;
        this.tags = tags;
        this.htmlManager = new HTMLManager(); 
        this.videoManager.videoStateChanged = this.__videoStateChanged.bind(this);
    }

    __videoStateChanged(state, target) {
        const progressBar = document.getElementById(this.containerID).querySelector("x-progress-bar");
        const pauseScreen = document.getElementById(this.containerID).querySelector("x-pause-screen");
        const volumeBar = document.getElementById(this.containerID).querySelector("x-volume-bar");

        switch (state) {
            case VideoManager.PLAYING:
                pauseScreen.hide();
                this.changeButtonIcon("control-play-button", "gg-play-pause");
                break;
            case VideoManager.PAUSED:
                pauseScreen.show();
                this.changeButtonIcon("control-play-button", "gg-play-button");
                break;
            case VideoManager.LOADED:
                volumeBar.setVolume(50);
                this.videoManager.setVolume(0.5);
                this.videoLength = target.duration;
                if (progressBar === null) break;
                progressBar.setMaxLength(target.duration);
                this.__setProgressBarTimestamps();
                break;
            case VideoManager.ENTER_FULL_SCREEN:
                this.changeButtonIcon("control-full-screen-button", "gg-minimize");
                break;
            case VideoManager.EXIT_FULL_SCREEN:
                this.changeButtonIcon("control-full-screen-button", "gg-maximize");
                break;
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
    }

    playButtonClicked() {
        console.log("Click play");
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
        this.__addPauseScreen(container);
        container.appendChild(tagsContainer);
        this.addBottomBarControlls(container);
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

    __addPauseScreen(container) {
        const pauseScreen = this.htmlManager.createElement("x-pause-screen");
        const thisReference = this;
        pauseScreen.didClick = (() => {
            if (thisReference.videoManager.isVideoPlaying()) {
                thisReference.videoManager.pause();
            } else {
                thisReference.videoManager.play();
            }
        });
        container.appendChild(pauseScreen);
    }

    addBottomBarControlls(container) {
        const bottomController = this.htmlManager.createElement("div",["bottom-controller"]);
        container.appendChild(bottomController);
        const playButton = this.createControlButton("control-play-button", "gg-play-button", this.playButtonClicked);
        const replayButton = this.createControlButton("control-repeat-button", "gg-repeat", this.restartVideo);
        const fullScreenButton = this.createControlButton( "control-full-screen-button", "gg-maximize", this.toggleFullScreen);
        const progressBar = this.createProgressBar();
        const volumeBar = this.createVolumeBar();
        bottomController.appendChild(playButton);
        bottomController.appendChild(replayButton);
        bottomController.appendChild(fullScreenButton);
        bottomController.appendChild(progressBar);
        bottomController.appendChild(volumeBar);
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
        this.__setupProgressBarTimer(progressBar);
        return progressBar;
    }

    __setupProgressBarTimer(progressBar) {
        const observer = new Observer(() => {
            progressBar.increment();
        })
        this.videoManager.addObserver(observer);
    }


    __progressBarChanged(progress) {
        this.videoManager.loadProgress(progress);
    }

    __setProgressBarTimestamps() {
        const progressBar = document.getElementById(this.containerID).querySelector("x-progress-bar");
        for (let t of this.tags) {
            const timestamp = t.timeConfig.timestamp;
            progressBar.addMarkerAt(timestamp);
        }
    }

    createVolumeBar() {
        const volumeBar = this.htmlManager.createElement("x-volume-bar", ["volume-bar"]);
        volumeBar.volumeChanged = this.__volumeChanged.bind(this);
        return volumeBar;
    }

    __volumeChanged(volume) {
        this.videoManager.setVolume(volume/100);
    }

}
