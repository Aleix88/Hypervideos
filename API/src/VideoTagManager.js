class VideoTagManager extends VideoManager {

    play() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.play();
        this.isPaused = false;
    }

    pause() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.pause();
        this.isPaused = true;
    }

    restartVideo() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = 0;
    }
    
    loadTime(seconds) {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = seconds;
    }

    setVolume(volume) {
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        const video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
        video.volume = volume;
    }

    setVolume(volume) {
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.volume = volume;
    }

}