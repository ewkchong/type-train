// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc, getFirestore, connectFirestoreEmulator } from "firebase/firestore";

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
const db = getFirestore(app);

if (debug) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

// Login page element references
const loginButton = document.getElementById('login-button');
const googleButton = document.getElementById('login-google');
const signUpButton = document.getElementById('signUp-button');

const emailInput = document.getElementById('register-email');
const verifyEmail = document.getElementById('verify-email');
const passwordInput = document.getElementById('register-password');
const verifyPassword = document.getElementById('verify-password');

const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
// const logoutButton = document.getElementById('logout-button');
// need to implement logout button on approp. pa ge

// Login user with Google Auth Provider
googleButton.addEventListener('click', () => {
  firebase.signInWithPopup(firebase.auth, firebase.provider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.error(error);
    })
}) 

/* Adds event listener to email and password inputs 
to turn input red when they do not match */
inputMatchBorder(verifyEmail, emailInput);
inputMatchBorder(verifyPassword, passwordInput);

// Sign up button functionality
signUpButton.addEventListener('click', (e) =>{
  var email = document.getElementById('register-email').value;
  var password = document.getElementById('register-password').value;
  var username = document.getElementById('register-username').value;
  
  if (!checkMatch(verifyEmail, emailInput) || !checkMatch(verifyPassword, passwordInput)) {
    alert("Please fix any errors below and resubmit");
    return;
  }

  // Use Firebase Auth to create user
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    createUserEntry(user.uid, username, email);
    window.location.reload();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == "auth/email-already-in-use") {
      emailInput.classList.add('bad-input');
    }
    console.log("errorCode: ", errorCode);
    console.log("errorMessage: ", errorMessage);

  });
});

emailInput.addEventListener('input', () => {
  emailInput.classList.remove('bad-input');
});

loginButton.addEventListener('click', () => {
  if (loginUsername.value == "") {
    loginUsername.classList.add("bad-input");
  } else if (loginPassword.value == "") {
    loginPassword.classList.add('bad-input');
  } else {
    signInWithEmailAndPassword(auth, loginUsername.value, loginPassword.value)
      .then((userCredential) => {
        // const user = userCredential.user;
        console.log("Login Successful");
        window.location.replace('/static/');
      })
      .catch((err) => {
        console.log(err);
        if (err.code == "auth/wrong-password") {
          // Do something on wrong password
        } else if (err.code == "auth/user-not-found") {
          // Do something on user not found
        }
        // Do something on error
      });  
  }
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

const checkMatch = (a, b) => a.value == b.value;

// Adds a red border to input element when it does not match other input
function inputMatchBorder(confirm, input) {
  confirm.addEventListener('input', () => {
    if (confirm.value == input.value) {
      confirm.classList.remove('bad-input');
    } else {
      confirm.classList.add('bad-input');
    }
  });

  confirm.addEventListener('focusout', () => {
    if (confirm.value == "") {
      confirm.classList.remove('bad-input');
    }
  });
}

// Adds a User entry for created user in Firestore
async function createUserEntry(uid, username, email) {
  await setDoc(doc(db, "users", uid) , {
    id: uid,
    username: username,
    email: email,
  });
}
// logout.addEventListener('click',(e)=>{

//   signOut(auth).then(() => {
//     // Sign-out successful.
//     alert('user loged out');
//   }).catch((error) => {
//     // An error happened.
//     const errorCode = error.code;
//     const errorMessage = error.message;

//        alert(errorMessage);
//   });

// });
