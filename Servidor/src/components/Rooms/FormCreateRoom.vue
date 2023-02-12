<template>
    <h1 class="mb-10 text-lg">Nuevo Dispositivo</h1>
    <div>
        <div class="w-full max-w-xs ml-8 ">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="checkUserPassword">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Elige un
                    tipo</label>
                <select v-model="select" id="countries"
                    class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="sensor">Sensor</option>
                    <option value="ejecutor">Ejecutor</option>
                </select>
                <div class="mb-10">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="nameDevice">
                        Nombre:
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        v-model=nameDevice id="nameDevice" type="text" placeholder="Nombre dispositivo">
                </div>
                <div class="flex items-center justify-between">
                    <button @click="acceptDevice"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Aceptar
                    </button>
                    <button @click="closeModal"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                        Cancelar
                    </button>
                </div>
            </form>
            <p class="text-center text-gray-500 text-xs">
                &copy;2023 EDW-DOMOTIC. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script setup>

import { ref } from "vue";
import { addDevice } from '../../utils/firebase';

const select = ref();
const nameDevice = ref();
const temp = ref(25);
const status = ref("off");
const room = ref(props.nameRoom)

const props = defineProps({
    nameRoom: { type: String },
})

const emits = defineEmits(["CloseModal"])

const closeModal = () => {
    emits("CloseModal")

}

const acceptDevice = async () => {
    try {
        select.value == "sensor" ?
            await addDevice("dispositivos", { nombre: nameDevice.value, sala: room.value, temp: temp.value, tipo: select.value }) :
            await addDevice("dispositivos", { nombre: nameDevice.value, sala: room.value, estado: status.value, tipo: select.value });
        closeModal();
    } catch (error) {
        alert(error);
    }

}


</script>

