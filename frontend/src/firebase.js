import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_u_jvgMipMWwzofkIUNnKNFYBXtUiU_Q",
  authDomain: "dodge-game-b8c3f.firebaseapp.com",
  projectId: "dodge-game-b8c3f",
  storageBucket: "dodge-game-b8c3f.firebasestorage.app",
  messagingSenderId: "1023867331777",
  appId: "1:1023867331777:web:281968aa1ea08bef2fa040"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);