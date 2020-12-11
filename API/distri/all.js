class HTMLManager {

    constructor(){}

    createElement(type, elementClass, id) {
        const element = document.createElement(type);
        if (Array.isArray(elementClass) && elementClass.length > 0) {
            elementClass.forEach(c => {
                element.classList.add(c);
            });
        }

        if (id !== undefined && id !== null) {
            element.id = id;
        }

        return element;
    }

    getShadowElementByID(containerID, id) {
        const shadowContainer = document.getElementById(containerID).shadowRoot;
        return shadowContainer.getElementById(id);
    }

    getShadowElementByClassName(containerID, className) {
        const shadowContainer = document.getElementById(containerID).shadowRoot;
        return shadowContainer.querySelector("." + className);
    } 

}
class Hypervideo {

    constructor(videoURL, videoType, hypervideoID) {
        this.videoURL = videoURL;
        this.videoType = videoType;
        this.containerID = hypervideoID;
    }

    static YOUTUBE_TYPE = "YOUTUBE";
    static VIDEO_TYPE = "VIDEO";

    isDOMLoaded() {
        return document != null && (document.readyState === "interactive" || document.readyState === "complete");
    }

    setupHypervideo(tagsJSON) {
        
        const container = document.getElementById(this.containerID);
        container.appendChild(this.getStyle());

        if (!this.isDOMLoaded()) {
            //TODO: AVISAR DE L'ERROR, PER ARA DEIXO UN CONSOLE LOG
            console.log("Error: Can't setup an hypervideo if DOM is not loaded.");
        }

        //TODO: Pensar si això ho necessitare guardar o no
        this.tagsJSON = tagsJSON;

        const videoManagerFactory = new VideoManagerFactory();
        const videoManager = videoManagerFactory.create(this.videoType, this.containerID);

        const hypervideoControlls = new HypervideoControlls(this.videoURL, this.videoType, this.containerID, videoManager);
        hypervideoControlls.createSkeleton();

        const tagsController = new TagsController(this.containerID, videoManager);
        tagsController.addTags(tagsJSON);
    }

