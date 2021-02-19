class Plugin {

    constructor() {}

    onLoad(config, container, elementsContainer, videoManager) {
        this.config = config;
        this.container = container;
        this.elementsContainer = elementsContainer;
        this.videoManager = videoManager;
        this.__firstClick = false;
    }

    onTagClick(event) {
        const thisReference = this;
        if (this.__firstClick === false) {
            this.elementsContainer.addEventListener('click', (event) => {
                if (thisReference.elementsContainer !== event.target) {return;}
                thisReference.hideElementsContainer();
            });
            this.__firstClick = true;
        }
    }

    onTagHover(event) {
    }

    onTagLeave(event) {
    }

    fullScreenStateChanged(isFullScreen) {
    }

    showElementsContainer() {
        this.elementsContainer.parentElement.style.display = "block";
        this.elementsContainer.style.display = "block";
    }

    hideElementsContainer() {
        this.elementsContainer.parentElement.style.display = "none";
        this.elementsContainer.style.display = "none";
    }

}
class VideoTimer {

    constructor (timeHandler) {
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

    __handleTime() {
        this.timeHandler();
    }

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
class MediaManager extends Subject {

    constructor(containerID) {
        super();
        this.containerID = containerID;
        this.mediaStateChanged = null;
        this.isFullScreen = false;

        this.__fullScreenEventListeners();
    }

    static PLAYING = 0;
    static PAUSED = 1;
    static LOADED = 2;
    static ENTER_FULL_SCREEN = 3;
    static EXIT_FULL_SCREEN = 4;

    __fullScreenEventListeners() {
        document.addEventListener('fullscreenchange', this._fullScreenChangeHandler.bind(this), false);
        document.addEventListener('mozfullscreenchange', this._fullScreenChangeHandler.bind(this), false);
        document.addEventListener('MSFullscreenChange', this._fullScreenChangeHandler.bind(this), false);
        document.addEventListener('webkitfullscreenchange', this._fullScreenChangeHandler.bind(this), false);
    }

    _fullScreenChangeHandler(event) {
        if (event.target.id !== this.containerID) {return;}
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.isFullScreen = false;
            this.mediaStateChanged(MediaManager.EXIT_FULL_SCREEN);
        } else {
            this.isFullScreen = true;
            this.mediaStateChanged(MediaManager.ENTER_FULL_SCREEN);
        }
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
class VideoTagManager extends MediaManager {

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

    getVideoDuration() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        return video.duration;
    }


    
    //0-1
    loadProgress(progress) {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.currentTime = video.duration * progress;
        this.notify(video.currentTime * 1000);
    }

    setupVideo() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.addEventListener('pause', this.__videoIsPaused.bind(this));
        video.addEventListener('play', this.__videoIsPlaying.bind(this));
        video.addEventListener('loadeddata', this.__videoLoaded.bind(this));
    }

    __videoIsPlaying() {
        this.mediaStateChanged(MediaManager.PLAYING);
        this.videoTimer.play();
    }

    __videoIsPaused() {
        this.mediaStateChanged(MediaManager.PAUSED);
        this.videoTimer.pause();
    }

    __videoLoaded() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        this.mediaStateChanged(MediaManager.LOADED, {duration: video.duration});
    }

    __timeHandler() {
        const video = document.getElementById(this.containerID).querySelector("video"); 
        this.notify(video.currentTime * 1000);
    }

