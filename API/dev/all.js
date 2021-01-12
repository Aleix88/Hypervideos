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
class ContainerManager extends Subject {

    constructor(containerID) {
        super();
        this.containerID = containerID;
        this.videoStateChanged = null;
        this.isFullScreen = false;

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
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.isFullScreen = false;
            this.videoStateChanged(ContainerManager.EXIT_FULL_SCREEN);
        }
    }

    _enterFSHandler() {
        this.isFullScreen = true;
        this.videoStateChanged(ContainerManager.ENTER_FULL_SCREEN);
    }

    toggleFullScreen() {
        const container = document.getElementById(this.containerID);
        if (this.isFullScreen) {
            this.requestExitFullScreen(container);
        } else {
            this.requestFullScreen(container);
        }
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
class VideoTagManager extends ContainerManager {

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
        this.loadProgress(0);
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
        this.videoStateChanged(ContainerManager.PLAYING);
        this.videoTimer.play();
    }

    __videoIsPaused() {
        this.videoStateChanged(ContainerManager.PAUSED);
        this.videoTimer.pause();
    }

    __videoLoaded() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        this.videoStateChanged(ContainerManager.LOADED, {duration: video.duration});
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
class YoutubeVideoManager extends ContainerManager {

    constructor(containerID) {
        super(containerID);
        this.player = null;
        this.firstTimePlaying = true;
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
        this.notify(seconds);
    }

    setVolume(volume) {
        if (this.player === null) {return;}
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        this.player.setVolume(volume * 100);
    }

    addYoutubeScript(iframeContainerID, videoID) {
        this.iframeContainerID = iframeContainerID;
        this.videoID = videoID;
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
            videoId: this.videoID,
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
                'start': 0
            },

        });
        this.player = player;
    }
    
    __onPlayerReady(event) {
        const iFrame = document.querySelector("#"+this.iframeContainerID);
        iFrame.style.pointerEvents = "none";
        this.videoStateChanged(ContainerManager.LOADED, {duration: this.player.getDuration()});
    }
    __onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            console.log();
            if (this.firstTimePlaying === true && this.player.getCurrentTime() >= 0.1) {
                this.__loadTime(0);
            }
            this.videoStateChanged(ContainerManager.PLAYING);
            this.videoTimer.play();
            this.firstTimePlaying = false;
        } else if (event.data == YT.PlayerState.PAUSED) {
            this.videoStateChanged(ContainerManager.PAUSED);
            this.videoTimer.pause();
        }
    }
     
    __timeHandler() {
        this.notify(this.player.getCurrentTime());
    }
}

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

    hexToRGBA(hexColor, alpha) {
        const r = parseInt(hexColor.slice(1,3), 16);
        const g = parseInt(hexColor.slice(3,5), 16);
        const b = parseInt(hexColor.slice(5,7), 16);

        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

}
class VideoTimer {

    constructor (timeHandler) {
        this.loopCounter = 0;
        this.timeHandler = timeHandler;
        this.timer = null;
        this.isPlaying = false;
    }
    
    static get LOOP_TIME() {
        return 100;
    }

    play() {
        if (this.isPlaying === true) {return;} 
        this.timer = setInterval(this.__handleTime.bind(this), VideoTimer.LOOP_TIME);
        this.isPlaying = true;
    }

