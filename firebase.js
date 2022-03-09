// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2fKHGiG33DIeJZGFPyPv2nr-ADvmbIws",
    authDomain: "clone-2afef.firebaseapp.com",
    projectId: "clone-2afef",
    storageBucket: "clone-2afef.appspot.com",
    messagingSenderId: "307595797618",
    appId: "1:307595797618:web:8bc1360f3dca11c9dd4eeb"
};

// Initialize Firebase
const app =   initializeApp(firebaseConfig);
export  const db=getFirestore(app)
// import { collection, getDocs } from 'firebase/firestore';
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//     }