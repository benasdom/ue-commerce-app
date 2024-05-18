import { initializeApp } from 'firebase/app';


 const firebaseConfig = { 
  apiKey: "AIzaSyDqa4MzQ3QegMdg8L109rf8no7MAADZGRQ",
  authDomain: "ue-commerce-3b90e.firebaseapp.com",
  projectId: "ue-commerce-3b90e",
  storageBucket: "ue-commerce-3b90e.appspot.com",
  messagingSenderId: "611663909049",
  appId: "1:611663909049:web:954742ea01339f33cd4b68",
  measurementId: "G-H22XEFF47E"
};

const fireapp = initializeApp(firebaseConfig);
export default fireapp;