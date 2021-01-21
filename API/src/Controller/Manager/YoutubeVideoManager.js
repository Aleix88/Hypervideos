class YoutubeVideoManager extends ContainerManager {

    constructor(containerID) {
        super(containerID);
        this.player = null;
        this.firstTimePlaying = true;
        this.videoTimer = new VideoTimer(this.__timeHandler.bind(this));
    }

    play() {
        if (this.player === null) {return;}
        this.player.playVideo();
    }

    pause() {
        if (this.player === null) {return;}
        this.player.pauseVideo();
    }

    restartVideo() {
        this.__loadTime(0);
    }
    
    isVideoPlaying() {
        return this.player.getPlayerState() == YT.PlayerState.PLAYING;
    }

    get currentTime() {
        return this.player.getCurrentTime();
    }

    //0-1
    loadProgress(progress) {
        const videoDuration = this.player.getDuration();
        this.__loadTime(videoDuration * progress);
    }

    __loadTime(seconds) {
        if (this.player === null) {return;}
        this.player.seekTo(seconds, true);
        const currentTime = this.player.getCurrentTime();
        this.notify(seconds * 1000);
    }

    setVolume(volume) {
        if (this.player === null) {return;}
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        this.player.setVolume(volume * 100);
    }

    addYoutubeScript(iframeContainerID, videoID) {
        this.iframeContainerID = iframeContainerID;
        this.videoID = videoID;
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.appendChild(tag);
        window.onYouTubeIframeAPIReady = this.__onYouTubeIframeAPIReady.bind(this);
    }

    getVideoDuration() {
        return this.player.getDuration();
    }

    __onYouTubeIframeAPIReady() {
        const player = new YT.Player(this.iframeContainerID, {
            height: '360',
            width: '640', 
            videoId: this.videoID,
            events: {
                'onReady': this.__onPlayerReady.bind(this),
                'onStateChange': this.__onPlayerStateChange.bind(this)
            },
            playerVars: { 
                'autoplay': 0, 
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'playsinline': 1,
                'modestbranding': 1,
                'rel': 0,
                'iv_load_policy': 3,
                'autohide':1,
                'wmode':'opaque',
                'start': 0
            },

        });
        this.player = player;
    }
    
    __onPlayerReady(event) {
        const iFrame = document.querySelector("#"+this.iframeContainerID);
        iFrame.style.pointerEvents = "none";
        this.videoStateChanged(ContainerManager.LOADED, {duration: this.player.getDuration()});
    }
    __onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            console.log();
            if (this.firstTimePlaying === true && this.player.getCurrentTime() >= 0.1) {
                this.__loadTime(0);
            }
            this.videoStateChanged(ContainerManager.PLAYING);
            this.videoTimer.play();
            this.firstTimePlaying = false;
        } else if (event.data == YT.PlayerState.PAUSED) {
            this.videoStateChanged(ContainerManager.PAUSED);
            this.videoTimer.pause();
        }
    }
     
    __timeHandler() {
        this.notify(this.player.getCurrentTime() * 1000);
    }
}
