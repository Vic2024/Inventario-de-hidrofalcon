<script setup lang="ts">
import SectionTitle from '~/components/SectionTitle.vue';
import Return from '~/Icons/Return.vue'
import Footer from '~/components/Footer.vue';
import NormalInput from '~/components/Form/NormalInput.vue';
import { useAuth } from '~/composable/useAuth';
useHead(() => ({
    title: 'Login - inventario del area de informatica',
}))
const { data: login, submit } = useAuth({
    initLogin: { username: '', password: '' },
    initErrors: { username: null, password: null, isLogin: null }
})
</script>
<template>
    <section class="h-screen flex flex-col justify-between">
        <NuxtLayout name="header">
            <ul class="h-full flex items-center justify-between w-full ">
                <NuxtLink to="/" class="mx-4 text-primary-color">
                    <Return />
                </NuxtLink>
                <img class="object-cover size-16" src="/public/img/Logo Hidrofalcon.png" />
            </ul>
        </NuxtLayout>
        <div class="flex flex-col desktop:hidden">
            <SectionTitle title="Sesión de usuario" />
            <NuxtLayout name="normal-from">
                <img class="size-[100px] object-cover" src="/public/img/inventario.png" alt="Imagen de Inventario">
                <NormalInput v-model:errors="login.errors" v-model:value="login.values"
                    help-message="Este campo debe de tener al menos 8 caracteres" required
                    id-help-message="helpUsername" label-name="Nombre de Usuario" id="username" />
                <NormalInput v-model:errors="login.errors" v-model:value="login.values"
                    help-message="Este campo debe de tener al menos 8 caracteres" required
                    id-help-message="helpPassword" type="password" label-name="Contraseña" id="password" />
                <NuxtLink to="recoverPass" class="text-text-color text-normal font-bold">
                    ¿Olvidaste la contraseña?
                </NuxtLink>
                <span v-if="login.errors['isLogin']" id="error" class="text-small font-bold pl-4 text-red-500">
                    {{ login.errors['isLogin'] }}
                </span>
                <button type="button" @click="submit"
                    class="py-4 px-16 text-normal text-white rounded-lg bg-primary-color">
                    Iniciar sesión
                </button>
            </NuxtLayout>
        </div>
        <div class="hidden desktop:flex flex-col justify-center items-center flex-1">
            <img class="object-fill w-[300px] h-[300px]" src="/public/img/Logo Hidrofalcon.png" />
            <div class="flex flex-col gap-4 items-center">
                <h2 class="text-h2 text-text-color">
                    Esta pagina solo esta disponible para dispositivos moviles
                </h2>
                <h3 class="text-h3 text-text-color">
                    Por favor, Regresar a la pagina inicial para ingresar al sistema
                </h3>
            </div>
        </div>
        <div class="pb-16 desktop:pb-0">
            <Footer />
        </div>
    </section>
</template>
