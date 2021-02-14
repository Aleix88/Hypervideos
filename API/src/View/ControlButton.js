class ControlButton {

    constructor(containerID) {
        this.htmlManager = new HTMLManager();
        this.containerID = containerID;
    }
    
    createControlButton(buttonClass, buttonIcon, eventHandler) {
        const buttonContainer = this.htmlManager.createElement("div", {
            classList: ["control-button-container"]
        });
        const button = this.htmlManager.createElement("button", {
             classList: ["control-button",buttonClass]
        });
        const icon = this.htmlManager.createElement("i", {
            classList: [buttonIcon]
        });
        buttonContainer.appendChild(button);
        button.appendChild(icon);
        if (eventHandler !== null && eventHandler !== undefined) {
            buttonContainer.addEventListener("click", eventHandler);
        }
        return buttonContainer;
    }


    changeButtonIcon(buttonClass, iconName) {
        let button = document.getElementById(this.containerID).querySelector("."+buttonClass);
        if (button.length <= 0) {
            return;
        }
        let icon = button.getElementsByTagName("i");
        if (icon.length <= 0) {
            return;
        }
        icon[0].className = iconName;
    }

}