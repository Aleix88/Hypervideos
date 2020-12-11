class VideoTimer {

    constructor (timeHandler) {
        this.loopCounter = 0;
        this.timeHandler = timeHandler;
    }
    
    static get LOOP_TIME() {
        return 100;
    }

    play() {
        this.timer = setInterval(this.__handleTime.bind(this), VideoTimer.LOOP_TIME);
    }

    pause() {
        clearInterval(this.timer);
    }

    loadOffset(offset) {
        this.loopCounter = parseInt(offset/ VideoTimer.LOOP_TIME);
    }

    __handleTime() {
        this.loopCounter++;
        if (this.loopCounter >= 10) {
            this.timeHandler();
            this.loopCounter = 0;
        }
    }

}