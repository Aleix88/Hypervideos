class HypervideoController {

    constructor(videoSRC, videoType, containerID, videoManager, tags){
        this.videoLength = null;
        this.containerID = containerID;
        this.videoSRC = videoSRC;
        this.videoManager = videoManager;
        this.videoType = videoType;
        this.tags = tags;
        this.htmlManager = new HTMLManager(); 
        this.videoManager.videoStateChanged = this.__videoStateChanged.bind(this);
        this.bottomBarController = new BottomBarController(this, containerID, tags);
        this.tagController = new TagsController(this.containerID, this.containerID + "-elements",videoManager);
    }

    __videoStateChanged(state, target) {
        const pauseScreen = document.getElementById(this.containerID).querySelector("x-pause-screen");
        switch (state) {
            case VideoManager.PLAYING:
                pauseScreen.hide();
                break;
            case VideoManager.PAUSED:
                pauseScreen.show();
                break;
            case VideoManager.LOADED:
                this.videoManager.setVolume(0.5);
                this.videoLength = target.duration;
                this.__addVideoTimeObserver();
                this.__addTags();
                break;
            case VideoManager.ENTER_FULL_SCREEN:
            case VideoManager.EXIT_FULL_SCREEN:
                if (this.tagController != null) {
                    this.tagController.fullScreenStateChanged(state === VideoManager.ENTER_FULL_SCREEN);
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
        const container = this.htmlManager.createElement("div", ["hypervideo-container"]);

        hypervideo.appendChild(container);

        this.addVideoElement(container);
        if (this.videoType != Hypervideo.YOUTUBE_TYPE) {
            this.addTopBarControlls(container);
        }
        this.__addPauseScreen(container);
        this.tagController.addTagContainer(container);
        this.bottomBarController.addBottomBar(container);
        this.__addElementsContainer();
    }

    addVideoTag(container) {
        this.videoElementID = "video-" + this.containerID;
        const video = this.htmlManager.createElement("video", "", this.videoElementID);
        video.src = this.videoSRC;
        container.appendChild(video);
        this.videoManager.setupVideo();
    }

    addVideoFromYotube(container) {
        this.videoElementID = "video-" + this.containerID;
        const div = this.htmlManager.createElement("div", ["youtube-frame"]);
        div.id = this.videoElementID;
        container.appendChild(div);
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

    addTopBarControlls(container) {
        const topContainer = this.htmlManager.createElement("div", ["top-controller"]);
        container.appendChild(topContainer);
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
        this.tagController.addTags(this.tags, false);
    }

    __manageTags(time) {
        for (const tag of this.tags) {
            const tagTimestamp = tag.timeConfig.timestamp;
            const tagDuration = tag.timeConfig.duration;
            const isVisible = time >= tagTimestamp && time < tagTimestamp + tagDuration;
            this.tagController.setTagVisible(tag.id, isVisible);
        }
    }

    __addElementsContainer() {
        const elementsContainer = document.createElement("div");
        elementsContainer.id = this.containerID + "-elements";

        elementsContainer.style.display = "none";
        elementsContainer.style.position = "fixed";
        elementsContainer.style.width = "100%";
        elementsContainer.style.height = "100%";
        elementsContainer.style.background = "rgba(0,0,0,0.5)";
        elementsContainer.style.top = "0px";
        elementsContainer.style.left = "0px";
        elementsContainer.style.pointerEvents = "all";
        elementsContainer.addEventListener('click', (event) => {
            if (elementsContainer !== event.target) {return;}
            elementsContainer.style.display = "none";
        });

        document.body.appendChild(elementsContainer);
    }

}
