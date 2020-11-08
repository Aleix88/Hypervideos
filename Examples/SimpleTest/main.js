document.addEventListener("DOMContentLoaded", () => {

    importHypervideoAPI(()=> {
        const hypervideo = new Hypervideo("https://www.youtube.com/embed/60YxSMN-Hxo", Hypervideo.YOUTUBE_TYPE, "hypervideo_123");
        const hypervideo2 = new Hypervideo("../TestVideos/video_test.mp4", Hypervideo.VIDEO_TYPE, "hypervideo_2");
        hypervideo.setupHypervideo("");
        hypervideo2.setupHypervideo("")
    });

    


})