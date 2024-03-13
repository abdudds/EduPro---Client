import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDqFFRTnkFfAJ5bWfLWMeIk1Nd_BG_CiXo",
  authDomain: "edupro-dev-c757c.firebaseapp.com",
  projectId: "edupro-dev-c757c",
  storageBucket: "edupro-dev-c757c.appspot.com",
  messagingSenderId: "788060203650",
  appId: "1:788060203650:web:fa622fd5b3088d4f25629b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

