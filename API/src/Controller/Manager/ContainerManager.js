class ContainerManager extends Subject {

    constructor(containerID) {
        super();
        this.containerID = containerID;
        this.videoStateChanged = null;
        this.isFullScreen = false;

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

    getVideoDuration() {}

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
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.isFullScreen = false;
            this.videoStateChanged(ContainerManager.EXIT_FULL_SCREEN);
        }
    }

    _enterFSHandler() {
        this.isFullScreen = true;
        this.videoStateChanged(ContainerManager.ENTER_FULL_SCREEN);
    }

    toggleFullScreen() {
        const container = document.getElementById(this.containerID);
        if (this.isFullScreen) {
            this.requestExitFullScreen(container);
        } else {
            this.requestFullScreen(container);
        }
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