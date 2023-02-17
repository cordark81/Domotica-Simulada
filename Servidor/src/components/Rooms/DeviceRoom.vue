<template>
    <div class="mx-5 mb-5" @click="info(idDevice)">
        <div class="bg-white container flex flex-wrap items-center justify-between rounded">
            <div class="flex flex-row w-full md:block md:w-auto" id="navbar-default">
                <ul v-if="device.tipo == 'sensor'"
                    class="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li> <img
                            src="../../assets/Imagenes/kisspng-heat-sensor-clip-art-temperature-thermometer-5b7ee8ba5f4383.9571585715350437703902-removebg-preview.png"
                            class=" h-6 mr-3 sm:h-9 rounded" alt="Tipo Sensor" />
                    </li>
                    <li>
                        <p
                            class="block py-2 pl-3 pr-4   rounded md:bg-transparent md:text-black md:p-0 dark:text-white">
                            Nombre: {{ device.nombre }}</p>
                    </li>
                    <li>
                        <p
                            class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Temperatura:
                            {{ device.temp }} º</p>
                    </li>
                </ul>
                <ul v-if="device.tipo == 'ejecutor'"
                    class="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li> <img src="../../assets/Imagenes/ejecutor.png" class=" h-6 mr-3 sm:h-9 rounded"
                            alt="Tipo Sensor" />
                    </li>
                    <li>
                        <p
                            class="block py-2 pl-3 pr-4   rounded md:bg-transparent md:text-black md:p-0 dark:text-white">
                            Nombre: {{ device.nombre }}</p>
                    </li>
                    <li>
                        <p
                            class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Estado:
                            {{ device.estado }}</p>
                    </li>
                    <li>
                        <div>
                            <button @click.stop="changeStatus" class="hover:bg-slate-100 rounded"><img
                                    src="../../assets/Imagenes/onoff-removebg-preview.png" alt="on/off"></button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script setup>

import { actualizaDispositivo } from '../../utils/firebase'

const props = defineProps({
  idDevice: { type: String },
  device: { type: Object }
})

const changeStatus = async () => {
  let status
  props.device.estado === 'on' ? status = 'off' : status = 'on'
  await actualizaDispositivo('dispositivos', props.idDevice, { nombre: props.device.nombre, sala: props.device.sala, estado: status, tipo: props.device.tipo })
}

const info = (id) => window.open(`http://localhost:5174/${id}`, '_blank')

</script>
