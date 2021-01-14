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