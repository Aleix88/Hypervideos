class BottomBarController {

    constructor (hypervideoController, containerID) {
        this.hypervideoController = hypervideoController;
        this.htmlManager = new HTMLManager();
        this.containerID = containerID;
        this.controlButton = new ControlButton(containerID);
    }

    addBottomBar(container) {
        const bottomController = this.htmlManager.createElement("div", {
            classList: ["bottom-controller"]
        });
        container.appendChild(bottomController);
        this.playButton = this.controlButton.createControlButton("control-play-button", "gg-play-button", this.__playButtonClicked.bind(this));
        this.replayButton = this.controlButton.createControlButton("control-repeat-button", "gg-repeat", this.__restartVideo.bind(this));
        this.timeCounter = this.__createTimeCounter();
        this.progressBar = this.__createProgressBar();
        this.volumeBar = this.__createVolumeBar();
        bottomController.appendChild(this.playButton);
        bottomController.appendChild(this.replayButton);
        if (this.htmlManager.isDesktopBrowser() === true) {
            this.fullScreenButton = this.controlButton.createControlButton( "control-full-screen-button", "gg-maximize", this.__toggleFullScreen.bind(this));
            bottomController.appendChild(this.fullScreenButton);
        }
        bottomController.appendChild(this.timeCounter);
        bottomController.appendChild(this.progressBar);
        bottomController.appendChild(this.volumeBar);
    }

    videoStateChanged(state, target) {
        switch (state) {
            case MediaManager.PLAYING:
                this.controlButton.changeButtonIcon("control-play-button", "gg-play-pause");
                break;
            case MediaManager.PAUSED:
                this.controlButton.changeButtonIcon("control-play-button", "gg-play-button");
                break;
            case MediaManager.LOADED:
                this.volumeBar.setVolume(50);
                this.videoLength = target.duration;
                this.progressBar.setMaxLength(target.duration * 1000);
                this.__setProgressBarTimestamps();
                break;
            case MediaManager.ENTER_FULL_SCREEN:
                this.controlButton.changeButtonIcon("control-full-screen-button", "gg-minimize");
                break;
            case MediaManager.EXIT_FULL_SCREEN:
                this.controlButton.changeButtonIcon("control-full-screen-button", "gg-maximize");
                break;
            default:
        }
    }

    videoTimeChange(time) {
        this.progressBar.setCurrentLength(time);
        this.timeCounter.currentTime = time/1000;
    }

    __restartVideo() {
        this.progressBar.setCurrentLength(0);
        this.hypervideoController.restartVideo();
    }

    __toggleFullScreen() {
        this.hypervideoController.toggleFullScreen();
    }

    __playButtonClicked() {
        this.hypervideoController.play();
    }

    __createTimeCounter() {
        const timeCounter = this.htmlManager.createElement("x-time-counter", {
            classList: ["time-counter"]
        });
        return timeCounter;
    }

    __createProgressBar() {
        const progressBar = this.htmlManager.createElement("x-progress-bar", {
            classList: ["progress-container"]
        });
        progressBar.progressBarChanged = this.__progressBarChanged.bind(this);
        if (this.videoLength !== null) {
            progressBar.setMaxLength(this.videoLength * 1000);
        }
        return progressBar;
    }

    __progressBarChanged(progress) {
        this.hypervideoController.loadVideoProgress(progress);
    }

    __setProgressBarTimestamps() {
        for (let t of this.tags) {
            const timestamp = t.timeConfig.timestamp;
            this.progressBar.addMarkerAt(timestamp * 1000);
        }
    }

    __createVolumeBar() {
        const volumeBar = this.htmlManager.createElement("x-volume-bar", {
            classList: ["volume-bar"]
        });
        volumeBar.volumeChanged = this.__volumeChanged.bind(this);
        return volumeBar;
    }

    __volumeChanged(volume) {
        this.hypervideoController.setVolume(volume/100);
    }

}