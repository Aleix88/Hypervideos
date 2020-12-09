class TagsController {

    constructor(containerID) {
        this.containerID = containerID;
        this.tagsContainer = document.getElementById(containerID).querySelector(".tags-container");
    }

    addTagButton(x,y) {
        const tag = document.createElement('x-tag-button');
        tag.color = "#FF5733";
        tag.style.top = "50%";
        tag.style.left = "50%";
        tag.style.transform = "translate(-50%, -50%)";
        this.tagsContainer.appendChild(tag);
    }

}