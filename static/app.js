import WordGenerator from './WordGenerator.js';

const textArea = document.querySelector(".text-area-container");

let wordGen = new WordGenerator({});

async function populateTextField() {
    let wordArr = await wordGen.generate(50);
    
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


