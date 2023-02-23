<template>
   <div v-if="type == 'loading'">
        <h1>Cargando....</h1>
      </div>
  <div v-else class="flex justify-center">
    <div class="w-4/5 h-96 mt-56 bg-gray-500 text-center text-6xl rounded shadow-2xl text-blue-300">
      Visor de Dispositivos
      <div class="mx-5 mb-5 flex mt-14 h-56">
        <div class="bg-white container flex flex-wrap items-center justify-center rounded-full">
          <div class="flex flex-row w-full md:block md:w-auto" id="navbar-default">
            <ul v-if="device.tipo == 'sensor'"
              class="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li> <img
                  src="../assets/Imagenes/kisspng-heat-sensor-clip-art-temperature-thermometer-5b7ee8ba5f4383.9571585715350437703902-removebg-preview.png"
                  class=" h-6 mr-3 sm:h-9 rounded" alt="Tipo Sensor" />
              </li>
              <li>
                <p
                  class=" text-4xl block py-2 pl-3 pr-4   rounded md:bg-transparent md:text-black md:p-0 dark:text-white">
                  Sala: {{ device.sala }}</p>
              </li>
              <li>
                <p
                  class=" text-4xl block py-2 pl-3 pr-4   rounded md:bg-transparent md:text-black md:p-0 dark:text-white">
                  Nombre: {{ device.nombre }}</p>
              </li>
              <li class="text-black text-4xl flex flex-row gap-5">
                <label for="number">Temperatura: </label>
                <input v-model="temp" type="number" class="w-14 border border-red-600 rounded text-center" />
                <button @click=changeStatusTemp class="bg-red-600 hover:bg-red-700 rounded w-36 shadow-2xl"
                  :disabled="changeTemp">Cambiar</button>

              </li>
            </ul>
            <ul v-if="device.tipo == 'ejecutor'"
              class="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li> <img src="../assets/Imagenes/ejecutor.png" class="mr-3 sm:h-9 rounded" alt="Tipo Sensor" />
              </li>
              <li>
                <p
                  class=" text-4xl block py-2 pl-3 pr-4   rounded md:bg-transparent md:text-black md:p-0 dark:text-white">
                  Sala: {{ device.sala }}</p>
              </li>
              <li>
                <p
                  class=" text-4xl block py-2 pl-3 pr-4   rounded md:bg-transparent md:text-black md:p-0 dark:text-white">
                  Nombre: {{ device.nombre }}</p>
              </li>
              <li>
                <p
                  class=" text-4xl block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Estado:
                  {{ device.estado }}</p>
              </li>
              <li>
                <button @click="changeStatusOnOff" class="hover:bg-red-500 rounded w-10"><img
                    src="../assets/Imagenes/onoff-removebg-preview.png" alt="on/off"></button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h1 class="mt-24 text-gray-500 ">{{ messageInfo }}</h1>
    </div>
  </div>
</template>

<script setup>

import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { onActualizaDispositivo, actualizaDispositivoCampo } from '../utils/firebase'

const route = useRoute()
const temp = ref()
const messageInfo = ref()
const device = ref()
const type = ref('loading')

onBeforeMount(async () => {
  try {
    await onActualizaDispositivo('dispositivos', route.params.id, docs => {
      device.value = docs.data()
      type.value = ''
      if (device.value.tipo === 'sensor') {
        temp.value = docs.data().temp
      }
    })
  } catch (error) {
    alert(error)
  }
})

const changeTemp = computed(() => device.value.temp === temp.value)

const changeStatusTemp = async () => {
  await actualizaDispositivoCampo('dispositivos', route.params.id, { temp: temp.value })
  alert('actualizado')
}

const changeStatusOnOff = async () => {
  let status
  device.value.estado === 'on' ? status = 'off' : status = 'on'
  await actualizaDispositivoCampo('dispositivos', route.params.id, { estado: status })
  messageInfo.value = 'Cambiando de estado'
  setTimeout(() => {
    messageInfo.value = ''
  }, 2000)
}

</script>
