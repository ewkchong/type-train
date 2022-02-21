import { setAllowedToType } from "../app.js";
export default class Timer {
  constructor(seconds, train, stats) {
    this.timerElement = document.querySelector('.timer');
    this.totalTime = seconds;
    this.timerSeconds = seconds;
    this.timerActive = false;
    this.train = train;
    this.stats = stats;
    this.originalTime = Date.now();
    this.currTime = Date.now();
  }

  startTimer() {
    this.originalTime = Date.now();
    this.time = setInterval(() => {
      this.currTime = Date.now();
      this.updateTimer();
      if (this.timerSeconds <= 0) {
        this.endTimer();
      }
    }, 100);
    this.timerActive = true;
  }

  
  updateTimer() {
    this.timerSeconds = this.totalTime - ((this.currTime - this.originalTime) / 1000);

    const min = Math.floor(this.timerSeconds / 60);
    const sec = Math.floor(this.timerSeconds % 60);

    this.timerElement.textContent = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
    this.train.updateTrainPosition((this.currTime - this.originalTime) / (this.totalTime * 1000));
  }

  resetTimer() {
    this.currTime = Date.now();
    this.originalTime = Date.now();
    this.pauseTimer();
    this.updateTimer();
  }

  pauseTimer() {
    clearInterval(this.time);
    this.timerActive = false;
  }

  endTimer() {

    // const [correct, total] = getLetterCount();
    this.pauseTimer();
    this.timerElement.textContent = "Choo Choo!";
    // const wordsPerMinute = (correct / 5) / (this.totalTime / 60); 
    setAllowedToType(false);
    // console.log(`Accuracy: ${100 * (correct / total)}%`);
    // console.log(`WPM: ${wordsPerMinute}wpm`);
    this.stats.calculateResult(this.totalTime);
  }

  isActive() {
    return this.timerActive;
  }
}