    pause() {
        clearInterval(this.timer);
        this.isPlaying = false;
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
class XFullScreenButton extends HTMLElement {
    
    constructor() {
        super();
        this.clickHandler = null;
        let shadow = this.attachShadow({mode: 'open'});
        const button = this.__createButton();
        shadow.append(button);
        shadow.appendChild(this.__getStyle());
    }

    __createButton() {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("fs-button-container");
        buttonContainer.addEventListener('click', this.__buttonClicked.bind(this));
        this.icon = document.createElement("i");
        this.icon.classList.add("gg-maximize");
        buttonContainer.appendChild(this.icon);
        return buttonContainer;
    }

    __buttonClicked(e) {
        this.clickHandler(e);
    }

    isFullScreenActive(isFS) {
        if (isFS === true) {
            this.icon.classList.remove("gg-maximize");
            this.icon.classList.add("gg-minimize");
        } else {
            this.icon.classList.remove("gg-minimize");
            this.icon.classList.add("gg-maximize");
        }
    }

    __getStyle() {
        const style = document.createElement("style");

        style.textContent = `
        
            .fs-button-container {
                background: lightgray;
                border-radius: 5px;
                cursor: pointer;
                width: 35px;
                height: 35px;
                display:flex;
            }

            .fs-button-container:focus,
            .fs-button-container:hover {
                background: darkgray;
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

        `;

        return style;
    }



}

customElements.define('x-full-screen-button', XFullScreenButton);
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
        this.maxLength = 100; //Max lenghts represents the video duration in seconds. Default value: 100s
        this.currentLength = 0;
        this.currentProgress = 0;
        this.progressBarChanged = null;
        let shadow = this.attachShadow({mode: 'open'});

        this.__setupEventsListeners();
        const bar = this.htmlManager.createElement("div", ["progress-bar"]);
        shadow.appendChild(this.getStyle());
        shadow.appendChild(bar);
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

    convertLengthToProgress(length) {
        return Math.round((parseFloat(length) / parseFloat(this.maxLength)) * 100); 
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
        this.oldIsVisible = false;
        this.hoverHandler = null;
        this.clickHandler = null;
        this.leaveHandler = null;

        this.tagCircleContainer = this.htmlManager.createElement("div", ["tag-circle-container"]);
        this.anchor = this.htmlManager.createElement("a", ["tag-anchor"]);
        this.aspectRatioDiv = this.htmlManager.createElement("div", ["aspect-ratio-div"]);

        this.shadowRoot.appendChild(this.tagCircleContainer);
        this.shadowRoot.appendChild(this.anchor);
        this.shadowRoot.appendChild(this.aspectRatioDiv);
        this.shadowRoot.appendChild(this.getStyle());
        this.__setupEventListeners(this);
    }

    set hexColor(newValue) {
        const anchor = this.shadowRoot.querySelector(".tag-anchor");
        const tagCircleContainer = this.shadowRoot.querySelector(".tag-circle-container");
        const rgba = this.htmlManager.hexToRGBA(newValue, 0.5);
        anchor.style.background = newValue;
        tagCircleContainer.style.background = rgba;
    }

    get hexColor() {return this.hexColor;}

    set position(newValue) {
        this.style.top = newValue.x + "%";
        this.style.left = newValue.y + "%";
        this.style.transform = "translate(-50%, -50%)";
    }

    set isVisible(newValue) {
        if (this.oldIsVisible === newValue) return;
        if (newValue === true) {
            this.__animateAppear();
        } else if (newValue === false) {
            this.__animateDisppear();
        }
        this.oldIsVisible = newValue;
    }

    __setupEventListeners(element) {
        element.addEventListener('click', this.__onClick.bind(this));
        element.addEventListener('mouseenter', this.__onHover.bind(this));
        element.addEventListener('mouseleave', this.__onMouseLeave.bind(this));
    }

    __onClick(event) {
        this.clickHandler(event);
    }

    __onHover(event) {
        this.__animateFocusScale();
        this.hoverHandler(event);
    }

    __onMouseLeave(event) {
        this.__animateDefaultScale();
        this.leaveHandler(event);
    }
    
    __animateDefaultScale() {
        this.anchor.classList.add("defaultScale");
        this.anchor.classList.remove("focusScale");
        this.anchor.classList.remove("appear");
    }

    __animateFocusScale() {
        this.anchor.classList.add("focusScale");
        this.anchor.classList.remove("defaultScale");
        this.anchor.classList.remove("appear");
    }

    __animateAppear() {
        this.style.visibility = "visible";
        this.anchor.classList.remove("disappear");
        this.tagCircleContainer.classList.remove("effectDissapear");
        this.anchor.classList.add("appear");
        this.tagCircleContainer.classList.add("effectAppear");
    }

    __animateDisppear() {

        const thisReference = this;
        const timer = setInterval(() => {
            thisReference.style.visibility = "hidden";
            clearTimeout(timer);
        }, 350);

        this.anchor.classList.remove("appear");
        this.tagCircleContainer.classList.remove("effectAppear");
        this.anchor.classList.add("disappear");
        this.tagCircleContainer.classList.add("effectDissapear");
    }

    getStyle() {

        let style = document.createElement("style");
        style.textContent = `

            .aspect-ratio-div {
                margin-top: 100%;
            }

            .tag-circle-container {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                opacity: 0;

                -webkit-transition: opacity 0.3s;
                -moz-transition: opacity 0.3s;
                -ms-transition: opacity 0.3s;
                -o-transition: opacity 0.3s;
                transition: opacity 0.3s;

                -webkit-animation: crescendo 1.5s alternate infinite ease-in;
                -moz-animation: crescendo 1.5s alternate infinite ease-in;
                -ms-animation: crescendo 1.5s alternate infinite ease-in;
                -o-animation: crescendo 1.5s alternate infinite ease-in;
                animation: crescendo 1.5s alternate infinite ease-in;

            }

            .tag-circle-container.effectAppear {
                opacity: 1;
            }

            .tag-circle-container.effectDissapear {
                opacity: 0;
            }


            @keyframes crescendo {
                0% {transform: scale(1);}
                100% {transform: scale(1.5);}
            }

            .tag-anchor {
                display:block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                cursor: pointer;
                transform: scale(0);
                -webkit-transition: transform 0.3s;
                -moz-transition: transform 0.3s;
                -ms-transition: transform 0.3s;
                -o-transition: transform 0.3s;
                transition: transform 0.3s;
            }

            .tag-anchor.defaultScale {
                transform: scale(1);
            }

            .tag-anchor.focusScale {
                transform: scale(1.5);
            }

            .tag-anchor.disappear {
                transform: scale(0);
            }

            .tag-anchor.appear {
                transform: scale(1);
            }
        `;

        return style;

    }



}

customElements.define('x-tag-button', XTagButton);
class XTimeCounter extends HTMLElement {

