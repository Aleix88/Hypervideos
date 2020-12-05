class YoutubeVideoManager extends VideoManager {

    constructor(containerID) {
        super(containerID);
        this.player = null;
    }

    play() {
        this.player.playVideo();
    }

    pause() {
        this.player.pauseVideo();
    }

    restartVideo() {
        this.__loadTime(0);
    }
    
    isVideoPlaying() {
        return this.player.getPlayerState() == YT.PlayerState.PLAYING;
    }

    //0-1
    loadProgress(progress) {
        const videoDuration = this.player.getDuration();
        this.__loadTime(videoDuration * progress);
    }

    __loadTime(seconds) {
        this.player.seekTo(seconds, true);
    }

    setVolume(volume) {
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        this.player.setVolume(volume * 100);
    }

    addYoutubeScript(iframeContainerID) {
        this.iframeContainerID = iframeContainerID;
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.appendChild(tag);
        window.onYouTubeIframeAPIReady = this.__onYouTubeIframeAPIReady.bind(this);
    }

    __onYouTubeIframeAPIReady() {
        const player = new YT.Player(this.iframeContainerID, {
            height: '360',
            width: '640', 
            videoId: 'jLHW8V462jo',
            events: {
                'onReady': this.__onPlayerReady.bind(this),
                'onStateChange': this.__onPlayerStateChange.bind(this)
            },
            playerVars: { 
                'autoplay': 0, 
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'modestbranding': 1,
                'rel': 0,
                'iv_load_policy': 3,
                'autohide':1,
                'wmode':'opaque',
                'start': 1
            },

        });
        this.player = player;
    }
    
    __onPlayerReady(event) {
        const iFrame = document.querySelector("#"+this.iframeContainerID);
        iFrame.style.pointerEvents = "none";
        this.videoStateChanged(VideoManager.LOADED, {duration: this.player.getDuration()});
        this.__loadTime(0);
    }
    __onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            this.videoStateChanged(VideoManager.PLAYING)
        } else if (event.data == YT.PlayerState.PAUSED) {
            this.videoStateChanged(VideoManager.PAUSED)
        }
    }
     
}