    getStyle() {
        let style = document.createElement('style');
        style.textContent = `

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
        }
        
        .hypervideo-container {
            position: relative;
            width: 100%;
            height: 100%;
            user-drag: none; 
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
        
        /* Top control bar */
        .top-controller {
            background-color: rgba(0, 150, 0, 0.37);;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        

        /* Tags */

        x-tag-button {
            pointer-events: all;
            position: absolute;
            width: 7%;
            top: 50px;
            left: 50px;
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
            background: rgb(2,0,36);
            background: linear-gradient(0deg, rgba(2,0,36,1) 30%, rgba(0,212,255,0) 100%);
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

        x-pause-screen {
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
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

        return style;
    }
    

}
class HypervideoControlls {

    constructor(videoSRC, videoType, containerID, videoManager){
        this.videoLength = null;
        this.videoSRC = videoSRC;
        this.videoType = videoType;
        this.containerID = containerID;
        this.videoManager = videoManager;
        this.htmlManager = new HTMLManager(); 
        this.videoManager.videoStateChanged = this.__videoStateChanged.bind(this);
    }

    __videoStateChanged(state, target) {
        const progressBar = document.getElementById(this.containerID).querySelector("x-progress-bar");
        const pauseScreen = document.getElementById(this.containerID).querySelector("x-pause-screen");
        const volumeBar = document.getElementById(this.containerID).querySelector("x-volume-bar");

        switch (state) {
            case VideoManager.PLAYING:
                progressBar.startMoving();
                pauseScreen.hide();
                this.changeButtonIcon("control-play-button", "gg-play-pause");
                break;
            case VideoManager.PAUSED:
                progressBar.stopMoving();
                pauseScreen.show();
                this.changeButtonIcon("control-play-button", "gg-play-button");
                break;
            case VideoManager.LOADED:
                volumeBar.setVolume(50);
                this.videoManager.setVolume(0.5);
                this.videoLength = target.duration;
                if (progressBar === null) break;
                progressBar.setMaxLength(target.duration);
                break;
            case VideoManager.ENTER_FULL_SCREEN:
                this.changeButtonIcon("control-full-screen-button", "gg-minimize");
                break;
            case VideoManager.EXIT_FULL_SCREEN:
                this.changeButtonIcon("control-full-screen-button", "gg-maximize");
                break;
            default:
        }
    }

    restartVideo() {
        const progressBar = document.getElementById(this.containerID).querySelector("x-progress-bar");
        progressBar.setCurrentLength(0);
        this.videoManager.restartVideo();
    }

    toggleFullScreen() {
        this.videoManager.toggleFullScreen();
    }

    playButtonClicked() {
        if (!this.videoManager.isVideoPlaying()) {
            this.videoManager.play();
        } else {
            this.videoManager.pause();
        }
    }

    changeButtonIcon(buttonClass, iconName) {
        let button = document.getElementById(this.containerID).querySelector("."+buttonClass);
        if (button.length <= 0) {
            return;
        }
        let icon = button.getElementsByTagName("i");
        if (icon.length <= 0) {
            return;
        }
        icon[0].className = iconName;
    }

    createSkeleton() {
        const hypervideo = document.getElementById(this.containerID);
        const container = this.htmlManager.createElement("div", ["hypervideo-container"]);
        const tagsContainer = this.htmlManager.createElement("div", ["tags-container"]);

        hypervideo.appendChild(container);

        this.addVideoElement(container);
        if (this.videoType != Hypervideo.YOUTUBE_TYPE) {
            this.addTopBarControlls(container);
        }
        this.__addPauseScreen(container);
        container.appendChild(tagsContainer);
        this.addBottomBarControlls(container);
    }

    addVideoTag(container) {
        this.videoElementID = "video-" + this.containerID;
        const video = this.htmlManager.createElement("video", "", this.videoElementID);
        video.src = this.videoSRC;
        container.appendChild(video);
        this.videoManager.setupVideo();
    }

    addVideoFromYotube(container) {
        this.videoElementID = "video-" + this.containerID;
        const div = this.htmlManager.createElement("div", ["youtube-frame"]);
        div.id = this.videoElementID;
        container.appendChild(div);
        this.videoManager.addYoutubeScript(this.videoElementID);
    }

    addVideoElement(container) {
        switch (this.videoType) {
            case Hypervideo.YOUTUBE_TYPE:
                this.addVideoFromYotube(container);
                break;
            default:
                this.addVideoTag(container);
                break;
        }
    }

    addTopBarControlls(container) {
        const topContainer = this.htmlManager.createElement("div", ["top-controller"]);
        container.appendChild(topContainer);
    }

    __addPauseScreen(container) {
        const pauseScreen = this.htmlManager.createElement("x-pause-screen");
        const thisReference = this;
        pauseScreen.didClick = (() => {
            if (thisReference.videoManager.isVideoPlaying()) {
                thisReference.videoManager.pause();
            } else {
                thisReference.videoManager.play();
            }
        });
        container.appendChild(pauseScreen);
    }

    addBottomBarControlls(container) {
        const bottomController = this.htmlManager.createElement("div",["bottom-controller"]);
        container.appendChild(bottomController);
        const playButton = this.createControlButton("control-play-button", "gg-play-button", this.playButtonClicked);
        const replayButton = this.createControlButton("control-repeat-button", "gg-repeat", this.restartVideo);
        const fullScreenButton = this.createControlButton( "control-full-screen-button", "gg-maximize", this.toggleFullScreen);
        const progressBar = this.createProgressBar();
        const volumeBar = this.createVolumeBar();
        bottomController.appendChild(playButton);
        bottomController.appendChild(replayButton);
        bottomController.appendChild(fullScreenButton);
        bottomController.appendChild(progressBar);
        bottomController.appendChild(volumeBar);
    }

    createControlButton(buttonClass, buttonIcon, eventHandler) {
        const buttonContainer = this.htmlManager.createElement("div", ["control-button-container"]);
        const button = this.htmlManager.createElement("button", ["control-button",buttonClass]);
        const icon = this.htmlManager.createElement("i", [buttonIcon]);
        buttonContainer.appendChild(button);
        button.appendChild(icon);
        if (eventHandler !== null && eventHandler !== undefined) {
            buttonContainer.addEventListener("click", eventHandler.bind(this));
        }
        return buttonContainer;
    }

    createProgressBar() {
        const progressBar = this.htmlManager.createElement("x-progress-bar", ["progress-container"]);
        progressBar.progressBarChanged = this.__progressBarChanged.bind(this);
        if (this.videoLength !== null) {
            progressBar.setMaxLength(this.videoLength);
        }
        return progressBar;
    }

    __progressBarChanged(progress) {
        this.videoManager.loadProgress(progress);
    }

    createVolumeBar() {
        const volumeBar = this.htmlManager.createElement("x-volume-bar", ["volume-bar"]);
        volumeBar.volumeChanged = this.__volumeChanged.bind(this);
        return volumeBar;
    }

    __volumeChanged(volume) {
        this.videoManager.setVolume(volume/100);
    }

}

function includeJs(jsFilePath, callback) {
    var script = document.createElement("script");

    script.type = "text/javascript";
    script.src = jsFilePath;

    script.onreadystatechange = callback;
    script.onload = callback;

    document.body.appendChild(script);
}

let files = [
    "../../API/src/HTMLManager.js",
    "../../API/src/HypervideoControlls.js",
    "../../API/src/Hypervideo.js"
];

let scriptsLoaded = 0;

function importHypervideoAPI(callback) {
    files.forEach(file => {
        includeJs(file, ()=> {
            scriptsLoaded++;
            if (scriptsLoaded === files.length) {
                callback();
            }
        });
    });
}

   
class Observer {

    constructor(onChange) {
        this.onChange = onChange;
    }

    update(newValue) {
        this.onChange(newValue);
    }

}
class Subject {

    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const index = this.observers.findIndex(obs => {
            return observer === obs;
        });
        if (index !== -1) {
            this.observers = this.observers.slice(index, 1);
        }
    }

    notify(newValue) {
        this.observers.forEach(obs => obs.update(newValue));
    }

}
class TagsController {

    constructor(containerID, videoManager) {
        this.containerID = containerID;
        this.videoManager = videoManager;
        this.tagsContainer = document.getElementById(containerID).querySelector(".tags-container");
    }

    addTags(tagsJSON) {
        try {
            const tagsConfig = JSON.parse(tagsJSON).tags;
            for (const tag of tagsConfig) {
                this.__addTagButton(tag);
            }
        } catch(error) {
            throw "Error: Not valid JSON";
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
        tagElement.color = "#FF5733";
        tagElement.position = tag.position;
    }

}
class VideoManager extends Subject {

    constructor(containerID) {
        super();
        this.containerID = containerID;
        this.videoStateChanged = null;
        this.isFullScreen = false;
        //Convertim la classe en "abstract"
        if (new.target === VideoManager) {
            throw new TypeError("Cannot construct VideoManager instances directly");
        }

        this.__exitFullScreenEventListeners();
    }

    static PLAYING = 0;
    static PAUSED = 1;
    static LOADED = 2;
    static ENTER_FULL_SCREEN = 3;
    static EXIT_FULL_SCREEN = 4;

    play() {}

    pause() {}

    restartVideo() {}

    isVideoPlaying(){}

    get currentTime() {return 0;}
    
    //0-1
    loadProgress(progress) {}

    //0-1
    setVolume(volume) {}

    __exitFullScreenEventListeners() {
        document.addEventListener('fullscreenchange', this._exitFSHandler.bind(this), false);
        document.addEventListener('mozfullscreenchange', this._exitFSHandler.bind(this), false);
        document.addEventListener('MSFullscreenChange', this._exitFSHandler.bind(this), false);
        document.addEventListener('webkitfullscreenchange', this._exitFSHandler.bind(this), false);
    }

    _exitFSHandler(event) {
        if (document.fullscreenElement) return; //If is entering fullscreen mode return
        this.isFullScreen = false;
        this.videoStateChanged(VideoManager.EXIT_FULL_SCREEN);
    }

    _enterFSHandler() {
        this.isFullScreen = true;
        this.videoStateChanged(VideoManager.ENTER_FULL_SCREEN);
    }

    toggleFullScreen() {
        const container = document.getElementById(this.containerID);
        if (this.isFullScreen) {
            this.requestExitFullScreen(container);
        } else {
            this.requestFullScreen(container);
        }
    }
    
    isFullScreen() {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    }

    requestFullScreen(container) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
            this._enterFSHandler();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
            this._enterFSHandler();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
            this._enterFSHandler();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
            this._enterFSHandler();
        }
    }

    requestExitFullScreen(container) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            this._exitFSHandler();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            this._exitFSHandler();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            this._exitFSHandler();
        }
    }
}
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
class VideoTagManager extends VideoManager {

    constructor (containerID) {
        super(containerID);
        this.videoTimer = new VideoTimer(this.__timeHandler.bind(this));
    }

    play() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.play();
    }

    pause() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.pause();
    }

    restartVideo() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = 0;
    }

    isVideoPlaying() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        return !video.paused;
    }

    get currentTime() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        return video.currentTime;
    }

    
    //0-1
    loadProgress(progress) {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = video.duration * progress;
        this.videoTimer.loadOffset(video.currentTime - Math.floor(video.currentTime));
        this.notify(video.currentTime);
    }

    setupVideo() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.addEventListener('pause', this.__videoIsPaused.bind(this));
        video.addEventListener('play', this.__videoIsPlaying.bind(this));
        video.addEventListener('loadeddata', this.__videoLoaded.bind(this));
    }

    __videoIsPlaying() {
        this.videoStateChanged(VideoManager.PLAYING);
        this.videoTimer.play();
    }

    __videoIsPaused() {
        this.videoStateChanged(VideoManager.PAUSED);
        this.videoTimer.pause();
    }

    __videoLoaded() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        this.videoStateChanged(VideoManager.LOADED, {duration: video.duration});
    }

    __timeHandler() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        this.notify(video.currentTime);
    }

    //0-1
    setVolume(volume) {
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        const video = this.htmlManager.getShadowElementByID(this.containerID, this.videoElementID);
        video.volume = volume;
    }

    setVolume(volume) {
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.volume = volume;
    }

}
class VideoTimer {

    constructor (timeHandler) {
        this.loopCounter = 0;
        this.timeHandler = timeHandler;
    }
    
    static get LOOP_TIME() {
        return 100;
    }

    play() {
        this.timer = setInterval(this.__handleTime.bind(this), VideoTimer.LOOP_TIME);
    }

    pause() {
        clearInterval(this.timer);
    }

    loadOffset(offset) {
        this.loopCounter = parseInt(offset/ VideoTimer.LOOP_TIME);
    }

    __handleTime() {
        this.loopCounter++;
        if (this.loopCounter >= 10) {
            this.timeHandler();
            this.loopCounter = 0;
        }
    }

}
class XPauseScreen extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.didClick = null;

        let shadow = this.attachShadow({mode: 'open'});
        const container = this.htmlManager.createElement('div', ["pause-container"]);
        container.addEventListener('click', this.__onClick.bind(this));
        //this.__addPlayIcon(container);
        shadow.appendChild(container);
        shadow.appendChild(this.__getStyle());
    }

    hide() {
        const container = this.shadowRoot.querySelector(".pause-container");
        container.classList.add("hide");
    }

    show() {
        const container = this.shadowRoot.querySelector(".pause-container");
        container.classList.remove("hide");
    }

    __onClick() {
        this.didClick();
    }

    __addPlayIcon(container) {
        const img = this.htmlManager.createElement("img", ["play-image"]);
        img.src = "./../../API/assets/play-button.svg";
        container.appendChild(img);
    }

    __getStyle () {
        const style = document.createElement("style");
        style.textContent = `

            .pause-container {
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.1);
                cursor: pointer;
                display: flex;
                margin: 0;
            }

