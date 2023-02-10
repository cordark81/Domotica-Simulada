<template>
    <h1 class="mb-10 text-lg">Nuevo usuario</h1>
    <div>
        <div class="w-full max-w-xs ml-8">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="checkUserPassword">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        v-model=email id="emailCreate" type="email" placeholder="email">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        v-model=password id="passwordCreate" type="password" placeholder="******************">
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div class="flex items-center justify-between">
                    <button
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
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");


const emits = defineEmits(["CloseModal"])

const closeModal = () => {
    emits("CloseModal")
    resetNewUser();
}

const checkUserPassword = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Autentificación exitosa");
            router.push('/dashboard');
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })

}

const resetNewUser = () => {

    email.value = "";
    password.value = "";

}

</script>

