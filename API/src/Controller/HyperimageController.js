class HyperimageController {

    constructor(imageSRC, containerID, tags){
        this.containerID = containerID;
        this.imageSRC = imageSRC;
        this.tags = tags;
        this.htmlManager = new HTMLManager(); 
        this.tagController = new TagsController(this.containerID, this.containerID + "-elements", null);
        this.containerManager = new ContainerManager(this.containerID);
        this.containerManager.videoStateChanged = this.__videoStateChanged.bind(this);
    }

    __videoStateChanged(state, target) {
        switch (state) {
            case ContainerManager.ENTER_FULL_SCREEN:
                this.__fullScreenStateChanged(true);
            break;
            case ContainerManager.EXIT_FULL_SCREEN:
                this.__fullScreenStateChanged(false);
            break;
            default:
        }
    }

    __fullScreenStateChanged (isFullScreen) {
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
        const hypervideo = document.getElementById(this.containerID);
        const container = this.htmlManager.createElement("div", {
            classList: ["hypervideo-container"]
        });

        hypervideo.appendChild(container);

        this.__addImageElement(container);
        this.__addFullScreenButton(container);
        this.tagController.addTagContainer(container);
    }

    __addFullScreenButton(container) {
        this.fullScreenButton = this.htmlManager.createElement("x-full-screen-button");
        const thisReference = this;
        this.fullScreenButton.clickHandler = () => {
            thisReference.containerManager.toggleFullScreen();
        };
        container.appendChild(this.fullScreenButton);
    }

    __addImageElement(container) {
        const img = this.htmlManager.createElement("img", {
            classList: ["hyperimage"],
            src: this.imageSRC
        });
        container.appendChild(img);
        img.addEventListener('load', this.__imgLoaded.bind(this));
    }

    __addTags() {
        this.tagController.addTags(this.tags, false);
        for (const tag of this.tags) {
            this.tagController.setTagVisible(tag.id, true);
        }
    }

 

}
