class VideoManager {
    constructor(containerID) {
        this.currentTime = 0;
        this.containerID = containerID;
        this.videoStateChanged = null;
        //Convertim la classe en "abstract"
        if (new.target === VideoManager) {
            throw new TypeError("Cannot construct VideoManager instances directly");
        }
    }

    static PLAYING = 0;
    static PAUSED = 1;

    play() {}

    pause() {}

    restartVideo() {}

    isVideoPlaying(){}
    
    //0-100
    loadProgress(progress) {}

    //0-1
    setVolume(volume) {}

    
    toggleFullScreen() {
        const container = document.getElementById(this.containerID);
        if (this.isFullScreen()) {
            this.requestExitFullScreen(container);
        } else {
            this.requestFullScreen(container);
        }
    }
    
    isFullScreen() {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    }

    requestFullScreen(container) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    }

    requestExitFullScreen(container) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}