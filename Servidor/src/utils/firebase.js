import { initializeApp } from "firebase/app"
import {  
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCb76XChLO7lPTuEovbPTKGz596-cfU7vg",
  authDomain: "domotica-simulada.firebaseapp.com",
  projectId: "domotica-simulada",
  storageBucket: "domotica-simulada.appspot.com",
  messagingSenderId: "155150798888",
  appId: "1:155150798888:web:ff17881bc67e8988ece51d"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)



//Obtenemos los talleres de manera estática
export const dameDocs = (ref)=> getDocs(collection(db,ref))

//Obtenemos docs filtrados por campo y valor
export const dameDocsFiltro = (ref, campo, valor) => 
  getDocs(query(collection(db, ref), where(campo,"==", valor)))
  

//Qué pasa si la referencia de talleres cambia...
export const onDameSalas = (ref, callback) => onSnapshot(collection(db,ref), callback)

//Añadimos una nueva reserva
export const anadeReserva = (ref, reserva) => addDoc(collection(db,ref),reserva)

//Eliminamos una reserva
export const borraDoc = (ref, id) => deleteDoc(doc(db,ref,id))

//Buscamos un documento para su posterior modificación
export const dameDoc = (ref,id) => getDoc(doc(db,ref,id))

//Actualizamos la reserva
export const actualizaDoc = (ref,id,objeto) => setDoc(doc(db,ref,id), objeto)

//Cambios de un documento
export const onCambioDoc = (ref, id, callback) => onSnapshot(doc(db, ref, id), callback)