            .hide {
                opacity: 0;
            }

            .play-image {
                width: 100px;
                height: 100px;
                margin: auto;
            }
        `;

        return style;
    }

}

customElements.define('x-pause-screen', XPauseScreen);
class XProgressBar extends HTMLElement {

    constructor() {
        super();
        this.isMoving = false;
        this.htmlManager = new HTMLManager();
        this.maxLength = 100;
        this.currentLength = 0;
        this.currentProgress = 0;
        this.progressBarChanged = null;
        let shadow = this.attachShadow({mode: 'open'});

        this.__setupEventsListeners();
        const bar = this.htmlManager.createElement("div", ["progress-bar"]);
        shadow.appendChild(this.getStyle());
        shadow.appendChild(bar);

        this.addMarkerAt(10);
        this.addMarkerAt(40);
    }

    static POSITION_SET = "POSITION_SET";

    addMarkerAt(length) {
        const marker = this.htmlManager.createElement("div", ["progress-bar-marker"]);
        const progress = this.convertLengthToProgress(length);
        this.shadowRoot.appendChild(marker);
        marker.style.left = progress + "%";
    }

    __setupEventsListeners() {
        this.onmousedown = this.__mouseDown.bind(this);
        document.addEventListener('mouseup', this.__mouseUp.bind(this));
        document.addEventListener('mouseleave', this.__mouseLeave.bind(this));
        document.addEventListener('mousemove', this.__mouseMoving.bind(this));
    }
    
    __recalculatePosition(clientX) {
        const rect = this.getBoundingClientRect();
        const posX = clientX - rect.left;
        let progress = posX / rect.width;
        progress = progress > 1 ? 1 : progress;
        progress = progress < 0 ? 0 : progress;
        this.setCurrentLength(progress * this.maxLength);
    }

    __mouseLeave(event) {
        if (!this.isMoving) {return;}
        this.isMoving = false;
        this.__recalculatePosition(event.clientX);
        this.progressBarChanged(this.currentProgress);
    }

    __mouseUp(event) {
        if (!this.isMoving) {return;}
        this.isMoving = false;
        this.__recalculatePosition(event.clientX);
        this.progressBarChanged(this.currentProgress);
    }

    __mouseMoving(event) {
        if (!this.isMoving) {return;}
        this.__recalculatePosition(event.clientX);
    }

    __mouseDown(event) {
        this.isMoving = true;
        this.__recalculatePosition(event.clientX);
    }

    startMoving() {
        const progressBar = this;
        this.__timeInterval = setInterval(() => {
            progressBar.increment(1);
        }, 1000);
    }

    stopMoving() {
        if (this.__timeInterval !== undefined && this.__timeInterval !== null) {
            clearInterval(this.__timeInterval);
        }
    }

    convertLengthToProgress(length) {
        return (length / this.maxLength) * 100;
    }

    setCurrentLength(length) {
        this.currentLength = length;
        this.currentLength = this.currentLength > this.maxLength ? this.maxLength : this.currentLength;
        this.currentLength = this.currentLength < 0 ? 0 : this.currentLength;
        const progressBar = this.shadowRoot.querySelector(".progress-bar");
        const progress = this.convertLengthToProgress(length);
        this.currentProgress = progress/100;
        progressBar.style.width = progress + "%";
    }

    setMaxLength(length) {
        this.maxLength = length;
    }

    increment(value) {
        let inc = 1;
        if (value !== undefined && value !== null && !isNaN(value)) {
            inc = value;
        }
        this.setCurrentLength(this.currentLength + inc);
    }

    getStyle() {
        const style = document.createElement("style");
        style.textContent = `
            .progress-bar {
                background: rgb(97, 87, 245);
                position: absolute;
                height: 100%;
                width: 0%;
            }

