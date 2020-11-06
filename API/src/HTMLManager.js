class HTMLManager {

    constructor(){}

    createElement(type, elementClass) {
        element = document.createElement(type);
        if (elementClass != null && elementClass != "") {
            element.classList.add(elementClass);
        }

        return element;
    }

}