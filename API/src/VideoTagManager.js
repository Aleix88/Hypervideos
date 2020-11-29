class VideoTagManager extends VideoManager {

    play() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.play();
    }

    pause() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.pause();
    }

    restartVideo() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = 0;
    }

    isVideoPlaying() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        return !video.paused;
    }
    
    //0-100
    loadProgress(progress) {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = video.duration * (progress/100);
    }

    setupVideo() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.addEventListener('pause', this.__videoIsPaused.bind(this));
        video.addEventListener('play', this.__videoIsPlaying.bind(this))
    }

    __videoIsPlaying() {
        this.videoStateChanged(VideoManager.PLAYING);
    }

    __videoIsPaused() {
        this.videoStateChanged(VideoManager.PAUSED);
    }

    //0-1
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