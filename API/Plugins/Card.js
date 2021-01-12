class Card extends Plugin{

    constructor() {super();}

    onLoad(config, container, elementsContainer, videoManager) {
        super.onLoad(config, container, elementsContainer, videoManager);
        this.__createCard();
    }

    onTagClick(event) {
        super.onTagClick(event);
        super.showElementsContainer();
    }

    onTagHover(event) {
    }

    onTagLeave(event) {
    }

    fullScreenStateChanged(isFullScreen) {
    }

    __createCard() {

        this.cardContainer = document.createElement("div");

        this.cardContainer.style.margin = "3em auto";
        this.cardContainer.style.padding = "1em 0.7em";
        this.cardContainer.style.background = "white";
        this.cardContainer.style.maxWidth = "600px";
        
        this.elementsContainer.appendChild(this.cardContainer);
    }


}