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