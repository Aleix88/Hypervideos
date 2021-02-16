class Hypervideo {

    constructor(videoURL, videoType, hypervideoID) {
        this.videoURL = videoURL;
        this.videoType = videoType;
        this.containerID = hypervideoID;
    }

    static YOUTUBE_TYPE = "YOUTUBE";
    static VIDEO_TYPE = "VIDEO";
    static IMAGE_TYPE = "IMAGE";

    __isDOMLoaded() {
        return document != null && (document.readyState === "interactive" || document.readyState === "complete");
    }

    setupHypervideo(config) {

        
        if (!this.__isDOMLoaded()) {
            throw "Error: Can't setup an hypervideo if DOM is not loaded."
        }
        this.__addGlobalStyle();

        this.config = this.__assingIdToTags(config);
        
        const mediaManagerFactory = new MediaManagerFactory();
        const mediaManager = mediaManagerFactory.create(this.videoType, this.containerID);

        if (this.videoType === Hypervideo.IMAGE_TYPE) {
            const hyperImageController = new HyperimageController(this.videoURL, this.containerID, this.config, mediaManager);
            hyperImageController.createSkeleton();
        } else {
    
            const hypervideoController = new HypervideoController(this.videoURL, this.videoType, this.containerID, mediaManager, this.config);
            hypervideoController.createSkeleton();
        }

    }

    __assingIdToTags(config) {
        try {
            let i = 0;
            config.tags = config.tags.map((t) => {
                t.id = this.containerID + "-tag-" + i++;
                return t;
            })
            return config;
        } catch(error) {
            throw "Error: Not valid JSON";
        }
    }

    __addGlobalStyle() {
        let style = document.createElement('style');
        style.textContent = `
            .hypervideo:-moz-full-screen {
                background: black;
                width: 100% !important;
                height: 100% !important;
            }
            
            .hypervideo:-webkit-full-screen {
                background: black;
                width: 100% !important;
                height: 100% !important;
            }
            
            .hypervideo:fullscreen {
                background: black;
                width: 100% !important;
                height: 100% !important;
            }

            video {
                width: 100%;
                height: 100%;
                background: black;
            }
            
            button {
                cursor: pointer;
            }
            
            .youtube-frame {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
    
            .hyperimage {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            
            .hypervideo-container {
                position: relative;
                width: 100%;
                height: 100%;
                text-align:center;
                user-drag: none; 
                user-select: none;
                -moz-user-select: none;
                -webkit-user-drag: none;
                -webkit-user-select: none;
                -ms-user-select: none;
            }
    
            .img-container {
                margin: auto;
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
            }
            
            /* Top control bar */
            .top-controller {
                background: rgb(0,0,0);
                background: linear-gradient(180deg, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                opacity: 0;
                transition: opacity 0.2s;
                text-align:left;
            }
    
            .top-title {
                color:white;
                margin: 1em;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
    
            .hypervideo-container:hover > .top-controller,
            .hypervideo-container:focus > .top-controller {
                opacity: 1;
            }
            
    
            /* Tags */
    
            x-tag-button {
                pointer-events: all;
                position: absolute;
                width: 5%;
                top: 50px;
                left: 50px;
                display: block;
                visibility: hidden;
            }
    
            .tags-container {
                pointer-events: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
    
            /*  Bottom control bar  */
            .bottom-controller {
                display: flex;
                opacity: 0;
                justify-content: flex-start;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgb(0,0,0);
                background: linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
                padding: 4px;
                transition: opacity 0.2s;
            }
    
            .hypervideo-container:hover > .bottom-controller,
            .hypervideo-container:focus > .bottom-controller {
                opacity: 1;
            }
            
            .control-button-container {
                background: rgba(0,0,0,0);
                height: 2em;
                padding-left: 0.4em;
                padding-right: 0.4em;
                border: none;
                cursor: pointer;
            }
            
            .control-button-container:not(:last-child) {
                margin-right: 2px;
            }
            
            .control-button {
                color: white;  
                border: none;
                outline: none;
                background-color: rgba(0,0,0,0);
                height: 100%; 
                width: 2em;
                margin: auto;
                padding: 0;
            }
            
            .control-button:hover,
            .control-button:focus {
                color: rgb(97, 87, 245);
            }
            
            .progress-container {
                flex-grow: 1;
                margin-right: 2px;
                height: 3px;
                background: rgba(210,210,210,0.68);
                align-self: center;
                position: relative;
                cursor: pointer; 
                transition: height 0.2s;
            }        
    
            .progress-container:focus,
            .progress-container:hover {
                height: 5px;
            }
    
            x-time-counter {
                display: flex;
                margin-right: 1em;
                align-items: center;
            }
    
            x-pause-screen {
                width: 100%;
                height: 100%;
                margin: auto;
                position: absolute;
                top: 0;
                left: 0;
            }
    
            x-full-screen-button {
                position: absolute;
                bottom: 1em;
                right: 1em;
            }
    
            
            /* ICONS */
            
            .gg-play-button {
                box-sizing: border-box;
                position: relative;
                display: block;
                transform: scale(var(--ggs,1));
                width: 22px;
                height: 22px;
                margin: auto; /*Aquesta linia s'ha d'afegir*/
            }
            .gg-play-button::before {
                content: "";
                display: block;
                box-sizing: border-box;
                position: absolute;
                width: 0;
                height: 10px;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-left: 6px solid;
                top: 6px;
                left: 9px;
            }
            
            .gg-repeat {
                box-sizing: border-box;
                position: relative;
                display: block;
                transform: scale(var(--ggs,1));
                box-shadow:
                    -2px -2px 0 0,
                    2px 2px 0 0;
                width: 14px;
                height: 6px;
                margin: auto;
            }
            .gg-repeat::after,
            .gg-repeat::before {
                content: "";
                display: block;
                box-sizing: border-box;
                position: absolute;
                width: 0;
                height: 0;
                border-top: 3px solid transparent;
                border-bottom: 3px solid transparent;
            }
            .gg-repeat::before {
                border-left: 5px solid;
                top: -4px;
                right: 0;
            }
            .gg-repeat::after {
                border-right: 5px solid;
                bottom: -4px;
                left: 0;
            }
            .gg-maximize {
                box-sizing: border-box;
                position: relative;
                display: block;
                transform: scale(var(--ggs,1));
                width: 14px;
                height: 14px;
                box-shadow:
                    -6px -6px 0 -4px,
                    6px 6px 0 -4px,
                    6px -6px 0 -4px,
                    -6px 6px 0 -4px;
                margin: auto;
            }
            
            .gg-minimize {
                box-sizing: border-box;
                position: relative;
                display: block;
                transform: scale(var(--ggs,1));
                width: 4px;
                height: 4px;
                box-shadow:
                    -8px -4px 0 -1px,
                    -6px -4px 0 -1px,
                    8px 4px 0 -1px,
                    6px 4px 0 -1px,
                    8px -4px 0 -1px,
                    6px -4px 0 -1px,
                    -8px 4px 0 -1px,
                    -6px 4px 0 -1px;
                margin: auto;
            }
            .gg-minimize::after,
            .gg-minimize::before {
                content: "";
                display: block;
                box-sizing: border-box;
                position: absolute;
                width: 2px;
                height: 18px;
                border-top: 6px solid;
                border-bottom: 6px solid;
                box-shadow: 18px 0 0 -2px;
                top: -7px;
            }
            .gg-minimize::after {
                left: -3px;
            }
            .gg-minimize::before {
                right: -3px;
            }
            
            .gg-play-pause {
                box-sizing: border-box;
                position: relative;
                display: block;
                transform: scale(var(--ggs,1));
                width: 8px;
                height: 10px;
                border-left: 3px solid;
                border-right: 3px solid;
                margin: auto;
            }
        `;

        document.querySelector("head").appendChild(style);
    }

}