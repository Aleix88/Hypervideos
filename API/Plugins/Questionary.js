class Questionary extends Plugin {

    constructor() {super();}

    onLoad(config, container, elementsContainer, videoManager) {
        super.onLoad(config, container, elementsContainer, videoManager);
        this.__createQuestionary();
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

    __createQuestionary() {

        this.qContainer = document.createElement("div");
        const titleHeader = document.createElement("h2");
        const subtitleElement = document.createElement("p");
        const answersContainer = document.createElement("div");

        let answersList = this.config.wrongAnswers;
        answersList.push(this.config.correctAnswer);
        this.__randomLoopEach(answersList, (answer) => {
            const answerDiv = this.__createAnswerElement(answer);
            answersContainer.appendChild(answerDiv);
        });

        this.qContainer.style.margin = "3em auto";
        this.qContainer.style.padding = "1em 0.7em";
        this.qContainer.style.background = "white";
        this.qContainer.style.maxWidth = "600px";
        this.qContainer.style.borderRadius = "5px";
        titleHeader.textContent = this.config.title;
        titleHeader.style.textAlign = "center";
        titleHeader.style.color = "#07285c";
        titleHeader.style.marginBottom = "0";
        subtitleElement.textContent = this.config.subtitle;
        subtitleElement.style.color = "#5f6878";
        subtitleElement.style.textAlign = "center";
        subtitleElement.style.marginTop = "0.5em";
        answersContainer.style.display = "flex";
        answersContainer.style.flexDirection = "column";

        this.qContainer.appendChild(titleHeader);
        this.qContainer.appendChild(subtitleElement);
        this.qContainer.appendChild(answersContainer);
        this.elementsContainer.appendChild(this.qContainer);
    }

    __createAnswerElement(text) {
        const answerDiv = document.createElement("div");
        const answerLabel = document.createElement("p");
        answerLabel.textContent = text;
        answerLabel.style.margin = "0";
        answerLabel.style.fontWeight = "bold";
        answerLabel.style.color = "#07285c";
        answerLabel.style.pointerEvents = "none";
        answerDiv.appendChild(answerLabel);
        answerDiv.style.padding = "1em 1em";
        answerDiv.style.borderRadius = "5px";
        answerDiv.style.marginBottom = "0.3em";
        answerDiv.style.border = "solid 1px rgb(227, 231, 237)";
        answerDiv.style.cursor = "pointer";
        answerDiv.addEventListener("click", this.__answerClicked.bind(this));
        answerDiv.addEventListener("mouseover", this.__answerHover.bind(this));
        answerDiv.addEventListener("mouseleave", this.__answerLeave.bind(this));
        answerDiv.style.pointerEvents = "all";
        return answerDiv;
    }

    __answerClicked(event) {
        if (this.answered) {return;}
        const answerTarget = event.target;
        const answer = answerTarget.children[0].textContent;
        answerTarget.style.background = answer === this.config.correctAnswer ? "#6fd179" : "#d9664c";
        this.answered = true;
    }

    __answerHover(event) {
        if (this.answered) {return;}
        const answerTarget = event.target;
        answerTarget.style.background = "rgb(227, 231, 237)";
    }

    __answerLeave(event) {
        if (this.answered) {return;}
        const answerTarget = event.target;
        answerTarget.style.border = "solid 1px rgb(227, 231, 237)";
        answerTarget.style.background = "white";
    }

    __randomLoopEach(elements, loop) {
        let usedIndex = [];
        while(usedIndex.length < elements.length) {
            const rndIndex = Math.floor(Math.random() * elements.length);
            if (!usedIndex.includes(rndIndex)) {
                loop(elements[rndIndex]);
                usedIndex.push(rndIndex);
            }
        }
    }

}