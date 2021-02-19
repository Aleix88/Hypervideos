class HyperimageController {

    constructor(imageSRC, containerID, config, mediaManager){
        this.containerID = containerID;
        this.imageSRC = imageSRC;
        this.config = config;
        this.htmlManager = new HTMLManager(); 
        this.tagController = new TagsController(this.containerID, null);
        this.mediaManager = mediaManager;
        this.mediaManager.mediaStateChanged = this.__mediaStateChanged.bind(this);
    }

    __mediaStateChanged(state, target) {
        switch (state) {
            case MediaManager.ENTER_FULL_SCREEN:
                this.__fullScreenStateChanged(true);
            break;
            case MediaManager.EXIT_FULL_SCREEN:
                this.__fullScreenStateChanged(false);
            break;
            default:
        }
    }

    __fullScreenStateChanged (isFullScreen) {
        if (this.imageContainer != null) {
            if (isFullScreen === true) {
                const imageWidthMargin = window.innerWidth - this.config.size.width;
                const imageHeightMargin = window.innerHeight - this.config.size.height;
                const shouldWidthShrink = imageHeightMargin >= imageWidthMargin;

                this.imageElement.style.width = shouldWidthShrink ? "100%" : "auto";
                this.imageElement.style.height = !shouldWidthShrink ? "100%" : "auto";
                this.imageContainer.style.width = shouldWidthShrink ? "100%" : "fit-content";
                this.imageContainer.style.height = !shouldWidthShrink ? "100%" : "fit-content";
            } else {
                this.imageElement.style.width = "inherit";
                this.imageElement.style.height = "inherit";
                this.imageContainer.style.width = "inherit";
                this.imageContainer.style.height = "inherit";
            }
        }

        if (this.tagController != null) {
            this.tagController.fullScreenStateChanged(isFullScreen);
        }

        if (this.fullScreenButton != null) {
            this.fullScreenButton.isFullScreenActive(isFullScreen);
        }
    }

    __imgLoaded() {
        this.__addTags();
    }

    createSkeleton() {
        let hypervideo = document.getElementById(this.containerID);
        const isVideoWidder = this.config.size.width >= this.config.size.height;
        hypervideo.style.width = isVideoWidder ? this.config.size.width + "px" : Math.floor((this.config.size.height * HypervideoController.ASPECT_RATIO.x)/HypervideoController.ASPECT_RATIO.y) + "px";
        hypervideo.style.height = !isVideoWidder ? this.config.size.height + "px" : Math.floor((this.config.size.width * HypervideoController.ASPECT_RATIO.y)/HypervideoController.ASPECT_RATIO.x) + "px";
        const container = this.htmlManager.createElement("div", {
            classList: ["hypervideo-container"]
        });
        this.imageContainer = this.htmlManager.createElement("div", {
            classList: ["img-container"]
        });

        hypervideo.appendChild(container);

        container.appendChild(this.imageContainer);
        this.__addImageElement(this.imageContainer);
        this.tagController.addTagContainer(container);
        if (this.htmlManager.isDesktopBrowser() === true) {
            this.__addFullScreenButton(container);
        }
    }

    __addFullScreenButton(container) {
        this.fullScreenButton = this.htmlManager.createElement("x-full-screen-button");
        const thisReference = this;
        this.fullScreenButton.clickHandler = () => {
            thisReference.mediaManager.toggleFullScreen();
        };
        container.appendChild(this.fullScreenButton);
    }

    __addImageElement(container) {
        this.imageElement = this.htmlManager.createElement("img", {
            classList: ["hyperimage"],
            src: this.imageSRC
        });
        container.appendChild(this.imageElement);
        this.imageElement.addEventListener('load', this.__imgLoaded.bind(this));
    }

    __addTags() {
        this.tagController.addTags(this.config.tags, false);
        for (const tag of this.config.tags) {
            this.tagController.setTagVisible(tag.id, true);
        }
    }

 

}
