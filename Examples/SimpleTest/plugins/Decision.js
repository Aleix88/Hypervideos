class Decision extends Plugin {

    constructor() {super();}

    onLoad(config, container, elementsContainer, videoManager) {
        super.onLoad(config, container, elementsContainer, videoManager);
        this._createViews();
    }

    tagWillAppear() {
        this.backgroundView.style.display = "block";
        this.videoManager.pause();
        this._hideProgressBar(true);
        this.backgroundView.style.display = "flex";
        this.counter = this.config.timeout;
        const thisReference = this;
        this.interval = setInterval(() => {
            thisReference.counter--;
            thisReference.timeCounter.textContent = thisReference.counter;
            if (thisReference.counter === 0) {
                thisReference._leftButtonClicked();
            }
        }, 1000);
    }

    tagWillDisappear() {
        this._deinit();
    }

    _leftButtonClicked() {
        const thisReference = this;
        thisReference._deinit();
        this.leftButton.style.backgroundColor = "#2a83d1";
        this.leftButton.querySelector("p").style.color = "white";
        const time = this.config.leftButton.timestamp;
        if (time !== "now") {
            this.videoManager.seekTo(time);
        }
    }

    _rightButtonClicked() {
        const thisReference = this;
        thisReference._deinit();
        this.leftButton.style.backgroundColor = "#2a83d1";
        this.leftButton.querySelector("p").style.color = "white";
        const time = this.config.rightButton.timestamp;
        if (time !== "now") {
            this.videoManager.seekTo(time);
        }
    }

    _deinit() {
        this.backgroundView.style.display = "none";
        this._hideProgressBar(false);
        clearInterval(this.interval);
        this.counter = this.config.timeout;
        this.timeCounter.textContent = this.counter;
    }

    _hideProgressBar(hide) {
        this.container.parentElement.querySelector(".bottom-controller").style.display = hide === true ? "none" : "flex";
        this.container.parentElement.querySelector("x-pause-screen").style.display = hide === true ? "none" : "block";
    }

    _createViews() {
        this.backgroundView = document.createElement("div");
        this.backgroundView.style.display = "none";
        this.backgroundView.style.alignItems = "center";
        this.backgroundView.style.justifyContent = "center";
        this.backgroundView.style.position = "absolute";
        this.backgroundView.style.background = "rgba(0,0,0,0.3)";
        this.backgroundView.style.top = "0";
        this.backgroundView.style.left = "0";
        this.backgroundView.style.width = "100%";
        this.backgroundView.style.height = "100%";

        this.timeCounter = document.createElement("h2");
        this.timeCounter.textContent = this.config.timeout;
        this.timeCounter.style.color = "white";
        this.timeCounter.style.fontSize = "3em";

        this.bottomBarView = document.createElement("div");
        this.bottomBarView.style.position = "absolute";
        this.bottomBarView.style.display = "flex";
        this.bottomBarView.style.height = "20%";
        this.bottomBarView.style.width = "100%";
        this.bottomBarView.style.bottom = "0";
        this.bottomBarView.style.left = "0";
        this.bottomBarView.style.right = "0";
        this.bottomBarView.style.backgroundColor = "white";

        this.leftButton = this._createButton(this.config.leftButton.text);
        this.leftButton.style.borderRight = "1px solid darkGray";
        this.leftButton.onclick = this._leftButtonClicked.bind(this);
        this.rightButton = this._createButton(this.config.rightButton.text);
        this.rightButton.onclick = this._rightButtonClicked.bind(this);
        
        this.bottomBarView.appendChild(this.leftButton);
        this.bottomBarView.appendChild(this.rightButton);
        this.backgroundView.appendChild(this.timeCounter);
        this.backgroundView.appendChild(this.bottomBarView);
        this.container.appendChild(this.backgroundView);
    }

    _createButton(text) {
        const buttonContainer = document.createElement("div");
        const label = document.createElement("p");

        buttonContainer.style.width = "50%";
        buttonContainer.style.height = "100%";
        buttonContainer.style.display = "flex";
        buttonContainer.style.alignItems = "center";
        buttonContainer.style.pointerEvents = "all";
        buttonContainer.style.cursor = "pointer";

        buttonContainer.onmouseenter = (e) => {
            buttonContainer.style.backgroundColor = "#2a83d1";
            label.style.color = "white";
        }

        buttonContainer.onmouseleave = (e) => {
            buttonContainer.style.backgroundColor = "white";
            label.style.color = "#2a83d1";
        }
        
        label.style.width = "100%";
        label.style.textAlign = "center";
        label.style.margin = 0;
        label.style.color = "#2a83d1";
        label.textContent = text;

        buttonContainer.appendChild(label);
        return buttonContainer;
    }

}