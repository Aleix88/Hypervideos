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
        const container = this.htmlManager.createElement("div", ["hypervideo-container"]);

        hypervideo.appendChild(container);

        this.__addImageElement(container);
        this.__addFullScreenButton(container);
        this.tagController.addTagContainer(container);
        this.__addElementsContainer();
    }

    __addFullScreenButton(container) {
        this.fullScreenButton = document.createElement("x-full-screen-button");
        const thisReference = this;
        this.fullScreenButton.clickHandler = () => {
            thisReference.containerManager.toggleFullScreen();
        };
        container.appendChild(this.fullScreenButton);
    }

    __addImageElement(container) {
        const img = document.createElement("img");
        img.classList.add("hyperimage");
        img.src = this.imageSRC;
        container.appendChild(img);
        img.addEventListener('load', this.__imgLoaded.bind(this));
    }

    __addTags() {
        this.tagController.addTags(this.tags, false);
        for (const tag of this.tags) {
            this.tagController.setTagVisible(tag.id, true);
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
