class VideoTimer {

    constructor (timeHandler) {
        this.timeHandler = timeHandler;
        this.timer = null;
        this.isPlaying = false;
    }
    
    static get LOOP_TIME() {
        return 100;
    }

    play() {
        if (this.isPlaying === true) {return;} 
        this.timer = setInterval(this.__handleTime.bind(this), VideoTimer.LOOP_TIME);
        this.isPlaying = true;
    }

    pause() {
        clearInterval(this.timer);
        this.isPlaying = false;
    }

    __handleTime() {
        this.timeHandler();
    }

}