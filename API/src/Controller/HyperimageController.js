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
            
                    const imageWidthMargin = (window.innerWidth - this.config.size.width) / this.config.size.width;
                    const imageHeightMargin = (window.innerHeight - this.config.size.height) / this.config.size.height;
                    const shouldWidthExpand = imageHeightMargin >= imageWidthMargin;
                    const aspectRatio = this.config.size.width / this.config.size.height;
                    const resizedWidth = (window.innerHeight * aspectRatio) + "px";
                    const resizedHeight = (window.innerWidth * (1/aspectRatio)) + "px";
                    console.log(resizedWidth, resizedHeight)
                    this.imageElement.style.width = "100%";
                    this.imageElement.style.height = "100%";
                    this.imageContainer.style.width = shouldWidthExpand ? "100%" : resizedWidth;
                    this.imageContainer.style.height = !shouldWidthExpand ? "100%" : resizedHeight;
                }, 500);
            } else {
                hypervideo.style.width = this.config.size.width + "px";
                hypervideo.style.height = this.config.size.height + "px";
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
        hypervideo.style.width = this.config.size.width + "px";
        hypervideo.style.height = this.config.size.height + "px";
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
