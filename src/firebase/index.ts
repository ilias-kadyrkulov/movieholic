// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDwVrg9rtQvAaNO1AOxCzN9Hf9SR43Ykqc',
    authDomain: 'movieholic-auth-534e2.firebaseapp.com',
    projectId: 'movieholic-auth-534e2',
    storageBucket: 'movieholic-auth-534e2.appspot.com',
    messagingSenderId: '517998088984',
    appId: '1:517998088984:web:000c19534a686120b4846d'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore()