document.addEventListener("DOMContentLoaded", () => {

    importHypervideoAPI(()=> {
        const hypervideo = new Hypervideo("https://www.youtube.com/embed/60YxSMN-Hxo", Hypervideo.YOUTUBE_TYPE, "hypervideo_123");
        hypervideo.setupHypervideo("");
    });

    


})