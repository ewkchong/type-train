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

    calculateResult(endTime) {
        const duration = endTime - this.startTime;
        const correctKeystrokes = this.keystrokes.filter((stroke) => stroke.correct);
        const correctExcluded = this.excluded.filter((stroke) => stroke.correct);
        const incorrectKeystrokeCount = this.keystrokes.length - correctKeystrokes.length;
        const incorrectExcludedCount = this.excluded.length - correctExcluded.length;

        const wordsPerMinute = (correctKeystrokes / 5) / (duration * 60000);
    }
}