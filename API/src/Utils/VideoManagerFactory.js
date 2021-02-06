class VideoManagerFactory {

    create(hypervideoType, containerID) {
        switch(hypervideoType) {
            case Hypervideo.YOUTUBE_TYPE:
                return new YoutubeVideoManager(containerID);
            default:
                return new VideoTagManager(containerID);    
        }
    }

}