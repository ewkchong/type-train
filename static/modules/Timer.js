import { setAllowedToType, toggleTestHidden } from "../app.js";
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
    this.stats.clearGraph();
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
    this.pauseTimer();
    this.timerElement.textContent = "Choo Choo!";
    setAllowedToType(false);
    let [wpm, acc] = this.stats.calculateResult(Date.now());
    this.stats.setUpGraph();
    console.log(this.stats.constructData());

    document.getElementById('wpm-text').textContent = Math.round(wpm);
    document.getElementById('acc-text').textContent = `${Math.round(acc)}%`;
    toggleTestHidden();
  }

  isActive() {
    return this.timerActive;
  }
}










