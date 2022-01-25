export default class Cursor {
    cursorElement = null;
    letterArray = null;
    cursorWidth = 0;
    cursorIndex = 0;

    constructor(letterArray, cursorElement) {
        this.cursorElement = cursorElement;
        this.cursorWidth = cursorElement.getBoundingClientRect().width;
        this.letterArray = letterArray;
    }

    updatePosition() {
        let letterRect = this.letterArray[this.cursorIndex].getBoundingClientRect();
        this.cursorElement.style.left = letterRect.left - 1.65 + "px";
        this.cursorElement.style.top  = letterRect.top + 5.5 + "px";
    }

    blink() {
        this.cursorElement.classList.add("blinking")
    }

    blinkOff() {
        this.cursorElement.classList.remove("blinking")
    }

    unhide() {
        this.cursorElement.classList.remove("hidden");
    }

    getIndex() {
        return this.cursorIndex;
    }
    
    incrementIndex() {
        this.cursorIndex++;
    }

    resetIndex() {
        this.cursorIndex = 0;
    }
}