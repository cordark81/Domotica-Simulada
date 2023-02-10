<template>
    <div class="flex flex-auto justify-center">
        <h1 class="ml-80 text-6xl text-center mb-10"> Dashboard</h1>
        <button
            class="flex ml-auto mr-10 mt-4 w-32 h-12 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            @click="handleSignOut" v-if="isLoggedIn">Desconectar </button>
    </div>
    <div class="flex flex-wrap justify-center gap-7">
        <CardRoom v-for="room in rooms" :name="room.Sala.nombre" />

    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { onDameSalas } from '../utils/firebase';
import { useRouter } from 'vue-router';
import CardRoom from '../components/Rooms/CardRoom.vue';

const rooms = ref([]);
const router = useRouter();
const isLoggedIn = ref(false);

let auth;

onMounted(async () => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        (user) ? isLoggedIn.value = true : isLoggedIn.value = false;
    })

    await onDameSalas("Salas", docs => {
        rooms.value = [];
        docs.forEach((doc) => {

            rooms.value.push(JSON.parse(doc.data().datos));

        })

    })

})

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push("/");

    })
}

</script>

