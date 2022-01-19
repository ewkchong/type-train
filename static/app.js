import WordGenerator from './WordGenerator.js';

let textArea = document.querySelector(".text-area-container");
const textAreaDiv = document.querySelector(".text-area");

let wordGen = new WordGenerator({});
let JSONready = false;

async function populateTextField() {
    if (!JSONready) {
        await wordGen.storeJSON();
        JSONready = true;
    }

    let wordArr = wordGen.generate(50);
    
    for (let i = 0; i < wordArr.length; i++) {
        const word = document.createElement("div");
        word.classList = "word";
        for (const char of wordArr[i]) {
            const letter = document.createElement("div");
            letter.classList = "letter";
            letter.textContent = char;
            word.appendChild(letter);
        }
        textArea.appendChild(word);
    }
}

populateTextField();

document.addEventListener('keydown', (k) => {
    if (k.code == "Escape") {
        spinAndRestart();
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



