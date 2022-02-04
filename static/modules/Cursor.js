export default class Cursor {
    constructor(letterArray) {
        this.cursorElement = document.getElementById('cursor');
        this.letterArray = letterArray;
        this.cursorIndex = 0;
    }

    updatePosition() {
        let letterRect = this.letterArray[this.cursorIndex].getBoundingClientRect();
        let newLeft = letterRect.left - 1.65;
        let newTop  = letterRect.top;
        let leftStr = this.cursorElement.style.left;
        let topStr = this.cursorElement.style.top;
        leftStr = leftStr.substring(0, leftStr.length - 2);
        topStr = topStr.substring(0, topStr.length - 2);
        let currLeft = parseFloat(leftStr);
        let currTop = parseFloat(topStr);

        this.cursorElement.style.transform = `translateX(${newLeft - currLeft}px) translateY(${newTop - currTop}px)`;
        window.requestAnimationFrame(() => {return;});
    }

    blink() {
        this.cursorElement.classList.add("blinking");
    }

    blinkOff() {
        this.cursorElement.classList.remove("blinking");
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

    decrementIndex() {
        if (this.cursorIndex != 0) {
            this.cursorIndex--;
        }    
    }

    resetIndex() {
        this.cursorIndex = 0;
    }
}