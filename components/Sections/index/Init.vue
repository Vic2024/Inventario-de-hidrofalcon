<script setup lang="ts">
import CristalInput from '~/components/Form/CristalInput.vue';
import Carousel from '~/components/Carousel/Carousel.vue';
import Loader from '~/components/Loader.vue';
import { useAuth } from '~/composable/useAuth';
import { useAuthUser } from '~/composable/useAuthUser';
const { data: login, submit } = useAuth({
    initLogin: { username: '', password: '' },
    initErrors: { username: null, password: null, isLogin: null }
})

const user = useAuthUser().value


</script>
<template>
    <section id="inicio">
        <Carousel :carousel-slides="['Hidrofalcon.png', 'hidrofalcon_2.jpg', 'hidrofalcon_3.jpg', 'hidrofalcon_4.jpg']"
            :navigation="false" :pagination="false" :start-auto-play="true" :timeout="5000" :isContenido="true">
            <ClientOnly>
                <div
                    class="flex flex-col desktop:flex-row gap-4 w-full mx-8 items-center justify-center desktop:justify-around">
                    <div class="flex flex-col gap-4 justify-center items-center text-center desktop:w-[50%]">
                        <h1 class="text-h1 leading-tight font-bold desktop:text-[43px] text-white">
                            Bienvenidos al sistema de inventario de área de informática
                        </h1>
                        <NuxtLink v-if="user === null" to="/login"
                            class="desktop:hidden text-white text-center w-[70%] p-4 rounded-lg bg-primary-color text-normal font-bold">
                            Iniciar Sesion
                        </NuxtLink>
                        <NuxtLink v-else to="/dashboard"
                            class="desktop:hidden text-white text-center w-[70%] p-4 rounded-lg bg-primary-color text-normal font-bold">
                            Inicir sesion como {{ user.username }}
                        </NuxtLink>
                    </div>
                    <NuxtLayout class="w-[378px] h-[298px]" name="cristal-form">
                        <div v-if="user === null" class="flex flex-col gap-4">
                            <CristalInput v-model:errors="login.errors" v-model:value="login.values"
                                help-message="Este campo debe de tener al menos 8 caracteres" required
                                id-help-message="helpUsername" label-name="Nombre de Usuario" id="username" />
                            <CristalInput v-model:errors="login.errors" v-model:value="login.values"
                                help-message="Este campo debe de tener al menos 8 caracteres" required
                                id-help-message="helpPassword" type="password" label-name="Contraseña" id="password" />
                            <NuxtLink to="/recoverpass" v-if="login.pending !== true"
                                class="text-small font-bold text-white">
                                ¿Olvidaste la contraseña?
                            </NuxtLink>
                            <span v-if="login.errors['isLogin']" id="error"
                                class="text-small font-bold pl-4 text-red-500">
                                {{ login.errors['isLogin'] }}
                            </span>
                            <button v-if="login.pending !== true" @click="submit" type="button"
                                class="text-normal text-white bg-primary-color hover:opacity-85 transition-all self-center rounded-lg text-center py-2 px-8">Iniciar
                                Sesion
                            </button>
                            <Loader class="self-center" v-if="login.pending !== false" />
                        </div>
                        <div v-else class="flex flex-col justify-center items-center gap-4">
                            <span class="text-center text-white font-bold">
                                Se ha encontrado una session activa : {{ user.username }}
                            </span>
                            <NuxtLink to="/dashboard"
                                class="text-white text-center w-[70%] p-4 rounded-lg bg-primary-color text-normal font-bold">
                                Continuar con la session
                            </NuxtLink>
                        </div>
                    </NuxtLayout>
                </div>
            </ClientOnly>
        </Carousel>
    </section>
</template>