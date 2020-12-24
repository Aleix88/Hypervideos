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
            this.__addTagButton(tag, isVisible);
        }
    }

    setTagVisible(id, isVisible) {
        const tagElement = document.querySelector("#" + this.containerID).querySelector("#"+id);
        tagElement.isVisible = isVisible;
    }

    __onClickTag(target) {
        let tag = this.__getTagFromElement(target);
        if (tag == null) {return;}
        if (tag.plugin == null) {return;}
        this.__createTagPlugin(tag.plugin)
    }

    __onHoverTag(target) {
        let tag = this.__getTagFromElement(target);
        if (tag == null) {return;}

    }

    __getTagFromElement(element) {
        let tag = this.tags.filter((t) => {return t.id === element.id;});
        if (tag == null || tag.length <= 0) {return null;}
        return tag[0];
    }

    __createTagPlugin(plugin) {
        const pluginName = plugin.name;
        const classInstance = eval(`new ${pluginName}()`);
        classInstance.onLoad(plugin.config, this.containerID, this.videoManager);
        return classInstance;
    }
    
    __addTagButton(tag, isVisible) {
        const tagElement = document.createElement('x-tag-button');
        this.tagsContainer.appendChild(tagElement);
        tagElement.hexColor = tag.color ? tag.color : "#FFFFFF";
        tagElement.position = tag.position;
        tagElement.isVisible = isVisible;
        tagElement.id = tag.id;
        tagElement.clickHandler = this.__onClickTag.bind(this);
        tagElement.hoverHandler = this.__onHoverTag.bind(this);
    }
}