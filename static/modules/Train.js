export default class Train {
    constructor() {
        this.trainElement = document.getElementById('train');
        this.areaSize = document.querySelector('.text-area').getBoundingClientRect().width;
        this.distance = this.areaSize - this.trainElement.getBoundingClientRect().width; 
        this.completion = 0;
    }

    updateTrainPosition(completion) {
        this.completion = completion;
        this.trainElement.style = `transform: translateX(${this.distance * this.completion}px) scaleX(-1);`;
    }

    resetDistance() {
        this.areaSize = document.querySelector('.text-area').getBoundingClientRect().width;
        this.distance = this.areaSize - this.trainElement.getBoundingClientRect().width;
    }
}
