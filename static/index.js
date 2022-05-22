// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth, GoogleAuthProvider} from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {getDatabse, set, ref} from "firebase/database";






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
const database = getDatbase(app);


if (debug) {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

const loginButton = document.getElementById('login-button');
const googleButton = document.getElementById('login-google');
const signUpButton = document.getElementById('signUp-button');
const logoutButton = document.getElementById('logout-button');
// need to implement logout button on approp. pa ge


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

signUpButton.addEventListener('click', (e) =>{

  var email = document.getElementById('email').value;
  var password = document.getElementById('register-password').value;
  var username = document.getElementById('register-username').value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    set(ref(database, 'users/'+ user.uid) {
      username: username,
      email: email
    })
    alert('user created');
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   
    alert('errorMessage');

  });
});


const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    //bla bla bla
    // ...
  } else {
    // User is signed out
    // ...
    //bla bla bla
  }
});


logout.addEventListener('click',(e)=>{

  signOut(auth).then(() => {
    // Sign-out successful.
    alert('user loged out');
  }).catch((error) => {
    // An error happened.
    const errorCode = error.code;
    const errorMessage = error.message;

       alert(errorMessage);
  });

});


