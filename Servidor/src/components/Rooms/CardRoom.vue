<template>
    <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-blue-600 w-96 h-auto">
        <div class="flex flex-row justify-center">
            <img class=" flex w-16 h-16 ml-10 mt-5" src="../../assets/Imagenes/4792184.png" alt="Habitacion">
            <input v-model="name" class="w-48 font-bold text-xl mb-2 p-6 mt-5 bg-blue-600" :disabled="input"/>
            <button v-if="input==true" @click="input=false"
                class="flex w-24 h-12 mt-8 mr-10  text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Cambiar</button>
            <button v-if="input==false" @click="changeNameRoom"
                class="flex w-24 h-12 mt-8 mr-10 text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Aceptar</button>
        </div>
        <div class="px-6 py-4">
            <p class="text-gray-700 text-base">
                Dispositivos
            </p>
        </div>
        <DeviceRoom v-for="dev in device" :key="dev.id" :device="dev.data" :idDevice="dev.id" draggable="true"
            @dragstart="startDrag($event, dev)" />
        <div class="px-6 pt-4 pb-2 flex">
            <button @click="dialog = true"
                class="w-full text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Añadir</button>
                <button @click="dialogDelete=true"
                class="w-full ml-24 text-white bg-orange-800 hover:bg-orange-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Eliminar</button>
        </div>
    </div>
    <ModalAddRooms v-show="dialog" @CloseModal="dialog = false" :nameRoom="nameRoom" />
    <ModalDeleteRoom v-show="dialogDelete" @closeModal="dialogDelete = false" @deleteRoom="deleteRoom" @reassignDevices="reassignDevices"/>
    <ModalRoomAvailable v-show="dialogAvailable" @closeModal="dialogAvailable = false"/>
</template>

<script setup>

import DeviceRoom from './DeviceRoom.vue'
import ModalAddRooms from './ModalAddRooms.vue'
import ModalDeleteRoom from './ModalDeleteRoom.vue'
import ModalRoomAvailable from './ModalRoomAvailable.vue'
import { ref } from 'vue'
import { borraDispositivo, borraDocsFiltro, actualizaDispositivoCampo } from '../../utils/firebase'
import { useRoomsAvailable } from '../../store/roomsAvailable'

const dialog = ref()
const dialogDelete = ref()
const dialogAvailable = ref()
const store = useRoomsAvailable()
const input = ref(true)

const props = defineProps({
  nameRoom: { type: String },
  idRoom: { type: String },
  device: { type: Object },
  rooms: { type: Array }
})

const name = ref(props.nameRoom)

// Drag and drop

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemID', item.id)
}

const deleteRoom = () => {
  borraDispositivo('salas', props.idRoom)
  borraDocsFiltro('dispositivos', 'sala', props.nameRoom)
  dialogDelete.value = false
}

const reassignDevices = () => {
  const roomAvailable = props.rooms.filter((el) => el.nombre !== props.nameRoom)
  const transferDevice = props.rooms.filter((el) => el.nombre === props.nameRoom)
  store.updateRooms(roomAvailable)
  store.addTransferDevice(transferDevice)
  dialogDelete.value = false
  dialogAvailable.value = true
}

const changeNameRoom = () => {
  try {
    actualizaDispositivoCampo('salas', props.idRoom, { nombre: name.value })
    props.device.forEach(element => {
      actualizaDispositivoCampo('dispositivos', element.id, { sala: name.value })
    })
  } catch (error) {
    console.log(error)
  }
  input.value = true
}

</script>
