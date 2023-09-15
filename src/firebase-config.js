import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAd8igVI16xcgQFHwYeqcEtaJXRXb2GTr4",
  authDomain: "amaryllis-login.firebaseapp.com",
  projectId: "amaryllis-login",
  storageBucket: "amaryllis-login.appspot.com",
  messagingSenderId: "648208801189",
  appId: "1:648208801189:web:de25faf6b7d2e98aeadc4c",
};

initializeApp(firebaseConfig);

const authService = getAuth();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth, authService };
