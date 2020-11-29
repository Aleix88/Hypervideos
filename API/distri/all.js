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
        const hypervideoControlls = new HypervideoControlls(this.videoURL, this.videoType, this.containerID, videoManagerFactory.create(this.videoType, this.containerID));
        hypervideoControlls.createSkeleton();
    }

    getStyle() {
        let style = document.createElement('style');
        style.textContent = `
        video {
            width: 100%;
            height: 100%;
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
        }
        
        /* Top control bar */
        .top-controller {
            background-color: rgba(0, 150, 0, 0.37);;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        
        /*  Bottom control bar  */
        .bottom-controller {
            display: flex;
            justify-content: flex-start;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(255, 255, 255, 0.521);
            padding: 4px;
        }
        
        .control-button-container {
            background: white;
            height: 2em;
            padding-left: 0.4em;
            padding-right: 0.4em;
            border: 0.3px solid black;
            cursor: pointer;
        }
        
        .control-button-container:not(:last-child) {
            margin-right: 2px;
        }
        
        .control-button-container:hover,
        .control-button-container:focus {
            background: lightgray;
        }
        
        .control-button {
            color: black;  
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
            height: 10px;
            background: red;
            align-self: center;
            position: relative;
            cursor: pointer;
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
        this.videoSRC = videoSRC;
        this.videoType = videoType;
        this.containerID = containerID;
        this.videoManager = videoManager;
        this.htmlManager = new HTMLManager(); 
    }

    restartVideo() {
        this.videoManager.restartVideo();
    }

    toggleFullScreen() {
        this.videoManager.toggleFullScreen();
        const iconName = this.videoManager.isFullScreen() ? "gg-minimize" : "gg-maximize";
        this.changeButtonIcon("control-full-screen-button", iconName);
    }

    playButtonClicked() {
        if (this.videoManager.isPaused) {
            this.videoManager.play();
            this.changeButtonIcon("control-play-button", "gg-play-pause");
        } else {
            this.videoManager.pause();
            this.changeButtonIcon("control-play-button", "gg-play-button");
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
        container.appendChild(tagsContainer);
        this.addBottomBarControlls(container);
    }

    addVideoTag(container) {
        this.videoElementID = "video-" + this.containerID;
        const video = this.htmlManager.createElement("video", "", this.videoElementID);
        video.src = this.videoSRC;
        container.appendChild(video);
    }

    addVideoFromYotube(container) {
        //TODO: L'enables API segurament ho necessesitare per implementar alguna cosa dels tags.
       /* const frame = this.htmlManager.createElement("iframe", ["youtube-frame"]);
        let src = this.videoSRC;
        src += "?autoplay=0&controls=0&showinfo=0&disablekb=1&fs=0&playsinline=1&wmode=opaque&iv_load_policy=3&modestbranding=1&rel=0";
        frame.src = src;
        frame.id = "player";
        frame.frameBorder = 0;*/
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

    addBottomBarControlls(container) {
        const bottomController = this.htmlManager.createElement("div",["bottom-controller"]);
        container.appendChild(bottomController);
        const playButton = this.createControlButton("control-play-button", "gg-play-button", this.playButtonClicked);
        const replayButton = this.createControlButton("control-repeat-button", "gg-repeat", this.restartVideo);
        const fullScreenButton = this.createControlButton( "control-full-screen-button", "gg-maximize", this.toggleFullScreen);
        const volumeButton = this.createControlButton("control-volume-button", "gg-volume");
        const progressBar = this.createProgressBar();
        bottomController.appendChild(playButton);
        bottomController.appendChild(replayButton);
        bottomController.appendChild(fullScreenButton);
        bottomController.appendChild(progressBar);
        bottomController.appendChild(volumeButton);
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
        
        return progressBar;
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

   
class VideoManager {
    constructor(containerID) {
        this.currentTime = 0;
        this.containerID = containerID;
        this.isPaused = true;
        //Convertim la classe en "abstract"
        if (new.target === VideoManager) {
            throw new TypeError("Cannot construct VideoManager instances directly");
        }
    }

    play() {}

    pause() {}

    restartVideo() {}
    
    loadTime(seconds) {}

    setVolume() {}

    
    toggleFullScreen() {
        const container = document.getElementById(this.containerID);
        if (this.isFullScreen()) {
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
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    }

    requestExitFullScreen(container) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
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

    play() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.play();
        this.isPaused = false;
    }

    pause() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.pause();
        this.isPaused = true;
    }

    restartVideo() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = 0;
    }
    
    loadTime(seconds) {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = seconds;
    }

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
class XProgressBar extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.maxLength = 100;
        this.currentLength = 0;
        let shadow = this.attachShadow({mode: 'open'});

        this.addEventListener('click', this.onClickBar);
        const bar = this.htmlManager.createElement("div", ["progress-bar"]);
        shadow.appendChild(this.getStyle());
        shadow.appendChild(bar);

        this.addMarkerAt(10);
        this.addMarkerAt(40);
    }

    addMarkerAt(length) {
        const marker = this.htmlManager.createElement("div", ["progress-bar-marker"]);
        const progress = this.convertLengthToProgress(length);
        this.shadowRoot.appendChild(marker);
        marker.style.left = progress + "%";
    }

    onClickBar(event) {
        const rect = event.target.getBoundingClientRect();
        const posX = event.clientX - rect.left;
        const progress = posX / rect.width;
        this.setCurrentLength(progress * this.maxLength);
    }

    convertLengthToProgress(length) {
        return (length / this.maxLength) * 100;
    }

    setCurrentLength(length) {
        this.currentLength = length;
        const progressBar = this.shadowRoot.querySelector(".progress-bar");
        const progress = this.convertLengthToProgress(length);
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
                background: blue;
                position: absolute;
                height: 100%;
                width: 50%;
            }

            .progress-bar-marker {
                width: 10px;
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
class YoutubeVideoManager extends VideoManager {

    constructor(containerID) {
        super(containerID);
        this.player = null;
    }

    play() {
        this.player.playVideo();
        this.isPaused = false;
    }

    pause() {
        this.player.pauseVideo();
        this.isPaused = true;
    }

    restartVideo() {}
    
    loadTime(seconds) {}

    setVolume() {}

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
                'onReady': this.__onPlayerReady,
                'onStateChange': this.__onPlayerStateChange
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
                'wmode':'opaque' 
            },

        });
        this.player = player;
    }
    
    __onPlayerReady(event) {
        console.log("READY");
    }
    __onPlayerStateChange(event) {
        console.log("STATE");    
    }
     
}
