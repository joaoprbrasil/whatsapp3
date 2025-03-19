// Importando os módulos necessários do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore para banco de dados
import { getDatabase } from "firebase/database"; // Realtime Database

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACMKZE94q_vvqdSKsaqBBhIDK16dGGjW8",
  authDomain: "rethinkteste.firebaseapp.com",
  projectId: "rethinkteste",
  storageBucket: "rethinkteste.firebasestorage.app",
  messagingSenderId: "82226983292",
  appId: "1:82226983292:web:15d496da42432c2f7474f9",
  measurementId: "G-JLB4C96EFK",
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);

// Exportando os bancos de dados
export const db = getFirestore(app); // Firestore
export const rtdb = getDatabase(app); // Realtime Database