    constructor() {
        super();
        //Time in seconds
        this.attachShadow({mode: 'open'});
        this.htmlManager = new HTMLManager();
        this.currentTime = 0;
        
        const timeTextElement = this.htmlManager.createElement('p', ['time-text-element']);
        timeTextElement.textContent = "00:00";
        this.shadowRoot.appendChild(timeTextElement);
        this.shadowRoot.appendChild(this.__getStyle())
    }

    set currentTime(newValue) {
        let timeTextElement = this.shadowRoot.querySelector(".time-text-element");
        if (timeTextElement == null) return;
        const hours = Math.floor(newValue / 3600).toString().padStart(2, "0");
        const min = Math.floor((newValue - (hours * 3600)) / 60).toString().padStart(2, "0");
        const sec = Math.floor(newValue - (hours * 3600) - (min * 60)).toString().padStart(2, "0");
        let text = hours <= 0 ? "" : hours + ":";
        text += min + ":" + sec;
        timeTextElement.textContent = text;
    }

    incrementTime() {
        this.currentTime = this.currentTime + 1;
    }

    __getStyle() {
        const style = document.createElement('style');
        style.textContent = `
            .time-text-element {
                color: white;
                margin: 0;
            }
        `;
        return style;
    }
}

customElements.define('x-time-counter', XTimeCounter);
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
class BottomBarController {

    constructor (hypervideoController, containerID, tags) {
        this.hypervideoController = hypervideoController;
        this.htmlManager = new HTMLManager();
        this.containerID = containerID;
        this.tags = tags;
    }