            .progress-bar-marker {
                width: 7px;
                height: 100%;
                top: 0;
                background: yellow;
                position: absolute;
            }
        `;
        return style;
    }

}

customElements.define('x-progress-bar', XProgressBar);
class XTagButton extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.attachShadow({mode: 'open'});

        const anchor = this.htmlManager.createElement("a", ["tag-anchor"]);
        const aspectRatioDiv = this.htmlManager.createElement("div", ["aspect-ratio-div"]);
        this.shadowRoot.appendChild(aspectRatioDiv);
        this.shadowRoot.appendChild(anchor);
        this.shadowRoot.appendChild(this.getStyle());
        this.__setupEventListeners(anchor);
    }

    set color(newValue) {
        const anchor = this.shadowRoot.querySelector(".tag-anchor");
        anchor.style.background = newValue;
    }

    get color() {return this.color;}

    set position(newValue) {
        this.style.top = newValue.x + "%";
        this.style.left = newValue.y + "%";
        this.style.transform = "translate(-50%, -50%)";
    }

    set isVisible(newValue) {
        const anchor = this.shadowRoot.querySelector(".tag-anchor");
        if (newValue === true) {
            anchor.style.display = "block";
        } else if (newValue === false) {
            anchor.style.display = "none";
        }
    }

    __setupEventListeners(element) {
        element.addEventListener('mousedown', this.__onMouseDown.bind(this));
        element.addEventListener('click', this.__onClick.bind(this));
        element.addEventListener('mouseenter', this.__onHover.bind(this));
        element.addEventListener('mouseleave', this.__onMouseUp.bind(this));
        document.addEventListener('mouseup', this.__onMouseUp.bind(this));
    }

    __onClick() {
        console.log("Click");
    }

    __onHover() {
        console.log("Hover");
    }

    __onMouseDown() {
        console.log("Hold");
    }

    __onMouseUp() {
        console.log("Up");
    }

    getStyle() {

        let style = document.createElement("style");
        style.textContent = `

