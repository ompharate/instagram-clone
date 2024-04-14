
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDgwOZqYIrobUMWcmlQyOG06VvdeYexSaE",
  authDomain: "rn-instagram-e4701.firebaseapp.com",
  projectId: "rn-instagram-e4701",
  storageBucket: "rn-instagram-e4701.appspot.com",
  messagingSenderId: "840293842105",
  appId: "1:840293842105:web:1a7ed11d9c89b51cb72f68"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);