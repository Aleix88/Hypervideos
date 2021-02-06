class Plugin {

    constructor() {}

    onLoad(config, container, elementsContainer, videoManager) {
        this.config = config;
        this.container = container;
        this.elementsContainer = elementsContainer;
        this.videoManager = videoManager;
        this.__firstClick = false;
    }

    onTagClick(event) {
        const thisReference = this;
        if (this.__firstClick === false) {
            this.elementsContainer.addEventListener('click', (event) => {
                if (thisReference.elementsContainer !== event.target) {return;}
                thisReference.hideElementsContainer();
            });
            this.__firstClick = true;
        }
    }

    onTagHover(event) {
    }

    onTagLeave(event) {
    }

    fullScreenStateChanged(isFullScreen) {
    }

    showElementsContainer() {
        this.elementsContainer.parentElement.style.display = "block";
        this.elementsContainer.style.display = "block";
    }

    hideElementsContainer() {
        this.elementsContainer.parentElement.style.display = "none";
        this.elementsContainer.style.display = "none";
    }

}