class TopBarController {

    constructor (hypervideoController, containerID) {
        this.hypervideoController = hypervideoController;
        this.htmlManager = new HTMLManager();
        this.containerID = containerID;
    }

    addTopBar(container, videoTitle) {
        const topContainer = this.htmlManager.createElement("div", {
            classList: ["top-controller"]
        });
        const titleHeader = this.htmlManager.createElement("h3", {
            classList: ["top-title"],
            textContent: videoTitle
        });

        topContainer.appendChild(titleHeader);
        container.appendChild(topContainer);
    }    
}