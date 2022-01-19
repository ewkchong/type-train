export default class WordGenerator {
    options = {};
    words = [];
    readyToGenerate = false;

    constructor(options) {
        // keeping options default for now
        this.options = {
            lang: 'english250'
        };

    }

    async storeJSON() {
        this.words = await (await this.fetchJSON()).json();
    }
    
    // generates an array of random words with given length
    generate(length) {
        const arr = [];
        
        for (let i = 0; i < length; i++) {
            arr.push(this.words[Math.floor(Math.random() * this.words.length)]);
        }
        return arr;
    }
    
    fetchJSON() {
        return fetch(this.options.lang + '.json');
    }

}