    //0-1
    setVolume(volume) {
        volume = volume > 1 ? 1 : volume;
        volume = volume < 0 ? 0 : volume;
        const video = document.getElementById(this.containerID).querySelector("video"); 
        video.volume = volume;
    }

}
class YoutubeVideoManager extends MediaManager {

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
        if (this.player === null) {return;}
        return this.player.getPlayerState() == YT.PlayerState.PLAYING;
    }

    get currentTime() {
        if (this.player === null) {return;}
        return this.player.getCurrentTime();
    }

    //0-1
    loadProgress(progress) {
        if (this.player === null) {return;}
        const videoDuration = this.player.getDuration();
        this.__loadTime(videoDuration * progress);
    }

    __loadTime(seconds) {
        if (this.player === null) {return;}
        this.player.seekTo(seconds, true);
        const currentTime = this.player.getCurrentTime();
        this.notify(seconds * 1000);
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

    getVideoDuration() {
        return this.player.getDuration();
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
                'playsinline': 1,
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
        this.mediaStateChanged(MediaManager.LOADED, {duration: this.player.getDuration()});
    }
    __onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            if (this.firstTimePlaying === true && this.player.getCurrentTime() >= 0.1) {
                this.__loadTime(0);
            }
            this.mediaStateChanged(MediaManager.PLAYING);
            this.videoTimer.play();
            this.firstTimePlaying = false;
        } else if (event.data == YT.PlayerState.PAUSED) {
            this.mediaStateChanged(MediaManager.PAUSED);
            this.videoTimer.pause();
        }
    }
     
    __timeHandler() {
        this.notify(this.player.getCurrentTime() * 1000);
    }
}

class HTMLManager {

    constructor(){}

    createElement(type, config) {
        const element = document.createElement(type);
        if (config == null) {return element;}
        if (config["classList"] != null && Array.isArray(config.classList) && config.classList.length > 0) {
            config.classList.forEach(c => {
                element.classList.add(c);
            });
        }

        if (config["id"] != null) {
            element.id = config.id;
        }

        if (config["src"] != null) {
            element.src = config.src;
        }

        if (config["href"] != null) {
            element.href = config.href;
        }

        if (config["textContent"] != null) {
            element.textContent = config.textContent;
        }

        if (config["style"] != null) {
            for (const k of Object.keys(config.style)) {
                if (element.style[k] !== undefined) {
                    element.style[k] = config.style[k];
                }
            }
        }

        return element;
    }

    hexToRGBA(hexColor, alpha) {
        let r = parseInt(hexColor.slice(1,3), 16);
        let g = parseInt(hexColor.slice(3,5), 16);
        let b = parseInt(hexColor.slice(5,7), 16);
        r = isNaN(r) ? 255 : r;
        if (hexColor.length <= 4) {
            g = r;
            b = r;
        }

        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

    isDesktopBrowser() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return !check;
    }

}
class TouchEventsManager {

    constructor() {
        this.htmlManager = new HTMLManager();
    }

    static IS_TOUCH_EVENT = 0;
    static IS_CLICK_EVENT = 1;

    touchStart(element, handler) {
        const touchType = this.htmlManager.isDesktopBrowser() === true ? 'mousedown' : 'touchstart';
        const eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;
        element.addEventListener(touchType, (e)=>{
            handler(eventType, e);
        });
    }

    touchEnd(element, handler) {
        const touchType = this.htmlManager.isDesktopBrowser() === true ? 'mouseup' : 'touchend';
        const eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;

        element.addEventListener(touchType, (e)=>{
            handler(eventType, e);
        });
    }

    touchLeave(element, handler) {
        const touchType = this.htmlManager.isDesktopBrowser() === true ? 'mouseleave' : 'touchcancel';
        const eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;

        element.addEventListener(touchType, (e)=>{
            handler(eventType, e);
        });
    }

    touchMove(element, handler) {
        const touchType = this.htmlManager.isDesktopBrowser() === true ? 'mousemove' : 'touchmove';
        const eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;

        element.addEventListener(touchType, (e)=>{
            handler(eventType, e);
        });
    }

}
class ControlButton {

    constructor(containerID) {
        this.htmlManager = new HTMLManager();
        this.containerID = containerID;
    }
    
    createControlButton(buttonClass, buttonIcon, eventHandler) {
        const buttonContainer = this.htmlManager.createElement("div", {
            classList: ["control-button-container"]
        });
        const button = this.htmlManager.createElement("button", {
             classList: ["control-button",buttonClass]
        });
        const icon = this.htmlManager.createElement("i", {
            classList: [buttonIcon]
        });
        buttonContainer.appendChild(button);
        button.appendChild(icon);
        if (eventHandler !== null && eventHandler !== undefined) {
            buttonContainer.addEventListener("click", eventHandler);
        }
        return buttonContainer;
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

}
class XFullScreenButton extends HTMLElement {
    
