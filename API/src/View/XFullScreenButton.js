class XFullScreenButton extends HTMLElement {
    
    constructor() {
        super();
        this.onclick = null;
        let shadow = this.attachShadow({mode: 'open'});
        const button = this.__createButton();
        shadow.append(button);
        shadow.appendChild(this.__getStyle());
    }

    __createButton() {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("fs-button-container");
        buttonContainer.addEventListener('click', this.__buttonClicked.bind(this));
        const icon = document.createElement("i");
        icon.classList.add("gg-maximize");
        buttonContainer.appendChild(icon);
        return buttonContainer;
    }

    __buttonClicked(e) {
        this.onclick(e);
    }

    __getStyle() {
        const style = document.createElement("style");

        style.textContent = `
        
            .fs-button-container {
                padding: 0.7em;
                background: lightgray;
                border-radius: 5px;
                cursor: pointer;
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