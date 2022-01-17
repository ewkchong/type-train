import WordGenerator from './WordGenerator.js';

const exampleSentence = "This is an example sentence.";
const sentenceArr = exampleSentence.split('');

const textArea = document.querySelector(".text-area-grid");

let wordGen = new WordGenerator({});

async function populateTextField() {
    let wordArr = await wordGen.generate(30);
    
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


