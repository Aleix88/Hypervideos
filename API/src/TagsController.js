class TagsController {

    constructor(containerID, videoManager) {
        this.containerID = containerID;
        this.videoManager = videoManager;
        this.htmlManager = new HTMLManager();
    }

    addTagContainer(container) {
        this.tagsContainer = this.htmlManager.createElement("div", ["tags-container"]);
        container.appendChild(this.tagsContainer);
    }

    addTags(tags, isVisible) {
        this.tags = tags;
        for (const tag of this.tags) {
            this.__addTagButton(tag);
        }
    }

    __addTagButton(tag, isVisible) {
        const tagElement = document.createElement('x-tag-button');
        this.tagsContainer.appendChild(tagElement);
        tagElement.hexColor = tag.color ? tag.color : "#FFFFFF";
        tagElement.position = tag.position;
        tagElement.isVisible = isVisible;
        tagElement.id = tag.id;
    }
    
    setTagVisible(id, isVisible) {
        const tagElement = document.querySelector("#" + this.containerID).querySelector("#"+id);
        tagElement.isVisible = isVisible;
    }
}