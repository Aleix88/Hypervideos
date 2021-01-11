class Observer {

    constructor(onChange) {
        this.onChange = onChange;
    }

    update(newValue) {
        this.onChange(newValue);
    }

}