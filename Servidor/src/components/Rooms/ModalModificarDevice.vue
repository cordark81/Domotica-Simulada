<template>
    <transition enter-active-class="ease-out duration-300" enter-class="opacity-0" enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200" leave-class="opacity-100" leave-to-class="opacity-0">
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
                    <transition enter-active-class="ease-out duration-300"
                        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-200"
                        leave-class="opacity-100 translate-y-0 sm:scale-100"
                        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:my-8 sm:w-full sm:max-w-lg bg-blue-500 ">
                            <div class=" mx-10 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div class="w-full text-center">
                                        <div>
                                            <!--zona de introducir formulario-->
                                            <label for="name">Nombre:</label>
                                            <input type="text" name="" id="name" v-model="name">

                                        </div>
                                    </div>
                                </div>
                            </div><button @click.stop="modify"
                                class="w-24 ml-5 text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">aceptar</button>
                            <button @click.stop="emits('CloseModal')"
                                class="w-24 ml-5 text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">cancelar</button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>

import { ref } from 'vue'
import { actualizaDispositivoCampo } from '../../utils/firebase'

const props = defineProps({
  idDevice: { type: String }
})

const name = ref()

const emits = defineEmits(['CloseModal'])

const modify = () => {
  actualizaDispositivoCampo('dispositivos', props.idDevice, { nombre: name.value })
  emits('CloseModal')
}

</script>
