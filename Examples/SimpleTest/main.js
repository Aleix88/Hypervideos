document.addEventListener("DOMContentLoaded", () => {

    importHypervideoAPI(()=> {
        const hypervideo = new Hypervideo("../TestVideos/video_test.mp4", "hypervideo_123");
        hypervideo.setupHypervideo("");
    });

    


})