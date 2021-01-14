class VideoTagManager extends ContainerManager {

    constructor (containerID) {
        super(containerID);
        this.videoTimer = new VideoTimer(this.__timeHandler.bind(this));
    }

    play() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.play();
    }

    pause() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.pause();
    }

    restartVideo() {
        this.loadProgress(0);
    }

    isVideoPlaying() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        return !video.paused;
    }

    get currentTime() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        return video.currentTime;
    }

    
    //0-1
    loadProgress(progress) {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = video.duration * progress;
        this.videoTimer.loadOffset(video.currentTime - Math.floor(video.currentTime));
        this.notify(video.currentTime);
    }

    setupVideo() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.addEventListener('pause', this.__videoIsPaused.bind(this));
        video.addEventListener('play', this.__videoIsPlaying.bind(this));
        video.addEventListener('loadeddata', this.__videoLoaded.bind(this));
    }

    __videoIsPlaying() {
        this.videoStateChanged(ContainerManager.PLAYING);
        this.videoTimer.play();
    }

    __videoIsPaused() {
        this.videoStateChanged(ContainerManager.PAUSED);
        this.videoTimer.pause();
    }

    __videoLoaded() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        this.videoStateChanged(ContainerManager.LOADED, {duration: video.duration});
    }

    __timeHandler() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        this.notify(video.currentTime);
    }

    //0-1
    setVolume(volume) {
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.volume = volume;
    }

    setVolume(volume) {
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.volume = volume;
    }

}