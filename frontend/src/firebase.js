import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

//connects to firebase for login
const firebaseConfig = {
  apiKey: "AIzaSyB57-_3KsTZVh6Lcd54iowU8Ja1ZiJPTuY",
  authDomain: "se3316-d4859.firebaseapp.com",
  projectId: "se3316-d4859",
  storageBucket: "se3316-d4859.appspot.com",
  messagingSenderId: "718741803200",
  appId: "1:718741803200:web:3a42b501e84451d282dd25"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
