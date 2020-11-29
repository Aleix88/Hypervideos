class YoutubeVideoManager extends VideoManager {

    constructor(containerID) {
        super(containerID);
        this.player = null;
    }

    play() {
        this.player.playVideo();
        this.isPaused = false;
    }

    pause() {
        this.player.pauseVideo();
        this.isPaused = true;
    }

    restartVideo() {}
    
    loadTime(seconds) {}

    setVolume() {}

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
                'onReady': this.__onPlayerReady,
                'onStateChange': this.__onPlayerStateChange
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
                'wmode':'opaque' 
            },

        });
        this.player = player;
    }
    
    __onPlayerReady(event) {
        console.log("READY");
    }
    __onPlayerStateChange(event) {
        console.log("STATE");    
    }
     
}
