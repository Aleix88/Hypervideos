class BottomBarController {

    constructor (hypervideoController, containerID) {
        this.hypervideoController = hypervideoController;
        this.htmlManager = new HTMLManager();
        this.containerID = containerID;
    }

    addBottomBar(container) {
        
        const bottomController = this.htmlManager.createElement("div", {
            classList: ["bottom-controller"]
        });
        container.appendChild(bottomController);
        this.playButton = this.__createControlButton("control-play-button", "gg-play-button", this.__playButtonClicked);
        this.replayButton = this.__createControlButton("control-repeat-button", "gg-repeat", this.__restartVideo);
        this.timeCounter = this.__createTimeCounter();
        this.progressBar = this.__createProgressBar();
        this.volumeBar = this.__createVolumeBar();
        bottomController.appendChild(this.playButton);
        bottomController.appendChild(this.replayButton);
        if (this.htmlManager.isDesktopBrowser() === true) {
            this.fullScreenButton = this.__createControlButton( "control-full-screen-button", "gg-maximize", this.__toggleFullScreen);
            bottomController.appendChild(this.fullScreenButton);
        }
        bottomController.appendChild(this.timeCounter);
        bottomController.appendChild(this.progressBar);
        bottomController.appendChild(this.volumeBar);
    }

    videoStateChanged(state, target) {
        switch (state) {
            case ContainerManager.PLAYING:
                this.__changeButtonIcon("control-play-button", "gg-play-pause");
                break;
            case ContainerManager.PAUSED:
                this.__changeButtonIcon("control-play-button", "gg-play-button");
                break;
            case ContainerManager.LOADED:
                this.volumeBar.setVolume(50);
                this.videoLength = target.duration;
                this.progressBar.setMaxLength(target.duration * 1000);
                this.__setProgressBarTimestamps();
                break;
            case ContainerManager.ENTER_FULL_SCREEN:
                this.__changeButtonIcon("control-full-screen-button", "gg-minimize");
                break;
            case ContainerManager.EXIT_FULL_SCREEN:
                this.__changeButtonIcon("control-full-screen-button", "gg-maximize");
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

    __changeButtonIcon(buttonClass, iconName) {
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

    __createTimeCounter() {
        const timeCounter = this.htmlManager.createElement("x-time-counter", {
            classList: ["time-counter"]
        });
        return timeCounter;
    }

    __createControlButton(buttonClass, buttonIcon, eventHandler) {
        const buttonContainer = this.htmlManager.createElement("div", {
            classList: ["control-button-container"]
        });
        const button = this.htmlManager.createElement("button", {
             classList: ["control-button",buttonClass]
        });
        const icon = this.htmlManager.createElement("i", {
            classList: [buttonIcon]
        });
        buttonContainer.appendChild(button);
        button.appendChild(icon);
        if (eventHandler !== null && eventHandler !== undefined) {
            buttonContainer.addEventListener("click", eventHandler.bind(this));
        }
        return buttonContainer;
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