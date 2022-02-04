export default class Timer {
  constructor(seconds) {
    this.timerElement = document.querySelector('.timer');
    this.originalTime = seconds;
    this.timerSeconds = seconds;
    this.timer = null;
    this.timerActive = false;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timerSeconds--;
      this.updateTimer();
      if (this.timerSeconds == 0 || this.timerSeconds < 1) {
        this.endTimer();
      }
    }, 1000);
    this.timerActive = true;
  }

  updateTimer() {
    const min = Math.floor(this.timerSeconds / 60);
    const sec = Math.floor(this.timerSeconds % 60);
    this.timerElement.textContent = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  resetTimer() {
    this.timerSeconds = this.originalTime;
    this.pauseTimer();
    this.updateTimer();
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.timerActive = false;
  }

  endTimer() {
    this.pauseTimer();
    this.timerElement.textContent = "Choo Choo!";
  }

  isActive() {
    return this.timerActive;
  }
}










