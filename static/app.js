import WordGenerator from './WordGenerator.js';

let textArea = document.querySelector(".text-area-container");
const textAreaDiv = document.querySelector(".text-area");
const cursor = document.querySelector("#cursor");

let wordGen = new WordGenerator({});
let JSONready = false;

let letterArray = [];
let cursorPosition = "308.349975px";
let cursorIndex = 0;

async function populateTextField() {
    letterArray = [];
    cursorIndex = 0;
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
    cursor.style.left = letterArray[0].getBoundingClientRect().left - 1.65 + "px";
    cursor.style.top  = letterArray[0].getBoundingClientRect().top + "px";
    cursor.classList.add("blinking");
    cursor.classList.remove("hidden");
}

populateTextField();

const alphaNumeric = /(Key[A-Z])|(Digit[0-9])|(Space)/i;
cursorPosition = cursorPosition.substring(0, cursorPosition.length - 2);
cursorPosition = parseFloat(cursorPosition);

document.addEventListener('keydown', (k) => {
    if (k.code == "Escape" || k.code == "Tab") {
        k.preventDefault();
        spinAndRestart();
    } else if (k.code.match(alphaNumeric)) {
        cursor.classList.remove("blinking");
        cursorIndex++;
        cursor.style.left = letterArray[cursorIndex].getBoundingClientRect().left - 1.65 + "px";
        cursor.style.top = letterArray[cursorIndex].getBoundingClientRect().top + "px";
    }
});


const refreshButton = document.querySelector(".refresh-button");
const refreshButtonImage = document.querySelector("#refresh-button-image");

refreshButton.addEventListener("mouseenter", () => {
    refreshButton.classList.add("refresh-button-hover");
});

refreshButton.addEventListener("mouseleave", () => {
    refreshButton.classList.remove("refresh-button-hover");
});

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

refreshButton.addEventListener("click", () => {
    spinAndRestart();
})

refreshButton.addEventListener("mousedown", () => {
    refreshButton.classList.add("refresh-button-clicked");
});

refreshButton.addEventListener("mouseup", () => {
    refreshButton.classList.remove("refresh-button-clicked");
})


const profileIcon = document.getElementById("profile");
const ddMenu = document.querySelector(".dd_menu");

profileIcon.addEventListener("click", function() {
    ddMenu.classList.toggle("active");
})





