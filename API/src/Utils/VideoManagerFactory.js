class VideoManagerFactory {

    create(hypervideoType, containerID) {
        switch(hypervideoType) {
            case Hypervideo.YOUTUBE_TYPE:
                return new YoutubeVideoManager(containerID);
            case Hypervideo.IMAGE_TYPE:
                return new ContainerManager(containerID);
            default:
                return new VideoTagManager(containerID);    
        }
    }

}