    addBottomBar(container) {
        const bottomController = this.htmlManager.createElement("div",["bottom-controller"]);
        container.appendChild(bottomController);
        this.playButton = this.createControlButton("control-play-button", "gg-play-button", this.playButtonClicked);
        this.replayButton = this.createControlButton("control-repeat-button", "gg-repeat", this.restartVideo);
        this.fullScreenButton = this.createControlButton( "control-full-screen-button", "gg-maximize", this.toggleFullScreen);
        this.timeCounter = this.createTimeCounter();
        this.progressBar = this.createProgressBar();
        this.volumeBar = this.createVolumeBar();
        bottomController.appendChild(this.playButton);
        bottomController.appendChild(this.replayButton);
        bottomController.appendChild(this.fullScreenButton);
        bottomController.appendChild(this.timeCounter);
        bottomController.appendChild(this.progressBar);
        bottomController.appendChild(this.volumeBar);
    }

    videoStateChanged(state, target) {
        switch (state) {
            case ContainerManager.PLAYING:
                this.changeButtonIcon("control-play-button", "gg-play-pause");
                break;
            case ContainerManager.PAUSED:
                this.changeButtonIcon("control-play-button", "gg-play-button");
                break;
            case ContainerManager.LOADED:
                this.volumeBar.setVolume(50);
                this.videoLength = target.duration;
                this.progressBar.setMaxLength(target.duration);
                this.__setProgressBarTimestamps();
                break;
            case ContainerManager.ENTER_FULL_SCREEN:
                this.changeButtonIcon("control-full-screen-button", "gg-minimize");
                break;
            case ContainerManager.EXIT_FULL_SCREEN:
                this.changeButtonIcon("control-full-screen-button", "gg-maximize");
                break;
            default:
        }
    }

    videoTimeChange(time) {
        this.progressBar.setCurrentLength(time);
        this.timeCounter.currentTime = time;
    }

    restartVideo() {
        this.progressBar.setCurrentLength(0);
        this.hypervideoController.restartVideo();
    }

    toggleFullScreen() {
        this.hypervideoController.toggleFullScreen();
    }

    playButtonClicked() {
        this.hypervideoController.play();
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

    createTimeCounter() {
        const timeCounter = this.htmlManager.createElement("x-time-counter", ["time-counter"]);
        return timeCounter;
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
        this.hypervideoController.loadVideoProgress(progress);
    }

    __setProgressBarTimestamps() {
        for (let t of this.tags) {
            const timestamp = t.timeConfig.timestamp;
            this.progressBar.addMarkerAt(timestamp);
        }
    }

    createVolumeBar() {
        const volumeBar = this.htmlManager.createElement("x-volume-bar", ["volume-bar"]);
        volumeBar.volumeChanged = this.__volumeChanged.bind(this);
        return volumeBar;
    }

    __volumeChanged(volume) {
        this.hypervideoController.setVolume(volume/100);
    }

}
class HyperimageController {

    constructor(imageSRC, containerID, tags){
        this.containerID = containerID;
        this.imageSRC = imageSRC;
        this.tags = tags;
        this.htmlManager = new HTMLManager(); 
        this.tagController = new TagsController(this.containerID, this.containerID + "-elements", null);
        this.containerManager = new ContainerManager(this.containerID);
        this.containerManager.videoStateChanged = this.__videoStateChanged.bind(this);
    }

    __videoStateChanged(state, target) {
        switch (state) {
            case ContainerManager.ENTER_FULL_SCREEN:
                this.__fullScreenStateChanged(true);
            break;
            case ContainerManager.EXIT_FULL_SCREEN:
                this.__fullScreenStateChanged(false);
            break;
            default:
        }
    }

    __fullScreenStateChanged (isFullScreen) {
        if (this.tagController != null) {
            this.tagController.fullScreenStateChanged(isFullScreen);
        }
        if (this.fullScreenButton != null) {
            this.fullScreenButton.isFullScreenActive(isFullScreen);
        }
    }

    __imgLoaded() {
        this.__addTags();
    }

    createSkeleton() {
        const hypervideo = document.getElementById(this.containerID);
        const container = this.htmlManager.createElement("div", ["hypervideo-container"]);

        hypervideo.appendChild(container);

        this.__addImageElement(container);
        this.__addFullScreenButton(container);
        this.tagController.addTagContainer(container);
        this.__addElementsContainer();
    }

