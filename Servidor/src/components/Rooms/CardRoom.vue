<template>
    <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-blue-600 w-72">
        <div class="flex flex-row justify-center">
            <img class="w-16 h-16 ml-5 mt-5" src="../../assets/Imagenes/4792184.png" alt="Habitacion">
            <div class="font-bold text-xl mb-2 ml-5 p-6 mt-5">{{ name }}</div>
        </div>
        <div class="px-6 py-4">
            <p class="text-gray-700 text-base">
                Sensores
            </p>
        </div>
        <div class="px-6 pt-4 pb-2 flex">
            <button class="w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Añadir</button>
            <button class="ml-5 w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Borrar</button>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
	name: {type: String}
})



</script>

