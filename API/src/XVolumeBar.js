class XVolumeBar extends HTMLElement {

    constructor() {
        super();
        this.htmlManager = new HTMLManager();
        this.maxVolume = 100;
        this.volume = 0;
        this.isVolMoving = false;
        this.foo = 0;
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

        this.__setupEventsListeners(volumeBar);

    }

    createVolumeButton() {
        const buttonContainer = this.htmlManager.createElement("div", ["volume-icon-container"]);
        const button = this.htmlManager.createElement("button", ["volume-button"]);
        const icon = this.htmlManager.createElement("i", ["gg-volume"]);
        buttonContainer.appendChild(button);
        button.appendChild(icon);
        return buttonContainer;
    }

    __setupEventsListeners(volumeBar) {
        volumeBar.onmousedown = this.__mouseDown.bind(this);
        volumeBar.onmousemove = (this.__mouseMoving.bind(this));
        volumeBar.onmouseup = (this.__mouseUp.bind(this));
        this.onmouseleave = (this.__mouseLeave.bind(this));
    }

    __mouseLeave() {
        this.isVolMoving = false;
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
        this.foo++;
        console.log(this.isVolMoving);
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
            
            .volume-bar-container:hover > .volume-bar-rect,
            .volume-bar-container:focus > .volume-bar-rect {
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