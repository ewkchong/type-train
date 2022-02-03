const time = document.querySelector('.timer');

let timerSeconds = 3;

time.innerHtml = '00:${timeSecond}' ;

const timer = setInterval(() => {
    timerSeconds--;
    displayTime(timerSeconds);
    if (timerSeconds == 0 || timerSeconds < 1) {
      endCount();
      clearInterval(timer);
    }
  }, 1000);
  
  function displayTime(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    time.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  }
  
  function endCount() {
    time.innerHTML = "Choo Choo!";
  }










