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

}