            .aspect-ratio-div {
                margin-top: 100%;
            }

            .tag-anchor {
                display:none;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                cursor: pointer;
            }
        `;

        return style;

    }



}

customElements.define('x-tag-button', XTagButton);
class XVolumeBar extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.maxVolume = 100;
        this.volume = 0;
        this.isVolMoving = false;
        this.volumeChanged = (()=>{});
        let shadow = this.attachShadow({mode: 'open'});
        
        const container = this.htmlManager.createElement("div", ["volume-bar-container"]);
        const volumeButton = this.createVolumeButton();
        const volumeBar = this.htmlManager.createElement("div", ["volume-bar-rect"]);
        const volumeLevelBar = this.htmlManager.createElement("div", ["volume-bar-level"]);

        container.appendChild(volumeButton);
        container.appendChild(volumeBar);
        volumeBar.appendChild(volumeLevelBar);
        shadow.appendChild(container);
        shadow.appendChild(this.getStyle());

        this.__setupEventsListeners(volumeBar, container);

    }

    createVolumeButton() {
        const buttonContainer = this.htmlManager.createElement("div", ["volume-icon-container"]);
        const button = this.htmlManager.createElement("button", ["volume-button"]);
        const icon = this.htmlManager.createElement("i", ["gg-volume"]);
        buttonContainer.appendChild(button);
        button.appendChild(icon);
        return buttonContainer;
    }

    __setupEventsListeners(volumeBar,container) {
        volumeBar.onmousedown = this.__mouseDown.bind(this);
        container.onmouseenter = this.__mouseEnter.bind(this);
        container.onmouseleave = (this.__mouseLeaveElement.bind(this));
        document.addEventListener('mouseup', this.__mouseUp.bind(this));
        document.addEventListener('mouseleave', this.__mouseLeaveDocument.bind(this));
        document.addEventListener('mousemove', this.__mouseMoving.bind(this));
    }

    __mouseEnter() {
        const volumeBar = this.shadowRoot.querySelector(".volume-bar-rect");
        volumeBar.classList.add("volume-bar-rect-focus");
    }

    __mouseLeaveDocument() {
        this.isVolMoving = false;
    }

    __mouseLeaveElement() {
        if (this.isVolMoving) {return;}
        const volumeBar = this.shadowRoot.querySelector(".volume-bar-rect");
        volumeBar.classList.remove('volume-bar-rect-focus');
    }
    
    __mouseUp() {
        this.isVolMoving = false;
    }

    __mouseMoving(event) {
        if (!this.isVolMoving) {return;}
        this.__calculateVolumePosition(event.clientX);
    }

    __mouseDown(event) {
        this.isVolMoving = true;
        this.__calculateVolumePosition(event.clientX);
    }
    
    __calculateVolumePosition(clientX) {
        const volumeBarRect = this.shadowRoot.querySelector(".volume-bar-rect");
        const rect = volumeBarRect.getBoundingClientRect();
        const posX = clientX - rect.left;
        const progress = posX / rect.width;
        this.setVolume(progress * this.maxVolume);
    }

    setVolume(volume) {
        volume = volume < 0 ? 0 : volume;
        volume = volume > 100 ? 100 : volume;
        this.volume = volume;
        this.volumeChanged(volume);
        const volumeLevelBar = this.shadowRoot.querySelector(".volume-bar-level");
        volumeLevelBar.style.width = volume + "%";
    }

    getStyle() {
        const style = document.createElement("style");
        style.textContent = `
            .volume-bar-container {
                margin-right: 0.5px;
                cursor: pointer;
                display: flex;
            }

