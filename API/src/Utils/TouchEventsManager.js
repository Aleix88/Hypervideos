class TouchEventsManager {

    constructor() {
        this.htmlManager = new HTMLManager();
    }

    static IS_TOUCH_EVENT = 0;
    static IS_CLICK_EVENT = 1;

    touchStart(element, handler) {
        const touchType = this.htmlManager.isDesktopBrowser() === true ? 'mousedown' : 'touchstart';
        const eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;
        element.addEventListener(touchType, (e)=>{
            handler(eventType, e);
        });
    }

    touchEnd(element, handler) {
        const touchType = this.htmlManager.isDesktopBrowser() === true ? 'mouseup' : 'touchend';
        const eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;

        element.addEventListener(touchType, (e)=>{
            handler(eventType, e);
        });
    }

    touchLeave(element, handler) {
        const touchType = this.htmlManager.isDesktopBrowser() === true ? 'mouseleave' : 'touchcancel';
        const eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;

        element.addEventListener(touchType, (e)=>{
            handler(eventType, e);
        });
    }

    touchMove(element, handler) {
        const touchType = this.htmlManager.isDesktopBrowser() === true ? 'mousemove' : 'touchmove';
        const eventType = this.htmlManager.isDesktopBrowser() === true ? TouchEventsManager.IS_CLICK_EVENT : TouchEventsManager.IS_TOUCH_EVENT;

        element.addEventListener(touchType, (e)=>{
            handler(eventType, e);
        });
    }

}