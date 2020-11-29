class VideoManager {
    constructor(containerID) {
        this.currentTime = 0;
        this.containerID = containerID;
        this.videoStateChanged = null;
        this.isFullScreen = false;
        //Convertim la classe en "abstract"
        if (new.target === VideoManager) {
            throw new TypeError("Cannot construct VideoManager instances directly");
        }
    }

    static PLAYING = 0;
    static PAUSED = 1;
    static LOADED = 2;

    play() {}

    pause() {}

    restartVideo() {}

    isVideoPlaying(){}
    
    //0-1
    loadProgress(progress) {}

    //0-1
    setVolume(volume) {}

    
    toggleFullScreen() {
        const container = document.getElementById(this.containerID);
        if (this.isFullScreen) {
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
            this.isFullScreen = true;
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
            this.isFullScreen = true;
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
            this.isFullScreen = true;
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
            this.isFullScreen = true;
        }
    }

    requestExitFullScreen(container) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            this.isFullScreen = false;
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            this.isFullScreen = false;
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            this.isFullScreen = false;
        }
    }
}