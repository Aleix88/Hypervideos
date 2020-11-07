class HypervideoControlls {

    constructor(videoSRC, videoType, containerID){
        this.videoSRC = videoSRC;
        this.videoType = videoType;
        this.containerID = containerID;
        this.htmlManager = new HTMLManager(); 

    }

    pauseVideo() {}

    playVideo() {}

    createSkeleton() {
        const hypervideo = document.getElementById(this.containerID);
        const container = this.htmlManager.createElement("div", "hypervideo-container");
        const tagsContainer = this.htmlManager.createElement("div", "tags-container");

        hypervideo.appendChild(container);

        this.addVideoElement(container);
        this.addTopBarControlls(container);
        container.appendChild(tagsContainer);
        this.addBottomBarControlls(container);
    }

    addVideoTag(container) {
        const video = this.htmlManager.createElement("video");
        video.src = this.videoSRC;
        container.appendChild(video);
    }

    addVideoFromYotube(container) {
        //TODO: Per ara el autoplay el deixo desactivat
        //TODO: Enables api? que es? Parametre origin
        //TODO: Provar si el disablekb el puc deixar activar (son els controls del video per teclat) Per ara el desactivo
        //TODO: Els frames de youtube porten molts atributs, s'haurà de mirar quins es necessiten i quins no
        const frame = this.htmlManager.createElement("iframe", "youtube-frame");
        //frame.width =
        //frame.heigth = 
        let src = this.videoSRC;
        src += "?autoplay=0&controls=0&disablekb=0&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0";
        frame.src = src;
        //frame.style afegir with 100% i height 100%
        container.appendChild(frame);
    }

    addVideoElement(container) {
        switch (this.videoType) {
            case Hypervideo.YOUTUBE_TYPE:
                this.addVideoFromYotube(container);
                break;
            default:
                this.addVideoTag(container);
                break;
        }
    }

    addTopBarControlls(container) {
        const topContainer = this.htmlManager.createElement("div", "top-controller");
        container.appendChild(topContainer);
    }

    addBottomBarControlls(container) {
        const bottomController = this.htmlManager.createElement("div", "bottom-controller");
        container.appendChild(bottomController);
    }

}