    __addFullScreenButton(container) {
        this.fullScreenButton = document.createElement("x-full-screen-button");
        const thisReference = this;
        this.fullScreenButton.clickHandler = () => {
            thisReference.containerManager.toggleFullScreen();
        };
        container.appendChild(this.fullScreenButton);
    }

    __addImageElement(container) {
        const img = document.createElement("img");
        img.classList.add("hyperimage");
        img.src = this.imageSRC;
        container.appendChild(img);
        img.addEventListener('load', this.__imgLoaded.bind(this));
    }

    __addTags() {
        this.tagController.addTags(this.tags, false);
        for (const tag of this.tags) {
            this.tagController.setTagVisible(tag.id, true);
        }
    }

    __addElementsContainer() {
        const elementsContainer = document.createElement("div");
        elementsContainer.id = this.containerID + "-elements";

        elementsContainer.style.display = "none";
        elementsContainer.style.position = "fixed";
        elementsContainer.style.width = "100%";
        elementsContainer.style.height = "100%";
        elementsContainer.style.background = "rgba(0,0,0,0.5)";
        elementsContainer.style.top = "0px";
        elementsContainer.style.left = "0px";
        elementsContainer.style.pointerEvents = "all";
        elementsContainer.addEventListener('click', (event) => {
            if (elementsContainer !== event.target) {return;}
            elementsContainer.style.display = "none";
        });

        document.body.appendChild(elementsContainer);
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
    static IMAGE_TYPE = "IMAGE";

    isDOMLoaded() {
        return document != null && (document.readyState === "interactive" || document.readyState === "complete");
    }

    setupHypervideo(tagsJSON) {

        this.__addGlobalStyle();
        
        const container = document.getElementById(this.containerID);
        container.appendChild(this.getStyle());

        if (!this.isDOMLoaded()) {
            //TODO: AVISAR DE L'ERROR, PER ARA DEIXO UN CONSOLE LOG
            throw "Error: Can't setup an hypervideo if DOM is not loaded."
        }

        this.tags = this.__tagsJSONToObject(tagsJSON);

        if (this.videoType === Hypervideo.IMAGE_TYPE) {
            const hyperImageController = new HyperimageController(this.videoURL, this.containerID, this.tags);
            hyperImageController.createSkeleton();
        } else {
            const videoManagerFactory = new VideoManagerFactory();
            const videoManager = videoManagerFactory.create(this.videoType, this.containerID);
    
            const hypervideoController = new HypervideoController(this.videoURL, this.videoType, this.containerID, videoManager, this.tags);
            hypervideoController.createSkeleton();
        }

    }

    __tagsJSONToObject(tagsJSON) {
        try {
            let tagsConfig = JSON.parse(tagsJSON).tags;
            let i = 0;
            tagsConfig = tagsConfig.map((t) => {
                t.id = this.containerID + "-tag-" + i++;
                return t;
            })
            return tagsConfig;
        } catch(error) {
            throw "Error: Not valid JSON";
        }
    }

    __addGlobalStyle() {
        let style = document.createElement('style');
        style.textContent = `
            .hypervideo:-moz-full-screen {
                width: 100%;
                height: 100%;
            }
            
            .hypervideo:-webkit-full-screen {
                width: 100%;
                height: 100%;
            }
            
            .hypervideo:fullscreen {
                width: 100%;
                height: 100%;
            }
        `;

        document.querySelector("head").appendChild(style);
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

        .hyperimage {
            width: 100%;
            height: 100%;
            object-fit: contain;
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

        .hypervideo-container-fullscreen {

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

        return style;
    }
    

}
class HypervideoController {

    constructor(videoSRC, videoType, containerID, videoManager, tags){
        this.videoLength = null;
        this.containerID = containerID;
        this.videoSRC = videoSRC;
        this.videoManager = videoManager;
        this.videoType = videoType;
        this.tags = tags;
        this.htmlManager = new HTMLManager(); 
        this.videoManager.videoStateChanged = this.__videoStateChanged.bind(this);
        this.bottomBarController = new BottomBarController(this, containerID, tags);
        this.tagController = new TagsController(this.containerID, this.containerID + "-elements",videoManager);
    }

    __videoStateChanged(state, target) {
        const pauseScreen = document.getElementById(this.containerID).querySelector("x-pause-screen");
        switch (state) {
            case ContainerManager.PLAYING:
                pauseScreen.hide();
                break;
            case ContainerManager.PAUSED:
                pauseScreen.show();
                break;
            case ContainerManager.LOADED:
                this.videoManager.setVolume(0.5);
                this.videoLength = target.duration;
                this.__addVideoTimeObserver();
                this.__addTags();
                break;
            case ContainerManager.ENTER_FULL_SCREEN:
            case ContainerManager.EXIT_FULL_SCREEN:
                if (this.tagController != null) {
                    this.tagController.fullScreenStateChanged(state === ContainerManager.ENTER_FULL_SCREEN);
                }
            break;
            default:
        }

        this.bottomBarController.videoStateChanged(state, target);
    }

    restartVideo() {
        this.videoManager.restartVideo();
    }

    toggleFullScreen() {
        this.videoManager.toggleFullScreen();
    }

    setVolume(volume) {
        this.videoManager.setVolume(volume);
    }

    loadVideoProgress(progress) {
        this.videoManager.loadProgress(progress);
    }

    play() {
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

        hypervideo.appendChild(container);

        this.addVideoElement(container);
        if (this.videoType != Hypervideo.YOUTUBE_TYPE) {
            this.addTopBarControlls(container);
        }
        this.__addPauseScreen(container);
        this.tagController.addTagContainer(container);
        this.bottomBarController.addBottomBar(container);
        this.__addElementsContainer();
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
        this.videoManager.addYoutubeScript(this.videoElementID, this.videoSRC);
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

    __addVideoTimeObserver() {
        const thisReference = this;
        const observer = new Observer((time) => {
            thisReference.bottomBarController.videoTimeChange(time);
            thisReference.__manageTags(time);
        });
        this.videoManager.addObserver(observer);
    }

    __addTags() {
        this.tagController.addTags(this.tags, false);
    }

    __manageTags(time) {
        for (const tag of this.tags) {
            const tagTimestamp = tag.timeConfig.timestamp;
            const tagDuration = tag.timeConfig.duration;
            const isVisible = time >= tagTimestamp && time < tagTimestamp + tagDuration;
            this.tagController.setTagVisible(tag.id, isVisible);
        }
    }

    __addElementsContainer() {
        const elementsContainer = document.createElement("div");
        elementsContainer.id = this.containerID + "-elements";

        elementsContainer.style.display = "none";
        elementsContainer.style.position = "fixed";
        elementsContainer.style.width = "100%";
        elementsContainer.style.height = "100%";
        elementsContainer.style.background = "rgba(0,0,0,0.5)";
        elementsContainer.style.top = "0px";
        elementsContainer.style.left = "0px";
        elementsContainer.style.pointerEvents = "all";
        elementsContainer.addEventListener('click', (event) => {
            if (elementsContainer !== event.target) {return;}
            elementsContainer.style.display = "none";
        });

        document.body.appendChild(elementsContainer);
    }

}

class TagsController {

    constructor(containerID, elementsContainerID, videoManager) {
        this.containerID = containerID;
        this.elementsContainerID = elementsContainerID;
        this.videoManager = videoManager;
        this.htmlManager = new HTMLManager();
        this.plugins = [];
    }

    addTagContainer(container) {
        this.tagsContainer = this.htmlManager.createElement("div", ["tags-container"]);
        container.appendChild(this.tagsContainer);
    }

    addTags(tags, isVisible) {
        this.tags = tags;
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

    __moveElementsContainer(parent) {
        const elementsContainer = document.getElementById(this.elementsContainerID);
        parent.appendChild(elementsContainer);
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
        classInstance.onLoad(plugin.config, this.tagsContainer, this.elementsContainerID, this.videoManager);
        this.plugins[tagID] = classInstance;
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
        tagElement.leaveHandler = this.__onLeaveTag.bind(this);
    }
}