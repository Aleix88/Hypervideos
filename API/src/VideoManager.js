class VideoManager extends Subject {

    constructor(containerID) {
        super();
        this.containerID = containerID;
        this.videoStateChanged = null;
        this.isFullScreen = false;
        //Convertim la classe en "abstract"
        if (new.target === VideoManager) {
            throw new TypeError("Cannot construct VideoManager instances directly");
        }

        this.__exitFullScreenEventListeners();
    }

    static PLAYING = 0;
    static PAUSED = 1;
    static LOADED = 2;
    static ENTER_FULL_SCREEN = 3;
    static EXIT_FULL_SCREEN = 4;

    play() {}

    pause() {}

    restartVideo() {}

    isVideoPlaying(){}

    get currentTime() {return 0;}
    
    //0-1
    loadProgress(progress) {}

    //0-1
    setVolume(volume) {}

    __exitFullScreenEventListeners() {
        document.addEventListener('fullscreenchange', this._exitFSHandler.bind(this), false);
        document.addEventListener('mozfullscreenchange', this._exitFSHandler.bind(this), false);
        document.addEventListener('MSFullscreenChange', this._exitFSHandler.bind(this), false);
        document.addEventListener('webkitfullscreenchange', this._exitFSHandler.bind(this), false);
    }

    _exitFSHandler(event) {
        if (document.fullscreenElement) return; //If is entering fullscreen mode return
        this.isFullScreen = false;
        this.videoStateChanged(VideoManager.EXIT_FULL_SCREEN);
    }

    _enterFSHandler() {
        this.isFullScreen = true;
        this.videoStateChanged(VideoManager.ENTER_FULL_SCREEN);
    }

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
            this._enterFSHandler();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
            this._enterFSHandler();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
            this._enterFSHandler();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
            this._enterFSHandler();
        }
    }

    requestExitFullScreen(container) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            this._exitFSHandler();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            this._exitFSHandler();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            this._exitFSHandler();
        }
    }
}