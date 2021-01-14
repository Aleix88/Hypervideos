class TagsController {

    constructor(containerID, videoManager) {
        this.containerID = containerID;
        this.videoManager = videoManager;
        this.htmlManager = new HTMLManager();
        this.plugins = [];
    }

    addTagContainer(container) {
        this.tagsContainer = this.htmlManager.createElement("div", {
            classList: ["tags-container"]
        });
        container.appendChild(this.tagsContainer);
    }

    addTags(tags, isVisible) {
        this.tags = tags;
        this.__addElementsContainer();
        for (const tag of this.tags) {
            this.__addTagButton(tag, isVisible);
            let plugin = null;
            if (tag.plugin != null) {
                plugin = tag.plugin;
            }
            this.__createTagPluginForTagIfNeeded(tag.id, plugin)
        }
    }

    setTagVisible(id, isVisible) {
        const tagElement = document.querySelector("#" + this.containerID).querySelector("#"+id);
        tagElement.isVisible = isVisible;
    }

    fullScreenStateChanged(isFullScreen) {
        for (const key in this.plugins) {
            const plugin = this.plugins[key];
            plugin.fullScreenStateChanged(isFullScreen);
        }
        this.__moveElementsContainer(isFullScreen ? this.tagsContainer :  document.body);
    }

    __addElementsContainer() {
        this.elementsContainer = this.htmlManager.createElement("div", {
            id: this.containerID + "-elements", 
            style: {
                display: "none",
                position: "fixed",
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                top: "0px",
                left: "0px",
                pointerEvents: "all"
            }
        });
        document.body.appendChild(this.elementsContainer);
    }

    __createTagElementsContainer(tagID) {
        const tagElementsContainer = this.htmlManager.createElement("div", {
            classList: ["tag-element-container"],
            id: tagID + "-container",
            style: {
                display: "none",
                position: "fixed",
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0)",
                top: "0px",
                left: "0px",
            }
        });
        
        this.elementsContainer.appendChild(tagElementsContainer);
        return tagElementsContainer;
    }

    __moveElementsContainer(parent) {
        parent.appendChild(this.elementsContainer);
    }

    __onClickTag(event) {
        const target = event.target;
        let tag = this.__getTagFromElement(target);
        if (tag == null) {return;}
        if (this.plugins[tag.id] == null) {return;}
        this.plugins[tag.id].onTagClick(event);
    }

    __onHoverTag(event) {
        const target = event.target;
        let tag = this.__getTagFromElement(target);
        if (tag == null) {return;}
        if (this.plugins[tag.id] == null) {return;}
        this.plugins[tag.id].onTagHover(event);
    }

    __onLeaveTag(event) {
        const target = event.target;
        let tag = this.__getTagFromElement(target);
        if (tag == null) {return;}
        if (this.plugins[tag.id] == null) {return;}
        this.plugins[tag.id].onTagLeave(event);
    }

    __getTagFromElement(element) {
        let tag = this.tags.filter((t) => {return t.id === element.id;});
        if (tag == null || tag.length <= 0) {return null;}
        return tag[0];
    }

    __createTagPluginForTagIfNeeded(tagID, plugin) {
        if (this.plugins.hasOwnProperty(tagID) && this.plugins[tagID] != null) {return;} 
        if (plugin == null) {
            this.plugins[tagID] = plugin;
            return;
        }
        const pluginName = plugin.name;
        const classInstance = eval(`new ${pluginName}()`);
        const tagElementsContainer = this.__createTagElementsContainer(tagID);
        classInstance.onLoad(plugin.config, this.tagsContainer, tagElementsContainer, this.videoManager);
        this.plugins[tagID] = classInstance;
    }
    
    __addTagButton(tag, isVisible) {
        const tagElement = this.htmlManager.createElement('x-tag-button', {
            id: tag.id
        });
        this.tagsContainer.appendChild(tagElement);
        tagElement.hexColor = tag.color ? tag.color : "#FFFFFF";
        tagElement.position = tag.position;
        tagElement.isVisible = isVisible;
        tagElement.clickHandler = this.__onClickTag.bind(this);
        tagElement.hoverHandler = this.__onHoverTag.bind(this);
        tagElement.leaveHandler = this.__onLeaveTag.bind(this);
    }
}