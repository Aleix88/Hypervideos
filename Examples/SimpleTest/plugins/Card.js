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

        this.cardContainer = document.createElement("div");
        
        this.cardContainer.style.margin = "3em auto";
        this.cardContainer.style.background = "white";
        this.cardContainer.style.maxWidth = "600px";
        this.cardContainer.style.display = "flex";
        this.cardContainer.style.marginTop = "100px";

        const cardImage = document.createElement("div");
        cardImage.style.width = "50%"
        cardImage.style.margin = "0";
        // cardImage.style.background = "no-repeat 50%";
        cardImage.style.backgroundImage = "url(" + this.config.imageSrc + ")";
        cardImage.style.backgroundSize = "cover";

        const textContainer = document.createElement("div");
        textContainer.style.width = "50%";
        textContainer.style.padding = "10% 1em";
        textContainer.style.textAlign = "center";
        textContainer.style.background = this.config["backgroundColor"] != null ? this.config.backgroundColor : "white";
        const h3 = document.createElement("h3");
        h3.textContent = this.config.title;
        h3.style.margin = "0 1em";
        h3.style.textAlign = "center";
        h3.style.color = this.config["titleColor"] != null ? this.config.titleColor : "black";
        const description = document.createElement("p");
        description.style.textAlign = "center";
        description.style.color = this.config["descriptionColor"] != null ? this.config.descriptionColor : "black";
        description.textContent = this.config.description;

        textContainer.appendChild(h3);
        textContainer.appendChild(description);

        if (this.config["button"] != null) {
            const anchor = document.createElement("a");
            anchor.textContent = this.config.button.title;
            anchor.href = this.config.button.href;
            anchor.target = "_blank";
            anchor.style.padding = ".7em 1em";
            anchor.style.display = "inline-block";
            anchor.style.borderRadius = "8px";
            anchor.style.textDecoration = "none";
            anchor.style.background = this.config.button["backgroundColor"] != null ? this.config.button.backgroundColor : "white";
            anchor.style.color = this.config.button["textColor"] != null ? this.config.button.textColor : "black";
            anchor.style.transition = "transform .2s";
            anchor.onmouseenter = function() {
                anchor.style.transform = "scale(1.1)";
            };
            anchor.onmouseleave = function () {
                anchor.style.transform = "scale(1)";
            };
            textContainer.appendChild(anchor);
        }


        this.cardContainer.appendChild(cardImage);
        this.cardContainer.appendChild(textContainer);
        this.elementsContainer.appendChild(this.cardContainer);
    }


}