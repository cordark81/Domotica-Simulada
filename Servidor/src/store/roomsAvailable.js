import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRoomsAvailable = defineStore('roomsAvailable', () => {
  let rooms = ref([])

  let transferDevice = ref([])

  const seeRooms = computed(() => rooms.value)

  const seeDevices = computed(() => transferDevice.value)

  const updateRooms = room => rooms.value = room

  const addTransferDevice = device => transferDevice.value = device

  return {
    updateRooms,
    addTransferDevice,
    seeRooms,
    seeDevices

  }
})