            .volume-bar-container:hover,
            .volume-bar-container:focus {
                color: rgb(97, 87, 245);
            }
            
            .volume-bar-rect {
                display: none;
                height: 3px;
                background:white;
                width: 50px;
                margin: auto;
                cursor: pointer;
                transition: height 0.2s;
            }

            .volume-bar-rect:hover,
            .volume-bar-rect:focus {
                height: 7px;
            }
            
             .volume-bar-rect-focus {
                display: block;
            }

            .volume-bar-level {
                height: 100%;
                width: 0%;
                background: rgb(97, 87, 245);
            }
            
            .volume-icon-container {
                background: rgba(0,0,0,0);
                height: 2em;
                padding-left: 0.4em;
                padding-right: 0.4em;
                border: none;
                cursor: pointer;
            }
            
            .volume-button {
                color: white;  
                border: none;
                outline: none;
                background-color: rgba(0,0,0,0);
                height: 100%; 
                width: 2em;
                margin: auto;
                padding: 0;
                cursor: pointer;
            }
            
            .volume-button:hover,
            .volume-button:focus {
                color: rgb(97, 87, 245);
            }

            /* ICON */
            /* ICON */
            .gg-volume {
                box-sizing: border-box;
                position: relative;
                display: block;
                transform: scale(var(--ggs,1));
                width: 8px;
                height: 8px;
                border: 2px solid;
                border-right: 0;
                -webkit-perspective: 12px;
                perspective: 12px;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                margin: 0;
            }
            .gg-volume::after,
            .gg-volume::before {
                content: "";
                display: block;
                box-sizing: border-box;
                position: absolute;
            }
            .gg-volume::before {
                left: 2px;
                transform: rotateY(-90deg);
                width: 10px;
                height: 10px;
                border: 2px solid;
                border-left: 0;
                top: -3px;
            }
            .gg-volume::after {
                width: 8px;
                height: 16px;
                border: 6px double;
                border-left: 0;
                border-top-right-radius: 100px;
                border-bottom-right-radius: 100px;
                right: -14px;
                top: -6px;
            }    
        `;
        return style;
    }

}

customElements.define('x-volume-bar', XVolumeBar);
class YoutubeVideoManager extends VideoManager {

    constructor(containerID) {
        super(containerID);
        this.player = null;
        this.videoTimer = new VideoTimer(this.__timeHandler.bind(this));
    }

    play() {
        if (this.player === null) {return;}
        this.player.playVideo();
    }

    pause() {
        if (this.player === null) {return;}
        this.player.pauseVideo();
    }

    restartVideo() {
        this.__loadTime(0);
    }
    
    isVideoPlaying() {
        return this.player.getPlayerState() == YT.PlayerState.PLAYING;
    }

    get currentTime() {
        return this.player.getCurrentTime();
    }

    //0-1
    loadProgress(progress) {
        const videoDuration = this.player.getDuration();
        this.__loadTime(videoDuration * progress);
    }

    __loadTime(seconds) {
        if (this.player === null) {return;}
        this.player.seekTo(seconds, true);
        const currentTime = this.player.getCurrentTime();
        this.videoTimer.loadOffset(currentTime - Math.floor(currentTime));
        this.notify(currentTime);
    }

    setVolume(volume) {
        if (this.player === null) {return;}
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        this.player.setVolume(volume * 100);
    }

    addYoutubeScript(iframeContainerID) {
        this.iframeContainerID = iframeContainerID;
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.appendChild(tag);
        window.onYouTubeIframeAPIReady = this.__onYouTubeIframeAPIReady.bind(this);
    }

    __onYouTubeIframeAPIReady() {
        const player = new YT.Player(this.iframeContainerID, {
            height: '360',
            width: '640', 
            videoId: 'jLHW8V462jo',
            events: {
                'onReady': this.__onPlayerReady.bind(this),
                'onStateChange': this.__onPlayerStateChange.bind(this)
            },
            playerVars: { 
                'autoplay': 0, 
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'modestbranding': 1,
                'rel': 0,
                'iv_load_policy': 3,
                'autohide':1,
                'wmode':'opaque',
                'start': 1
            },

        });
        this.player = player;
    }
    
    __onPlayerReady(event) {
        const iFrame = document.querySelector("#"+this.iframeContainerID);
        iFrame.style.pointerEvents = "none";
        this.videoStateChanged(VideoManager.LOADED, {duration: this.player.getDuration()});
        this.__loadTime(0);
    }
    __onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            this.videoStateChanged(VideoManager.PLAYING);
            this.videoTimer.play();
        } else if (event.data == YT.PlayerState.PAUSED) {
            this.videoStateChanged(VideoManager.PAUSED);
            this.videoTimer.pause();
        }
    }
     
    __timeHandler() {
        this.notify(this.player.getCurrentTime());
    }
}
