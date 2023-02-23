<template>
    <div class="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0 -mt-24">
        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Bienvenido, introduzca sus credenciales.
                </h1>
                <form class="space-y-4 md:space-y-6" @submit.prevent=checkUserPassword>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo
                            Electrónico</label>
                        <input v-model="email" type="text" name="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca Email" >
                    </div>
                    <div>
                        <label for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                    </div>
                    <div>
                        <p v-if="erroMsg">{{ erroMsg }}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Recuérdate</label>
                            </div>
                        </div>
                        <a href="#"
                            class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste
                            la contraseña?</a>
                    </div>
                    <button type="submit"
                        class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Aceptar</button>
                    <div
                        class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <button @click="signInWithGoogle">Sign In With Google</button>
                    </div>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        ¿No tienes cuenta todavía? <a @click="dialog = true"
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500">Regístrate</a>
                    </p>
                </form>
            </div>
        </div>
    </div>

    <CreateUser v-show="dialog" @CloseModal="dialog = false" />
</template>

<script setup>

import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { useRouter } from 'vue-router'
import CreateUser from './ModalCreateUser.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const erroMsg = ref()
const dialog = ref()

// Chekea la password del usuario registrado y recogemos el error en caso de cumplir requisitos

const checkUserPassword = async () => {
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    console.log('Entrada exitosa')
    router.push('/dashboard')
  } catch (error) {
    console.log(error.code)
    switch (error.code) {
      case 'auth/invalid-email':
        erroMsg.value = 'E-mail incorrecto'
        break
      case 'auth/user-not-found':
        erroMsg.value = 'No se encuentra cuenta para ese Email'
        break
      case 'auth/wrong-password':
        erroMsg.value = 'Contraseña incorrecta'
        break
      default:
        erroMsg.value = 'E-mail o password incorrecto'
        break
    }
  }
}

// Para conexion con google crea un Popup

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(getAuth(), provider)
    router.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
}

</script>
