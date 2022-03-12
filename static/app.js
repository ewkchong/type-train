import WordGenerator from './modules/WordGenerator.js';
import Cursor from './modules/Cursor.js';
import Timer from './modules/Timer.js';
import * as Refresh from './modules/Refresh.js';
import Train from './modules/Train.js';
import Stats from './modules/Stats.js';

let textArea = document.querySelector(".text-area-container");
let wordGen = new WordGenerator({});
let JSONready = false;

const letterArray = [];
const wordArray = [];
const cursor = new Cursor(letterArray);
const train = new Train();
const stats = new Stats(Date.now());
const timer = new Timer(2, train, stats);
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
    stats.reset();
    setAllowedToType(true);
    showTest();

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
            // incrementCorrect();
            stats.pushKeystroke(Date.now(), code, true);

        } else {
            letterArray[i].classList.add('incorrect-space');
            // totalLetters++;
            stats.pushKeystroke(Date.now(), code, false);
        }
    } else {
        if (code == "Space") {
            letterArray[i].classList.add('incorrect');
            // totalLetters++;
            stats.pushKeystroke(Date.now(), code, false);
        } else if (code.charAt(code.length-1).toLowerCase() != letterArray[i].textContent) {
            letterArray[i].classList.add('incorrect');
            // totalLetters++;
            stats.pushKeystroke(Date.now(), code, false);
        } else {
            letterArray[i].classList.add('complete');
            // incrementCorrect();
            stats.pushKeystroke(Date.now(), code, true);
        }
    }
    // logAccuracy();
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
        
    } else if (classList.contains('correct')) {
        letterArray[i].classList.remove('correct');
        // removeCorrect();
    }     
    stats.excludeKeystroke();
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

export function toggleTestHidden() {
    let toggleHidden = (item) => {
        item.classList.toggle('hidden');
    };
    toggleHidden(document.querySelector('.text-area'));
    toggleHidden(document.querySelector('.timer'));
    toggleHidden(document.getElementById('train'));
    toggleHidden(document.getElementById('cursor'));
    toggleHidden(document.getElementById('results'));
}

function showTest() {
    let show = (item) => {
        item.classList.remove('hidden');
    }
    show(document.querySelector('.text-area'));
    show(document.querySelector('.timer'));
    show(document.getElementById('train'));
    show(document.getElementById('cursor'));
    show(document.getElementById('results'));

    document.getElementById('results').classList.add('hidden');
}

document.addEventListener('keydown', (k) => {
    const alphaNumeric = /^((Key[A-Z])|(Digit[0-9])|(Space))$/i;
    if (k.code == "Tab") {
        k.preventDefault();
        spinAndRestart();
        document.querySelector('.refresh-instructions').classList.add('fade-out');
    } else if (k.code == "Escape") {
        toggleTestHidden();
    } else if (!allowedToType) {
        return;
    } else if (alphaNumeric.test(k.code)) {
        if (!timer.isActive()) {
            timer.startTimer();
            stats.setStartTime(Date.now());
        }
        cursor.blinkOff();

        checkLetter(k.code);
        cursor.incrementIndex();
        cursor.updatePosition();
    } else if (k.code == "Backspace") {
        cursor.blinkOff();
        if (cursor.getIndex() == 0) {
            return;
        }
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











