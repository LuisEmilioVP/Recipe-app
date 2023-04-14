// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBetJWrP5It8ZKd9O1pgdqcyXw-KQwAqBA',
	authDomain: 'recipe-app-fdc63.firebaseapp.com',
	projectId: 'recipe-app-fdc63',
	storageBucket: 'recipe-app-fdc63.appspot.com',
	messagingSenderId: '695903222905',
	appId: '1:695903222905:web:a6c81cbe82fbcd430f68a8',
	measurementId: 'G-FQVR8770BX',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
