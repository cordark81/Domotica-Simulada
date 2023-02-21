<template>
    <button @click="assignNewRoom"
        class="w-24 ml-5 text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{{
            name }}</button>
</template>

<script setup>

import { useRoomsAvailable } from '../../store/roomsAvailable'
import { borraDispositivo, actualizaDispositivo } from '../../utils/firebase'

const store = useRoomsAvailable()

const emits = defineEmits(['closeModal'])

const props = defineProps({
  name: { type: String }
})

const assignNewRoom = () => {
  const room = store.seeDevices
  const device = room[0].device

  device.forEach(element => {
    const data = element.data
    data.sala = props.name
    actualizaDispositivo('dispositivos', element.id, data)
  })

  borraDispositivo('salas', room[0].id)
  store.addTransferDevice([])
  store.updateRooms([])
  emits('closeModal')
}

</script>
