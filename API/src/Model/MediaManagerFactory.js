class MediaManagerFactory {

    create(hypervideoType, containerID) {
        switch(hypervideoType) {
            case Hypervideo.YOUTUBE_TYPE:
                return new YoutubeVideoManager(containerID);
            case Hypervideo.VIDEO_TYPE:
                return new VideoTagManager(containerID);    
            default:
                return new MediaManager(containerID);
        }
    }

}