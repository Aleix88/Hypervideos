class Card extends Plugin{

    constructor() {super();}

    onLoad(config, container, elementsContainer, videoManager) {
        super.onLoad(config, container, elementsContainer, videoManager);
        this.__createCard();
    }

    onTagClick(event) {
        super.onTagClick(event);
        super.showElementsContainer();
        if (this.videoManager != null) {
            this.videoManager.pause();
        }
    }

    onTagHover(event) {
    }

    onTagLeave(event) {
    }

    fullScreenStateChanged(isFullScreen) {
    }

    __createCard() {

        const container = document.createElement("div");
        container.style.display = "flex";
        const exitButtonContainer = document.createElement("div");
        const exitIcon = document.createElement("i");


        this.cardContainer = document.createElement("div");
        
        this.cardContainer.style.margin = "3em auto";
        this.cardContainer.style.background = "white";
        this.cardContainer.style.maxWidth = "600px";
        this.cardContainer.style.display = "flex";
        this.cardContainer.style.marginTop = "100px";

        const cardImage = document.createElement("img");
        cardImage.src = "../TestImages/nature.jpg";
        cardImage.style.width = "50%"
        cardImage.style.margin = "0";
        cardImage.style.objectFit = "contain";

        const textContainer = document.createElement("div");
        textContainer.style.width = "100%";
        textContainer.style.padding = "10% 1em";
        textContainer.style.background = "#F2D5A0";
        const h3 = document.createElement("h3");
        h3.textContent = "Landscape Photography";
        h3.style.margin = "0 1em";
        h3.style.textAlign = "center";
        h3.style.color = "rgb(138 104 43)";
        const description = document.createElement("p");
        description.style.textAlign = "center";
        description.style.color = "rgb(138 104 43)";
        description.textContent = "When most people start out taking landscape photos, they think they need to get a wide angle lens in order to capture the whole landscape. When I bought my first DSLR, I was one of those people. I made sure I had a wide angle lens because I knew I mostly wanted to photograph landscapes from my adventures, and that’s what everyone told me I required to get the job done.";

        textContainer.appendChild(h3);
        textContainer.appendChild(description);

        this.cardContainer.appendChild(cardImage);
        this.cardContainer.appendChild(textContainer);
        this.elementsContainer.appendChild(this.cardContainer);
    }


}