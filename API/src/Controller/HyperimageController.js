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
            let hypervideo = document.getElementById(this.containerID);
            if (isFullScreen === true) {
                setTimeout(() => {
                    hypervideo.style.width = "100%";
                    hypervideo.style.height = "100%";
            
                    const imageWidthMargin = (window.innerWidth - this.imageElement.naturalWidth) / this.imageElement.naturalWidth;
                    const imageHeightMargin = (window.innerHeight - this.imageElement.naturalHeight) / this.imageElement.naturalHeight;
                    const shouldWidthExpand = imageHeightMargin >= imageWidthMargin;
                    const aspectRatio = this.imageElement.naturalWidth / this.imageElement.naturalHeight;
                    const resizedWidth = (window.innerHeight * aspectRatio) + "px";
                    const resizedHeight = (window.innerWidth * (1/aspectRatio)) + "px";
                    console.log(resizedWidth, resizedHeight)
                    this.imageElement.style.width = "100%";
                    this.imageElement.style.height = "100%";
                    this.imageContainer.style.width = shouldWidthExpand ? "100%" : resizedWidth;
                    this.imageContainer.style.height = !shouldWidthExpand ? "100%" : resizedHeight;
                }, 500);
            } else {
                const isVideoWidder = this.imageElement.naturalWidth >= this.imageElement.naturalHeight;
                const aspectRatio = this.imageElement.naturalWidth / this.imageElement.naturalHeight;
                hypervideo.style.width = isVideoWidder ? this.config.size.width + "px" : (this.config.size.height * aspectRatio) + "px";
                hypervideo.style.height = !isVideoWidder ? this.config.size.height + "px" : (this.config.size.width * (1/aspectRatio)) + "px";
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
        let hypervideo = document.getElementById(this.containerID);
        const isVideoWidder = this.imageElement.naturalWidth >= this.imageElement.naturalHeight;
        const aspectRatio = this.imageElement.naturalWidth / this.imageElement.naturalHeight;
        hypervideo.style.width = isVideoWidder ? this.config.size.width + "px" : (this.config.size.height * aspectRatio) + "px";
        hypervideo.style.height = !isVideoWidder ? this.config.size.height + "px" : (this.config.size.width * (1/aspectRatio)) + "px";
    }

    createSkeleton() {
        let hypervideo = document.getElementById(this.containerID);
        const container = this.htmlManager.createElement("div", {
            classList: ["hypervideo-container"]
        });
        this.imageContainer = this.htmlManager.createElement("div", {
            classList: ["img-container"]
        });

        hypervideo.appendChild(container);

        container.appendChild(this.imageContainer);
        this.__addImageElement(this.imageContainer);
        this.tagController.addTagContainer(this.imageContainer);
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
