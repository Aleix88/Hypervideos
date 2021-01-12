class Plugin {

    constructor() {}

    onLoad(config, container, elementsContainer, videoManager) {
        this.config = config;
        this.container = container;
        this.elementsContainer = elementsContainer;
        this.videoManager = videoManager;
    }

    onTagClick(event) {
        const thisReference = this;
        this.elementsContainer.style.display = "block";
        this.elementsContainer.addEventListener('click', (event) => {
            if (thisReference.elementsContainer !== event.target) {return;}
            thisReference.hideElementsContainer();
        });
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