    constructor() {
        super();
        this.clickHandler = null;
        this.htmlManager = new HTMLManager();
        let shadow = this.attachShadow({mode: 'open'});
        const button = this.__createButton();
        shadow.append(button);
        shadow.appendChild(this.__getStyle());
    }

    __createButton() {
        const buttonContainer = this.htmlManager.createElement("div", {classList: ["fs-button-container"]});
        buttonContainer.addEventListener('click', this.__buttonClicked.bind(this));
        this.icon = this.htmlManager.createElement("i", {classList: ["gg-maximize"]});
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
        this.clickHandler = null;

        let shadow = this.attachShadow({mode: 'open'});
        const container = this.htmlManager.createElement('div', {classList: ["pause-container"]});
        container.addEventListener('click', this.__onClick.bind(this));
        shadow.appendChild(container);
        shadow.appendChild(this.__getStyle());
    }

    __onClick() {
        this.clickHandler();
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
        const bar = this.htmlManager.createElement("div", {classList: ["progress-bar"]});
        shadow.appendChild(this.__getStyle());
        shadow.appendChild(bar);
    }

    addMarkerAt(length) {
        const marker = this.htmlManager.createElement("div", {classList: ["progress-bar-marker"]});
        const progress = this.__convertLengthToProgress(length);
        this.shadowRoot.appendChild(marker);
        marker.style.left = progress + "%";
    }

    __setupEventsListeners() {
        const eventsManager = new TouchEventsManager();
        eventsManager.touchStart(this, this.__mouseDown.bind(this));
        eventsManager.touchEnd(document, this.__mouseUp.bind(this));
        eventsManager.touchLeave(document, this.__mouseLeave.bind(this));
        eventsManager.touchMove(document, this.__mouseMoving.bind(this));
    }
    
    __recalculatePosition(clientX) {
        const rect = this.getBoundingClientRect();
        const posX = clientX - rect.left;
        let progress = posX / rect.width;
        progress = progress > 1 ? 1 : progress;
        progress = progress < 0 ? 0 : progress;
        this.setCurrentLength(progress * this.maxLength);
    }

    __mouseLeave(type, event) {
        if (!this.isMoving) {return;}
        this.isMoving = false;
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.changedTouches[0].clientX : event.clientX;
        this.__recalculatePosition(clientX);
        this.progressBarChanged(this.currentProgress);
    }

    __mouseUp(type, event) {
        if (!this.isMoving) {return;}
        this.isMoving = false;
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.changedTouches[0].clientX : event.clientX;
        this.__recalculatePosition(clientX);
        this.progressBarChanged(this.currentProgress);
    }

    __mouseMoving(type, event) {
        if (!this.isMoving) {return;}
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;
        this.__recalculatePosition(clientX);
    }

    __mouseDown(type, event) {
        this.isMoving = true;
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;
        this.__recalculatePosition(clientX);
    }

    __convertLengthToProgress(length) {
        return Math.round((parseFloat(length) / parseFloat(this.maxLength)) * 100); 
    }

