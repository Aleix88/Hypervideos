import "HypervideoControlls"

class Hypervideo {

    constructor(videoURL, hypervideoID) {
        this.videoURL = videoURL;
        this.containerID = hypervideoID;
    }

    isDOMLoaded() {
        return document != null && (document.readyState === "interactive" || document.readyState === "complete");
    }

    setupHypervideo(tagsJSON) {

        if (!this.isDOMLoaded()) {
            //TODO: AVISAR DE L'ERROR, PER ARA DEIXO UN CONSOLE LOG
            console.log("Error: Can't setup an hypervideo if DOM is not loaded.");
        }

        //TODO: Pensar si això ho necessitare guardar o no
        this.tagsJSON = tagsJSON;

        hypervideoControlls = new HypervideoControlls(this.videoURL, this.containerID);
        hypervideoControlls.createSkeleton();
    }
    

}