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
        textArea.remove();
        
        const newTextArea = document.createElement("div");
        newTextArea.classList = "text-area-container";
        textAreaDiv.appendChild(newTextArea);
        textArea = document.querySelector(".text-area-container");
        populateTextField();
        console.log("text field populated");
    }
})


