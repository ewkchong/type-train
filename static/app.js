import WordGenerator from './WordGenerator.js';

const exampleSentence = "This is an example sentence.";
const sentenceArr = exampleSentence.split('');

const textArea = document.querySelector(".text-area-grid");

for (let i = 0; i < sentenceArr.length; i++) {
    let letter = document.createElement("div");
    letter.textContent = sentenceArr[i];
    textArea.appendChild(letter);
}

const wordGen = new WordGenerator({});