import { removeTopRow } from "../app.js";
export default class Cursor {
    constructor(letterArray) {
        this.cursorElement = document.getElementById('cursor');
        this.letterArray = letterArray;
        this.topRow = "";
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
        const cursorY = newTop - currTop;
        if (cursorY < this.topRow + 70 && cursorY > this.topRow + 60) {
            removeTopRow();
        }
        
        window.requestAnimationFrame(() => {return;});
        // console.log(`cursor pos: ${newTop - currTop}, top row: ${this.topRow}`);
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
    
    setIndex(i) {
        this.cursorIndex = i; 
    }

    setTopRow(topRow) {
        this.topRow = topRow;
    }
}