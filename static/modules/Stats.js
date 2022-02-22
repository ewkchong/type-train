export default class Stats {
    constructor(startTime) {
        this.keystrokes = [];
        this.excluded = [];
        this.startTime = startTime;
    }

    pushKeystroke(time, letter, correct) {
        const stroke = {
            time: time,
            letter: letter,
            correct: correct,
        };
        this.keystrokes.push(stroke);
    }

    excludeKeystroke() {
        this.excluded.push(this.keystrokes.pop());
    }

    setStartTime(time) {
        this.startTime = time; 
    }

    reset() {
        this.keystrokes = [];
        this.excluded = [];
        this.startTime = Date.now();
    }

    calculateResult(endTime) {
        const duration = (endTime - this.startTime) / 1000;
        const typedLetters = this.keystrokes.length;
        const excludedLetters = this.excluded.length;
        const totalLetters = typedLetters + excludedLetters;
        const uncorrectedErrors = this.keystrokes.filter((k) => k.correct == false).length;
        const excludedErrors = this.excluded.filter((k) => k.correct == false).length;
        
        const wordsPerMinute = (((typedLetters - uncorrectedErrors) / 5) * 60) / duration;

        const accuracy = ((totalLetters - uncorrectedErrors - excludedErrors) / totalLetters) * 100;

        console.log(`WPM: ${wordsPerMinute}wpm`);
        console.log(`accuracy: ${accuracy}%`);
        console.log(`typed letters: ${typedLetters}, uncorrectedErrors: ${uncorrectedErrors}, totalLetters: ${totalLetters}`)
        console.log(this.keystrokes);
        console.log(this.excluded);
    
        return [wordsPerMinute, accuracy];
    }
}