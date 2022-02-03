import WordGenerator from './modules/WordGenerator.js';
import Cursor from './modules/Cursor.js';
import * as Refresh from './modules/Refresh.js'

let textArea = document.querySelector(".text-area-container");
let wordGen = new WordGenerator({});
let JSONready = false;

const letterArray = [];
const wordArray = [];
const cursor = new Cursor(letterArray);

document.onload = populateTextField();
Refresh.addListeners();

export async function populateTextField() {
    letterArray.splice(0, letterArray.length);
    if (!JSONready) {
        await wordGen.storeJSON();
        JSONready = true;
    }
    
    let wordArr = wordGen.generate(80);
    
    for (let i = 0; i < wordArr.length; i++) {
        const word = document.createElement("div");
        word.classList = "word";
        for (const char of wordArr[i]) {
            const letter = document.createElement("div");
            letter.classList = "letter";
            letter.textContent = char;
            word.appendChild(letter);
        }
        if (i < (wordArr.length - 1)) {
            const space = document.createElement("div");
            space.classList = "letter";
            space.innerHTML = "&nbsp;";
            word.appendChild(space);
        }
        textArea.appendChild(word);
    }
    for (let letter of document.querySelectorAll(".letter")) {
        letterArray.push(letter);
    }
    for (let word of document.querySelectorAll(".word")) {
        wordArray.push(word);
    }
    cursor.resetIndex();
    cursor.updatePosition();
    cursor.blink();
    cursor.unhide();
};

export function spinAndRestart() {
    Refresh.spinArrow();

    clearTextArea();
    populateTextField();
}

function clearTextArea() {
    textArea.remove();
    const textAreaDiv = document.querySelector(".text-area");
    const newTextArea = document.createElement("div");
    newTextArea.classList = "text-area-container";
    textAreaDiv.appendChild(newTextArea);
    textArea = document.querySelector(".text-area-container");
}

function checkLetter(code) {
    const i = cursor.getIndex();

    if (letterArray[i].innerHTML == "&nbsp;") {
        if (code == "Space") {
            letterArray[i].classList.add('correct');
        } else {
            letterArray[i].classList.add('incorrect-space');
        }
    } else {
        if (code == "Space") {
            letterArray[i].classList.add('incorrect');
        } else if (code.charAt(code.length-1).toLowerCase() != letterArray[i].textContent) {
            letterArray[i].classList.add('incorrect');
        } else {
            letterArray[i].classList.add('complete');

        }
    }
}

function eraseLetter() {
    const i = cursor.getIndex();
    const classList = letterArray[i].classList;
    if (classList.contains('complete')) {
        classList.remove('complete');
    }

    if (classList.contains('incorrect') || classList.contains('incorrect-space')) {
        letterArray[i].classList.remove('incorrect');
        letterArray[i].classList.remove('incorrect-space');
    }     
}

document.addEventListener('keydown', (k) => {
    const alphaNumeric = /^((Key[A-Z])|(Digit[0-9])|(Space))$/i;
    if (k.code == "Escape" || k.code == "Tab") {
        k.preventDefault();
        spinAndRestart();
    } else if (alphaNumeric.test(k.code)) {
        cursor.blinkOff();

        checkLetter(k.code);
        cursor.incrementIndex();
        cursor.updatePosition();
    } else if (k.code == "Backspace") {
        cursor.blinkOff();
        cursor.decrementIndex();
        eraseLetter();
        cursor.updatePosition();
    }
});

window.addEventListener('resize', () => {
    cursor.updatePosition();
}, true);

window.addEventListener('scroll', () => {
    cursor.updatePosition();
}, true);








