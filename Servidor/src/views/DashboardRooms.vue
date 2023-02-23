<template>
  <div class="flex flex-row justify-between">
    <button
      class="flex ml-10 mt-4 w-32 h-12 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      @click="handleSignOut" v-if="isLoggedIn">Desconectar </button>
    <div>
      <input type="text" input v-model="newRoom" class="h-12 mt-4 rounded-3xl text-center" />
      <button
        class="flex ml-10 mt-4 w-32 h-12 text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        @click="addRoom">Añadir sala </button>
    </div>

    <h1 class="flex text-6xl text-center mb-10"> Dashboard</h1>

    <div class="bg-white flex mr-10 mt-10 w-36 h-36 rounded-3xl" @drop="onDrop($event)" @dragenter.prevent
      @dragover.prevent>
      <img src="../assets/Imagenes/18297.png" alt="papelera">
    </div>
  </div>
  <div class="flex flex-wrap justify-center gap-7 mt-14">
    <CardRoom v-for="room in rooms" :key="room.nombre" :nameRoom="room.nombre" :device="room.device" :idRoom="room.id"
      :rooms="rooms" />
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth'
import { onDameSalas, borraDispositivo, addDevice } from '../utils/firebase'
import { useRouter } from 'vue-router'
import CardRoom from '../components/Rooms/CardRoom.vue'

const rooms = ref([])
const newRoom = ref([])
const router = useRouter()
const isLoggedIn = ref(false)

let auth

// nos mantiene actualizado los contenedores

onMounted(async () => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    (user) ? isLoggedIn.value = true : isLoggedIn.value = false
  })
  await onDameSalas('salas', docs => {
    rooms.value = []
    docs.forEach((doc) => {
      rooms.value.push({ id: doc.id, nombre: doc.data().nombre, device: [] })
    })
    onDameSalas('dispositivos', docs => {
      cleanDevice(rooms.value)
      // Dándole vueltas a usar un filter
      docs.forEach((doc) => {
        rooms.value.forEach((room, index) => {
          if (room.nombre === doc.data().sala) {
            rooms.value[index].device.push({ data: doc.data(), id: doc.id })
          }
        })
      })
    })
  })
})

// Nos desconecta de la sesión

const handleSignOut = async () => {
  await signOut(auth)
  router.push('/')
}

// Reset de dispositivos en la habitación

const cleanDevice = (rooms) => rooms.forEach((el) => { el.device = [] })

const addRoom = async () => {
  try {
    if (newRoom.value.length === 0) {
      throw 'nombre de sala vacio'
    } else {
      await addDevice('salas', { nombre: newRoom.value })
    }
  } catch (error) {
    alert(error)
  }
}

// Drop

const onDrop = async (event) => {
  const itemID = event.dataTransfer.getData('itemID')
  try {
    await borraDispositivo('dispositivos', itemID)
  } catch (error) {
    console.log(error)
    alert('error borrando dispositivo')
  }
}

</script>
