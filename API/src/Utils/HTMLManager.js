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
        const r = parseInt(hexColor.slice(1,3), 16);
        const g = parseInt(hexColor.slice(3,5), 16);
        const b = parseInt(hexColor.slice(5,7), 16);

        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

}