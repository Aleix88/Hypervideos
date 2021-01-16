class HypervideoController {

    constructor(videoSRC, videoType, containerID, videoManager, config){
        this.videoLength = null;
        this.containerID = containerID;
        this.videoSRC = videoSRC;
        this.videoManager = videoManager;
        this.videoType = videoType;
        this.config = config;
        this.htmlManager = new HTMLManager(); 
        this.videoManager.videoStateChanged = this.__videoStateChanged.bind(this);
        this.bottomBarController = new BottomBarController(this, containerID, this.config.tags);
        this.topBarController = new TopBarController(this, containerID);
        this.tagController = new TagsController(this.containerID, videoManager);
    }

    __videoStateChanged(state, target) {
        const pauseScreen = document.getElementById(this.containerID).querySelector("x-pause-screen");
        switch (state) {
            case ContainerManager.PLAYING:
                pauseScreen.hide();
                break;
            case ContainerManager.PAUSED:
                pauseScreen.show();
                break;
            case ContainerManager.LOADED:
                this.videoManager.setVolume(0.5);
                this.videoLength = target.duration;
                this.__addVideoTimeObserver();
                this.__addTags();
                break;
            case ContainerManager.ENTER_FULL_SCREEN:
            case ContainerManager.EXIT_FULL_SCREEN:
                if (this.tagController != null) {
                    this.tagController.fullScreenStateChanged(state === ContainerManager.ENTER_FULL_SCREEN);
                }
            break;
            default:
        }

        this.bottomBarController.videoStateChanged(state, target);
    }

    restartVideo() {
        this.videoManager.restartVideo();
    }

    toggleFullScreen() {
        this.videoManager.toggleFullScreen();
    }

    setVolume(volume) {
        this.videoManager.setVolume(volume);
    }

    loadVideoProgress(progress) {
        this.videoManager.loadProgress(progress);
    }

    play() {
        if (!this.videoManager.isVideoPlaying()) {
            this.videoManager.play();
        } else {
            this.videoManager.pause();
        }
    }

    changeButtonIcon(buttonClass, iconName) {
        let button = document.getElementById(this.containerID).querySelector("."+buttonClass);
        if (button.length <= 0) {
            return;
        }
        let icon = button.getElementsByTagName("i");
        if (icon.length <= 0) {
            return;
        }
        icon[0].className = iconName;
    }

    createSkeleton() {
        const hypervideo = document.getElementById(this.containerID);
        const container = this.htmlManager.createElement("div", {classList: ["hypervideo-container"]});

        hypervideo.appendChild(container);

        this.addVideoElement(container);
        if (this.videoType != Hypervideo.YOUTUBE_TYPE) {
            this.topBarController.addTopBar(container, this.config.videoTitle);
        }
        this.__addPauseScreen(container);
        this.tagController.addTagContainer(container);
        this.bottomBarController.addBottomBar(container);
    }

    addVideoTag(container) {
        this.videoElementID = "video-" + this.containerID;
        const video = this.htmlManager.createElement("video", { 
            id: this.videoElementID,
            src: this.videoSRC
        });
        container.appendChild(video);
        this.videoManager.setupVideo();
    }

    addVideoFromYotube(container) {
        this.videoElementID = "video-" + this.containerID;
        const youtubeFrameContainer = this.htmlManager.createElement("div", {
            classList: ["youtube-frame"],
            id: this.videoElementID
        });
        container.appendChild(youtubeFrameContainer);
        this.videoManager.addYoutubeScript(this.videoElementID, this.videoSRC);
    }

    addVideoElement(container) {
        switch (this.videoType) {
            case Hypervideo.YOUTUBE_TYPE:
                this.addVideoFromYotube(container);
                break;
            default:
                this.addVideoTag(container);
                break;
        }
    }

    __addPauseScreen(container) {
        const pauseScreen = this.htmlManager.createElement("x-pause-screen");
        const thisReference = this;
        pauseScreen.didClick = (() => {
            if (thisReference.videoManager.isVideoPlaying()) {
                thisReference.videoManager.pause();
            } else {
                thisReference.videoManager.play();
            }
        });
        container.appendChild(pauseScreen);
    }

    __addVideoTimeObserver() {
        const thisReference = this;
        const observer = new Observer((time) => {
            thisReference.bottomBarController.videoTimeChange(time);
            thisReference.__manageTags(time);
        });
        this.videoManager.addObserver(observer);
    }

    __addTags() {
        this.tagController.addTags(this.config.tags, false);
    }

    __manageTags(time) {
        for (const tag of this.config.tags) {
            const tagTimestamp = tag.timeConfig.timestamp;
            const tagDuration = tag.timeConfig.duration;
            const isVisible = time >= tagTimestamp && time < tagTimestamp + tagDuration;
            this.tagController.setTagVisible(tag.id, isVisible);
        }
    }

    

}
