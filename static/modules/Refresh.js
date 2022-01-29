import { spinAndRestart } from "../app.js";


export function addListeners() {
    const refreshButton = document.querySelector(".refresh-button");

    refreshButton.addEventListener("mouseenter", () => {
        refreshButton.classList.add("refresh-button-hover");
    });
    
    refreshButton.addEventListener("mouseleave", () => {
        refreshButton.classList.remove("refresh-button-hover");
    });
    
    refreshButton.addEventListener("click", () => {
        spinAndRestart();
    })
    
    refreshButton.addEventListener("mousedown", () => {
        refreshButton.classList.add("refresh-button-clicked");
    });
    
    refreshButton.addEventListener("mouseup", () => {
        refreshButton.classList.remove("refresh-button-clicked");
    })
}

export function spinArrow() {
    const refreshButtonImage = document.querySelector("#refresh-button-image");

    refreshButtonImage.classList.remove("spin-arrow");
    void refreshButtonImage.offsetWidth;
    refreshButtonImage.classList.add("spin-arrow");
}