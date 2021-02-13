class MediaManager extends Subject {

    constructor(containerID) {
        super();
        this.containerID = containerID;
        this.mediaStateChanged = null;
        this.isFullScreen = false;

        this.__fullScreenEventListeners();
    }

    static PLAYING = 0;
    static PAUSED = 1;
    static LOADED = 2;
    static ENTER_FULL_SCREEN = 3;
    static EXIT_FULL_SCREEN = 4;

    __fullScreenEventListeners() {
        document.addEventListener('fullscreenchange', this._fullScreenChangeHandler.bind(this), false);
        document.addEventListener('mozfullscreenchange', this._fullScreenChangeHandler.bind(this), false);
        document.addEventListener('MSFullscreenChange', this._fullScreenChangeHandler.bind(this), false);
        document.addEventListener('webkitfullscreenchange', this._fullScreenChangeHandler.bind(this), false);
    }

    _fullScreenChangeHandler(event) {
        if (event.target.id !== this.containerID) {return;}
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.isFullScreen = false;
            this.mediaStateChanged(MediaManager.EXIT_FULL_SCREEN);
        } else {
            this.isFullScreen = true;
            this.mediaStateChanged(MediaManager.ENTER_FULL_SCREEN);
        }
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