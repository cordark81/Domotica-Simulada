import { initializeApp } from 'firebase/app'
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
  where
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCb76XChLO7lPTuEovbPTKGz596-cfU7vg',
  authDomain: 'domotica-simulada.firebaseapp.com',
  projectId: 'domotica-simulada',
  storageBucket: 'domotica-simulada.appspot.com',
  messagingSenderId: '155150798888',
  appId: '1:155150798888:web:ff17881bc67e8988ece51d'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Recuperamos Documentos de manera estatica
export const dameDocs = (ref) => getDocs(collection(db, ref))

// Recuperamos Documentos por campo y valor
export const dameDocsFiltro = (ref, campo, valor) =>
  getDocs(query(collection(db, ref), where(campo, '==', valor)))

// Escucha dinámica de la base de datos
export const onDameSalas = (ref, callback) => onSnapshot(collection(db, ref), callback)

// Añadimos un nuevo dispositivo
export const addDevice = (ref, device) => addDoc(collection(db, ref), device)

// Eliminamos dispositivo
export const borraDispositivo = (ref, id) => deleteDoc(doc(db, ref, id))

// Buscamos un documento para su posterior modificación
export const dameDoc = (ref, id) => getDoc(doc(db, ref, id))

// Actualización dispositivos
export const actualizaDispositivo = (ref, id, objeto) => setDoc(doc(db, ref, id), objeto)

// Escucha dinámica de un documentos
export const onCambioDoc = (ref, id, callback) => onSnapshot(doc(db, ref, id), callback)
