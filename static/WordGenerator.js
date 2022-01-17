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
    
    
    // generates an array of random words with given length
    async generate(length) {
        this.words = await (await this.fetchJSON()).json();

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