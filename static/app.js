import WordGenerator from './modules/WordGenerator.js';
import Cursor from './modules/Cursor.js';
import Timer from './modules/Timer.js';
import * as Refresh from './modules/Refresh.js';
import Train from './modules/Train.js';

let textArea = document.querySelector(".text-area-container");
let wordGen = new WordGenerator({});
let JSONready = false;

const letterArray = [];
const wordArray = [];
const cursor = new Cursor(letterArray);
const train = new Train();
const timer = new Timer(5, train);
let correctLetters = 0;
let totalLetters = 0;
let allowedToType = true;

document.onload = populateTextField();
Refresh.addListeners();
timer.updateTimer();
train.updateTrainPosition();

export async function populateTextField() {
    letterArray.splice(0, letterArray.length);
    wordArray.splice(0, wordArray.length);
    if (!JSONready) {
        await wordGen.storeJSON();
        JSONready = true;
    }

    appendToTextField(80);

    cursor.setTopRow(letterArray[0].getBoundingClientRect().top);
    cursor.resetIndex();
    cursor.updatePosition();
    cursor.blink();
    cursor.unhide();
}

function appendToTextField(numWords) {
    let wordArr = wordGen.generate(numWords);
    
    for (let i = 0; i < wordArr.length; i++) {
        const word = document.createElement("div");
        word.classList = "word";
        for (const char of wordArr[i]) {
            const letter = document.createElement("div");
            letter.classList = "letter";
            letterArray.push(letter);
            letter.textContent = char;
            word.appendChild(letter);
        }
        const space = document.createElement("div");
        space.classList = "letter";
        space.innerHTML = "&nbsp;";
        letterArray.push(space);
        word.appendChild(space);
        wordArray.push(word);
        textArea.appendChild(word);
    }
    cursor.updatePosition();
}

export function spinAndRestart() {
    Refresh.spinArrow();
    timer.resetTimer();
    setAllowedToType(true);

    correctLetters = 0;
    totalLetters = 0;

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
            incrementCorrect();

        } else {
            letterArray[i].classList.add('incorrect-space');
            totalLetters++;
        }
    } else {
        if (code == "Space") {
            letterArray[i].classList.add('incorrect');
            totalLetters++;
        } else if (code.charAt(code.length-1).toLowerCase() != letterArray[i].textContent) {
            letterArray[i].classList.add('incorrect');
            totalLetters++;
        } else {
            letterArray[i].classList.add('complete');
            incrementCorrect();
        }
    }
    // logAccuracy();
}

export function getLetterCount() {
    return [correctLetters, totalLetters];
}

function logAccuracy() {
    console.log(`${100 * (correctLetters / totalLetters)}%`);
}

function incrementCorrect() {
    correctLetters++;
    totalLetters++;
}

function removeCorrect() {
    correctLetters--;
}

// Case1:typing everything is right backspace type incorrect letter --> decrement correct, 
// Case2:" " type correct letter
// Case3: typing, something is incorrect, backspace, type incorrect letter
// Case4: " " tpye corrrect letter

function eraseLetter() {
    const i = cursor.getIndex();
    const classList = letterArray[i].classList;
    if (classList.contains('complete')) {
        classList.remove('complete');
    }

    if (classList.contains('incorrect') || classList.contains('incorrect-space')) {
        letterArray[i].classList.remove('incorrect');
        letterArray[i].classList.remove('incorrect-space');
        
    } else if (classList.contains('correct')) {
        letterArray[i].classList.remove('correct');
        removeCorrect();
    }     
}

export function removeTopRow() {
    let topRow = letterArray[0].getBoundingClientRect().top;
    let i = 0;
    while (letterArray[i].getBoundingClientRect().top === topRow) {
        i++;
    }
    const j = i;
    while (i--) {
        letterArray[i].remove();
    }
    letterArray.splice(0, j);
    i = 0;
    topRow = letterArray[0].getBoundingClientRect().top;
    while (letterArray[i].getBoundingClientRect().top === topRow) {
        i++;
    }
    cursor.setIndex(i);
    cursor.updatePosition();
}

export function setAllowedToType(bool) {
    allowedToType = bool;
} 

document.addEventListener('keydown', (k) => {
    const alphaNumeric = /^((Key[A-Z])|(Digit[0-9])|(Space))$/i;
    if (k.code == "Tab") {
        setAllowedToType(true);
        k.preventDefault();
        spinAndRestart();
        
    } else if (!allowedToType) {
        return;
    } else if (alphaNumeric.test(k.code)) {
        if (!timer.isActive()) {
            timer.startTimer();
        }
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
    cursor.setTopRow(letterArray[0].getBoundingClientRect().top);
    cursor.updatePosition();
    train.resetDistance();
}, true);

window.addEventListener('scroll', () => {
    cursor.updatePosition();
}, true);











