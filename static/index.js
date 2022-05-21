// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth, GoogleAuthProvider} from "firebase/auth";

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

let debug = true;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

if (debug) {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

const loginButton = document.getElementById('login-button');
const googleButton = document.getElementById('login-google');

loginButton.addEventListener('click', () => {
  console.log("login button clicked");
});

googleButton.addEventListener('click', () => {
  firebase.signInWithPopup(firebase.auth, firebase.provider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.error(error);
    })
}) 

document.addEventListener('timerend', () => {
  console.log("timer ended, event dispatched");
})

