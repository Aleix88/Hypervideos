class Questionary {

    constructor() {}

    onLoad(config, container, elementsContainerID, videoManager) {
        this.config = config;
        this.container = container;
        this.elementsContainerID = elementsContainerID;
        this.videoManager = videoManager;
        this.focus = false;
        this.answered = false;
        this.__createQuestionary();
    }

    onTagClick(event) {
        const elementsContainer = document.getElementById(this.elementsContainerID);
        elementsContainer.style.display = "block";
    }

    onTagHover(event) {
    }

    onTagLeave(event) {
    }

    fullScreenStateChanged(isFullScreen) {
    }

    __createQuestionary() {

        const elementsContainer = document.getElementById(this.elementsContainerID);

        const qContainer = document.createElement("div");
        const titleHeader = document.createElement("h2");
        const subtitleElement = document.createElement("p");
        const answersContainer = document.createElement("div");

        let answersList = this.config.wrongAnswers;
        answersList.push(this.config.correctAnswer);
        this.__randomLoopEach(answersList, (answer) => {
            const answerDiv = this.__createAnswerElement(answer);
            answersContainer.appendChild(answerDiv);
        });

        qContainer.style.margin = "3em auto";
        qContainer.style.padding = "1em 0.7em";
        qContainer.style.background = "white";
        qContainer.style.maxWidth = "600px";
        qContainer.style.borderRadius = "5px";
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

        qContainer.appendChild(titleHeader);
        qContainer.appendChild(subtitleElement);
        qContainer.appendChild(answersContainer);
        elementsContainer.appendChild(qContainer);
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
        answerDiv.style.background = "rgb(227, 231, 237)";
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
        answerTarget.style.background = answer === this.config.correctAnswer ? "green" : "red";
        this.answered = true;
    }

    __answerHover(event) {
        if (this.answered) {return;}
        const answerTarget = event.target;
        answerTarget.style.background = "#d6b760";
    }

    __answerLeave(event) {
        if (this.answered) {return;}
        const answerTarget = event.target;
        answerTarget.style.background = "rgb(227, 231, 237)";
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