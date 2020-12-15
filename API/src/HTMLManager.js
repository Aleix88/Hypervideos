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