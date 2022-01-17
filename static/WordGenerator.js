export default class WordGenerator {
    options = {};
    words = [];
    readyToGenerate = false;

    constructor(options) {
        // keeping options default for now
        this.options = {
            lang: 'english250'
        };

        fetch(this.options.lang + '.json')
            .then((resp) => { 
                words = resp.json(); 
                this.readyToGenerate = true;
            })
            .catch((err) => { console.log(err); });
    }

    waitFileReady() {
        while (!this.readyToGenerate) { }
    }

    // !! TODO
    generate() {
        this.waitFileReady();
        console.log('Generation completed');
    }

    next() {
        return words[Math.floor(Math.random() * this.words.length)]
    }


}