    setCurrentLength(length) {
        this.currentLength = length;
        this.currentLength = this.currentLength > this.maxLength ? this.maxLength : this.currentLength;
        this.currentLength = this.currentLength < 0 ? 0 : this.currentLength;
        const progressBar = this.shadowRoot.querySelector(".progress-bar");
        const progress = this.__convertLengthToProgress(length);
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

    __getStyle() {
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

        this.tagCircleContainer = this.htmlManager.createElement("div", {classList: ["tag-circle-container"]});
        this.anchor = this.htmlManager.createElement("a", {classList: ["tag-anchor"]});
        this.aspectRatioDiv = this.htmlManager.createElement("div", {classList: ["aspect-ratio-div"]});

        this.shadowRoot.appendChild(this.tagCircleContainer);
        this.shadowRoot.appendChild(this.anchor);
        this.shadowRoot.appendChild(this.aspectRatioDiv);
        this.shadowRoot.appendChild(this.__getStyle());
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
        this.style.top = newValue.y + "%";
        this.style.left = newValue.x + "%";
        this.style.transform = "translate(-50%, -50%)";
    }

    set isVisible(newValue) {
        if (this.oldIsVisible === newValue) return;
        if (newValue === true) {
            this.__animateAppear();
        } else if (newValue === false) {
            this.__animateDisappear();
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

    __animateDisappear() {

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

    __getStyle() {

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
        
        const timeTextElement = this.htmlManager.createElement('p', {
            classList: ['time-text-element'],
            textContent: "00:00"
        });
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
        
        const container = this.htmlManager.createElement("div", {classList: ["volume-bar-container"]});
        const volumeButton = this.__createVolumeButton();
        const volumeBar = this.htmlManager.createElement("div", {classList: ["volume-bar-rect"]});
        const volumeLevelBar = this.htmlManager.createElement("div", {classList: ["volume-bar-level"]});

        container.appendChild(volumeButton);
        container.appendChild(volumeBar);
        volumeBar.appendChild(volumeLevelBar);
        shadow.appendChild(container);
        shadow.appendChild(this.__getStyle());

        this.__setupEventsListeners(volumeBar, container);

    }

    __createVolumeButton() {
        const buttonContainer = this.htmlManager.createElement("div", {classList:["volume-icon-container"]});
        const button = this.htmlManager.createElement("button", {classList:["volume-button"]});
        const icon = this.htmlManager.createElement("i", {classList:["gg-volume"]});
        buttonContainer.appendChild(button);
        button.appendChild(icon);
        return buttonContainer;
    }

    __setupEventsListeners(volumeBar,container) {
        const eventsManager = new TouchEventsManager();
        eventsManager.touchMove(document, this.__mouseMoving.bind(this));
        eventsManager.touchStart(volumeBar, this.__mouseDown.bind(this));
        eventsManager.touchLeave(container, this.__mouseLeaveElement.bind(this));
        eventsManager.touchEnd(document, this.__mouseUp.bind(this));
        eventsManager.touchLeave(document, this.__mouseLeaveDocument.bind(this));
        container.onmouseenter = this.__mouseEnter.bind(this);
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

    __mouseMoving(type, event) {
        if (!this.isVolMoving) {return;}
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;
        this.__calculateVolumePosition(clientX);
    }

    __mouseDown(type, event) {
        this.isVolMoving = true;
        const clientX = type === TouchEventsManager.IS_TOUCH_EVENT ? event.touches[0].clientX : event.clientX;
        this.__calculateVolumePosition(clientX);
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
        volume = volume > this.maxVolume ? this.maxVolume : volume;
        this.volume = volume;
        this.volumeChanged(volume);
        const volumeLevelBar = this.shadowRoot.querySelector(".volume-bar-level");
        volumeLevelBar.style.width = volume + "%";
    }

    __getStyle() {
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

    constructor (hypervideoController, containerID) {
        this.hypervideoController = hypervideoController;
        this.htmlManager = new HTMLManager();
        this.containerID = containerID;
        this.controlButton = new ControlButton(containerID);
    }

    addBottomBar(container) {
        const bottomController = this.htmlManager.createElement("div", {
            classList: ["bottom-controller"]
        });
        container.appendChild(bottomController);
        this.playButton = this.controlButton.createControlButton("control-play-button", "gg-play-button", this.__playButtonClicked.bind(this));
        this.replayButton = this.controlButton.createControlButton("control-repeat-button", "gg-repeat", this.__restartVideo.bind(this));
        this.timeCounter = this.__createTimeCounter();
        this.progressBar = this.__createProgressBar();
        this.volumeBar = this.__createVolumeBar();
        bottomController.appendChild(this.playButton);
        bottomController.appendChild(this.replayButton);
        if (this.htmlManager.isDesktopBrowser() === true) {
            this.fullScreenButton = this.controlButton.createControlButton( "control-full-screen-button", "gg-maximize", this.__toggleFullScreen.bind(this));
            bottomController.appendChild(this.fullScreenButton);
        }
        bottomController.appendChild(this.timeCounter);
        bottomController.appendChild(this.progressBar);
        bottomController.appendChild(this.volumeBar);
    }

    videoStateChanged(state, target) {
        switch (state) {
            case MediaManager.PLAYING:
                this.controlButton.changeButtonIcon("control-play-button", "gg-play-pause");
                break;
            case MediaManager.PAUSED:
                this.controlButton.changeButtonIcon("control-play-button", "gg-play-button");
                break;
            case MediaManager.LOADED:
                this.volumeBar.setVolume(50);
                this.videoLength = target.duration;
                this.progressBar.setMaxLength(target.duration * 1000);
                this.__setProgressBarTimestamps();
                break;
            case MediaManager.ENTER_FULL_SCREEN:
                this.controlButton.changeButtonIcon("control-full-screen-button", "gg-minimize");
                break;
            case MediaManager.EXIT_FULL_SCREEN:
                this.controlButton.changeButtonIcon("control-full-screen-button", "gg-maximize");
                break;
            default:
        }
    }

    videoTimeChange(time) {
        this.progressBar.setCurrentLength(time);
        this.timeCounter.currentTime = time/1000;
    }

    __restartVideo() {
        this.progressBar.setCurrentLength(0);
        this.hypervideoController.restartVideo();
    }

    __toggleFullScreen() {
        this.hypervideoController.toggleFullScreen();
    }

    __playButtonClicked() {
        this.hypervideoController.play();
    }

    __createTimeCounter() {
        const timeCounter = this.htmlManager.createElement("x-time-counter", {
            classList: ["time-counter"]
        });
        return timeCounter;
    }

    __createProgressBar() {
        const progressBar = this.htmlManager.createElement("x-progress-bar", {
            classList: ["progress-container"]
        });
        progressBar.progressBarChanged = this.__progressBarChanged.bind(this);
        if (this.videoLength !== null) {
            progressBar.setMaxLength(this.videoLength * 1000);
        }
        return progressBar;
    }

    __progressBarChanged(progress) {
        this.hypervideoController.loadVideoProgress(progress);
    }

    __setProgressBarTimestamps() {
        for (let t of this.tags) {
            const timestamp = t.timeConfig.timestamp;
            this.progressBar.addMarkerAt(timestamp * 1000);
        }
    }

    __createVolumeBar() {
        const volumeBar = this.htmlManager.createElement("x-volume-bar", {
            classList: ["volume-bar"]
        });
        volumeBar.volumeChanged = this.__volumeChanged.bind(this);
        return volumeBar;
    }

    __volumeChanged(volume) {
        this.hypervideoController.setVolume(volume/100);
    }

}
class HyperimageController {

    constructor(imageSRC, containerID, config, mediaManager){
        this.containerID = containerID;
        this.imageSRC = imageSRC;
        this.config = config;
        this.htmlManager = new HTMLManager(); 
        this.tagController = new TagsController(this.containerID, null);
        this.mediaManager = mediaManager;
        this.mediaManager.mediaStateChanged = this.__mediaStateChanged.bind(this);
    }

    __mediaStateChanged(state, target) {
        switch (state) {
            case MediaManager.ENTER_FULL_SCREEN:
                this.__fullScreenStateChanged(true);
            break;
            case MediaManager.EXIT_FULL_SCREEN:
                this.__fullScreenStateChanged(false);
            break;
            default:
        }
    }

    __fullScreenStateChanged (isFullScreen) {
        if (this.imageContainer != null) {
            if (isFullScreen === true) {
                const imageWidthMargin = window.innerWidth - this.config.size.width;
                const imageHeightMargin = window.innerHeight - this.config.size.height;
                const shouldWidthShrink = imageHeightMargin >= imageWidthMargin;

                this.imageElement.style.width = shouldWidthShrink ? "100%" : "auto";
                this.imageElement.style.height = !shouldWidthShrink ? "100%" : "auto";
                this.imageContainer.style.width = shouldWidthShrink ? "100%" : "fit-content";
                this.imageContainer.style.height = !shouldWidthShrink ? "100%" : "fit-content";
            } else {
                this.imageElement.style.width = "inherit";
                this.imageElement.style.height = "inherit";
                this.imageContainer.style.width = "inherit";
                this.imageContainer.style.height = "inherit";
            }
        }

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
        let hypervideo = document.getElementById(this.containerID);
        const isVideoWidder = this.config.size.width >= this.config.size.height;
        hypervideo.style.width = isVideoWidder ? this.config.size.width + "px" : Math.floor((this.config.size.height * HypervideoController.ASPECT_RATIO.x)/HypervideoController.ASPECT_RATIO.y) + "px";
        hypervideo.style.height = !isVideoWidder ? this.config.size.height + "px" : Math.floor((this.config.size.width * HypervideoController.ASPECT_RATIO.y)/HypervideoController.ASPECT_RATIO.x) + "px";
        const container = this.htmlManager.createElement("div", {
            classList: ["hypervideo-container"]
        });
        this.imageContainer = this.htmlManager.createElement("div", {
            classList: ["img-container"]
        });

        hypervideo.appendChild(container);

        container.appendChild(this.imageContainer);
        this.__addImageElement(this.imageContainer);
        this.tagController.addTagContainer(container);
        if (this.htmlManager.isDesktopBrowser() === true) {
            this.__addFullScreenButton(container);
        }
    }

    __addFullScreenButton(container) {
        this.fullScreenButton = this.htmlManager.createElement("x-full-screen-button");
        const thisReference = this;
        this.fullScreenButton.clickHandler = () => {
            thisReference.mediaManager.toggleFullScreen();
        };
        container.appendChild(this.fullScreenButton);
    }

    __addImageElement(container) {
        this.imageElement = this.htmlManager.createElement("img", {
            classList: ["hyperimage"],
            src: this.imageSRC
        });
        container.appendChild(this.imageElement);
        this.imageElement.addEventListener('load', this.__imgLoaded.bind(this));
    }

    __addTags() {
        this.tagController.addTags(this.config.tags, false);
        for (const tag of this.config.tags) {
            this.tagController.setTagVisible(tag.id, true);
        }
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
class HypervideoController {

    constructor(videoSRC, videoType, containerID, videoManager, config){
        this.videoLength = null;
        this.containerID = containerID;
        this.videoSRC = videoSRC;
        this.videoManager = videoManager;
        this.videoType = videoType;
        this.config = config;
        this.htmlManager = new HTMLManager(); 
        this.videoManager.mediaStateChanged = this.__videoStateChanged.bind(this);
        this.bottomBarController = new BottomBarController(this, containerID);
        this.topBarController = new TopBarController(this, containerID);
        this.tagController = new TagsController(this.containerID, videoManager);
    }

    static ASPECT_RATIO = {
        x: 16,
        y: 9
    };

    __videoStateChanged(state, target) {
        switch (state) {
            case MediaManager.LOADED:
                this.videoManager.setVolume(0.5);
                this.videoLength = target.duration;
                this.__filterTagsByDuration();
                this.bottomBarController.tags = this.config.tags;
                this.__addVideoTimeObserver();
                this.__addTags();
                break;
            case MediaManager.ENTER_FULL_SCREEN:
            case MediaManager.EXIT_FULL_SCREEN:
                if (this.tagController != null) {
                    this.tagController.fullScreenStateChanged(state === MediaManager.ENTER_FULL_SCREEN);
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

    createSkeleton() {
        const hypervideo = document.getElementById(this.containerID);
        const container = this.htmlManager.createElement("div", {classList: ["hypervideo-container"]});

        this.__maintainAspectRatio(hypervideo);
        hypervideo.appendChild(container);

        this.__addVideoElement(container);
        if (this.videoType != Hypervideo.YOUTUBE_TYPE) {
            this.topBarController.addTopBar(container, this.config.videoTitle);
        }
        this.__addPauseScreen(container);
        this.tagController.addTagContainer(container);
        this.bottomBarController.addBottomBar(container);
    }

    __maintainAspectRatio(hypervideo) {
        const isVideoWidder = this.config.size.width >= this.config.size.height;
        hypervideo.style.width = isVideoWidder ? this.config.size.width + "px" : Math.floor((this.config.size.height * HypervideoController.ASPECT_RATIO.x)/HypervideoController.ASPECT_RATIO.y) + "px";
        hypervideo.style.height = !isVideoWidder ? this.config.size.height + "px" : Math.floor((this.config.size.width * HypervideoController.ASPECT_RATIO.y)/HypervideoController.ASPECT_RATIO.x) + "px";
    }

    __filterTagsByDuration() {
        this.config.tags = this.config.tags.filter ((e) => {
            return e.timeConfig.timestamp <= this.videoManager.getVideoDuration();
        });
    }

    __addVideoTag(container) {
        this.videoElementID = "video-" + this.containerID;
        const video = this.htmlManager.createElement("video", { 
            id: this.videoElementID,
            src: this.videoSRC
        });
        video.setAttribute("webkit-playsinline", ""); //Block full screen on mobile
        video.setAttribute("playsinline", "");
        container.appendChild(video);
        this.videoManager.setupVideo();
    }

    __addVideoFromYotube(container) {
        this.videoElementID = "video-" + this.containerID;
        const youtubeFrameContainer = this.htmlManager.createElement("div", {
            classList: ["youtube-frame"],
            id: this.videoElementID
        });
        container.appendChild(youtubeFrameContainer);
        this.videoManager.addYoutubeScript(this.videoElementID, this.videoSRC);
    }

    __addVideoElement(container) {
        switch (this.videoType) {
            case Hypervideo.YOUTUBE_TYPE:
                this.__addVideoFromYotube(container);
                break;
            default:
                this.__addVideoTag(container);
                break;
        }
    }

    __addPauseScreen(container) {
        const pauseScreen = this.htmlManager.createElement("x-pause-screen");
        const thisReference = this;
        pauseScreen.clickHandler = (() => {
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
            thisReference.__manageTags(time/1000);
        });
        this.videoManager.addObserver(observer);
    }

    __addTags() {
        this.tagController.addTags(this.config.tags, false);
    }

    __manageTags(time) {
        for (const tag of this.config.tags) {
            const tagTimestamp = tag.timeConfig.timestamp;
            const tagDuration = tag.timeConfig.duration;
            const isVisible = time >= tagTimestamp && time < tagTimestamp + tagDuration;
            this.tagController.setTagVisible(tag.id, isVisible);
        }
    }

    

}

class TagsController {

    constructor(containerID, mediaManager) {
        this.containerID = containerID;
        this.mediaManager = mediaManager;
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
            this.__createPluginForTagIfNeeded(tag.id, plugin)
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

    __createPluginForTagIfNeeded(tagID, plugin) {
        if (this.plugins.hasOwnProperty(tagID) && this.plugins[tagID] != null) {return;} 
        if (plugin == null || Object.keys(plugin).length === 0) {
            this.plugins[tagID] = null;
            return;
        }
        const pluginName = plugin.name;
        const classInstance = eval(`new ${pluginName}()`);
        const tagElementsContainer = this.__createTagElementsContainer(tagID);
        classInstance.onLoad(plugin.config, this.tagsContainer, tagElementsContainer, this.mediaManager);
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
class TopBarController {

    constructor (hypervideoController, containerID) {
        this.hypervideoController = hypervideoController;
        this.htmlManager = new HTMLManager();
        this.containerID = containerID;
    }

    addTopBar(container, videoTitle) {
        const topContainer = this.htmlManager.createElement("div", {
            classList: ["top-controller"]
        });
        const titleHeader = this.htmlManager.createElement("h3", {
            classList: ["top-title"],
            textContent: videoTitle
        });

        topContainer.appendChild(titleHeader);
        container.appendChild(topContainer);
    }    
}
class MediaManagerFactory {

    create(hypervideoType, containerID) {
        switch(hypervideoType) {
            case Hypervideo.YOUTUBE_TYPE:
                return new YoutubeVideoManager(containerID);
            case Hypervideo.VIDEO_TYPE:
                return new VideoTagManager(containerID);    
            default:
                return new MediaManager(containerID);
        }
    }

}