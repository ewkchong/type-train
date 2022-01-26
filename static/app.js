import WordGenerator from './modules/WordGenerator.js';
import Cursor from './modules/Cursor.js';

let textArea = document.querySelector(".text-area-container");
const textAreaDiv = document.querySelector(".text-area");
const profileIcon = document.getElementById("profile");
const ddMenu = document.querySelector(".dd_menu");
const refreshButtonImage = document.querySelector("#refresh-button-image");

let wordGen = new WordGenerator({});
let JSONready = false;

const letterArray = [];
const cursor = new Cursor(letterArray, document.getElementById('cursor'));

document.onload = populateTextField();

async function populateTextField() {
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
    cursor.resetIndex();
    cursor.updatePosition();
    cursor.blink();
    cursor.unhide();
};

function spinAndRestart() {
    refreshButtonImage.classList.remove("spin-arrow");
    void refreshButtonImage.offsetWidth;
    refreshButtonImage.classList.add("spin-arrow");
    
    textArea.remove();
    
    const newTextArea = document.createElement("div");
    newTextArea.classList = "text-area-container";
    textAreaDiv.appendChild(newTextArea);
    textArea = document.querySelector(".text-area-container");
    populateTextField();
}

(function() {
    const refreshButton = document.querySelector(".refresh-button");

    refreshButton.addEventListener("mouseenter", () => {
        refreshButton.classList.add("refresh-button-hover");
    });
    
    refreshButton.addEventListener("mouseleave", () => {
        refreshButton.classList.remove("refresh-button-hover");
    });
    
    refreshButton.addEventListener("click", () => {
        spinAndRestart();
    })
    
    refreshButton.addEventListener("mousedown", () => {
        refreshButton.classList.add("refresh-button-clicked");
    });
    
    refreshButton.addEventListener("mouseup", () => {
        refreshButton.classList.remove("refresh-button-clicked");
    })
})();

document.addEventListener('keydown', (k) => {
    const alphaNumeric = /(Key[A-Z])|(Digit[0-9])|(Space)/i;
    if (k.code == "Escape" || k.code == "Tab") {
        k.preventDefault();
        spinAndRestart();
    } else if (k.code.match(alphaNumeric)) {
        cursor.blinkOff();
        cursor.incrementIndex();
        cursor.updatePosition();
    }
});

window.addEventListener('resize', () => {
    cursor.updatePosition();
}, true);

window.addEventListener('scroll', () => {
    cursor.updatePosition();
}, true);





