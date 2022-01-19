// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbEj3P2zx7TpYvnOcy1DaoEB9hRHFpHpU",
  authDomain: "type-train.firebaseapp.com",
  projectId: "type-train",
  storageBucket: "type-train.appspot.com",
  messagingSenderId: "380789326755",
  appId: "1:380789326755:web:e465be129ab7a916071016",
  measurementId: "G-ZR3VZRHSW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);




// const selected = document.querySelector(".selected");
// const profileSettings = document.querySelector(".profile-settings");
// const settingsList = document.querySelectorAll(".setting");


// selected.addEventListener("click", () => {
//   profileSettings.classList.toggle("active");
// })

// settingsList.forEach( s => {
//   s.addEventListener("click", () => {
//       selected.innerHTML = s.querySelector("a").innerHTML;
//       profileSettings.classList.remove("active");
//   })
// })

// const profileImage = document.getElementById("profile-image");

// profileImage.addEventListener("click", function() {
//   this.classList.toggle("active");

// })


var dd_main = document.querySelector(".dd_main");

	dd_main.addEventListener("click", function(){
		this.classList.toggle("active");
	})






