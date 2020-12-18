class TagsController {

    constructor(containerID, videoManager) {
        this.containerID = containerID;
        this.videoManager = videoManager;
        this.tagsContainer = document.getElementById(containerID).querySelector(".tags-container");
    }

    addTags(tags) {
        for (const tag of tags) {
            this.__addTagButton(tag);
        }
    }

    __addTagButton(tag) {
        const tagElement = document.createElement('x-tag-button');
        this.tagsContainer.appendChild(tagElement);
        const observer = new Observer((timeStamp) => {
            const tagTimestamp = tag.timeConfig.timestamp;
            const tagDuration = tag.timeConfig.duration;
            const isVisible = timeStamp >= tagTimestamp && timeStamp < tagTimestamp + tagDuration;
            tagElement.isVisible = isVisible;
        });
        this.videoManager.addObserver(observer);
        tagElement.hexColor = tag.color ? tag.color : "#FFFFFF";
        tagElement.position = tag.position;
    }

}