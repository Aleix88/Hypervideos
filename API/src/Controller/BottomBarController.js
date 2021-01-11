class BottomBarController {

    constructor (hypervideoController, containerID, tags) {
        this.hypervideoController = hypervideoController;
        this.htmlManager = new HTMLManager();
        this.containerID = containerID;
        this.tags = tags;
    }

    addBottomBar(container) {
        const bottomController = this.htmlManager.createElement("div",["bottom-controller"]);
        container.appendChild(bottomController);
        this.playButton = this.createControlButton("control-play-button", "gg-play-button", this.playButtonClicked);
        this.replayButton = this.createControlButton("control-repeat-button", "gg-repeat", this.restartVideo);
        this.fullScreenButton = this.createControlButton( "control-full-screen-button", "gg-maximize", this.toggleFullScreen);
        this.timeCounter = this.createTimeCounter();
        this.progressBar = this.createProgressBar();
        this.volumeBar = this.createVolumeBar();
        bottomController.appendChild(this.playButton);
        bottomController.appendChild(this.replayButton);
        bottomController.appendChild(this.fullScreenButton);
        bottomController.appendChild(this.timeCounter);
        bottomController.appendChild(this.progressBar);
        bottomController.appendChild(this.volumeBar);
    }

    videoStateChanged(state, target) {
        switch (state) {
            case ContainerManager.PLAYING:
                this.changeButtonIcon("control-play-button", "gg-play-pause");
                break;
            case ContainerManager.PAUSED:
                this.changeButtonIcon("control-play-button", "gg-play-button");
                break;
            case ContainerManager.LOADED:
                this.volumeBar.setVolume(50);
                this.videoLength = target.duration;
                this.progressBar.setMaxLength(target.duration);
                this.__setProgressBarTimestamps();
                break;
            case ContainerManager.ENTER_FULL_SCREEN:
                this.changeButtonIcon("control-full-screen-button", "gg-minimize");
                break;
            case ContainerManager.EXIT_FULL_SCREEN:
                this.changeButtonIcon("control-full-screen-button", "gg-maximize");
                break;
            default:
        }
    }

    videoTimeChange(time) {
        this.progressBar.setCurrentLength(time);
        this.timeCounter.currentTime = time;
    }

    restartVideo() {
        this.progressBar.setCurrentLength(0);
        this.hypervideoController.restartVideo();
    }

    toggleFullScreen() {
        this.hypervideoController.toggleFullScreen();
    }

    playButtonClicked() {
        this.hypervideoController.play();
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

    createTimeCounter() {
        const timeCounter = this.htmlManager.createElement("x-time-counter", ["time-counter"]);
        return timeCounter;
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
        this.hypervideoController.loadVideoProgress(progress);
    }

    __setProgressBarTimestamps() {
        for (let t of this.tags) {
            const timestamp = t.timeConfig.timestamp;
            this.progressBar.addMarkerAt(timestamp);
        }
    }

    createVolumeBar() {
        const volumeBar = this.htmlManager.createElement("x-volume-bar", ["volume-bar"]);
        volumeBar.volumeChanged = this.__volumeChanged.bind(this);
        return volumeBar;
    }

    __volumeChanged(volume) {
        this.hypervideoController.setVolume(volume/100);
    }

}