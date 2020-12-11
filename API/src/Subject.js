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