<script setup lang="ts">
import Logout from '~/Icons/Logout.vue';
import { logout } from '~/composable/useAuth';

const onLogout = async () => {
    try {
        await logout()
        await navigateTo('/')
    } catch (err) {
        console.log(err)
    } 
}

</script>
<template>
    <header class="hidden desktop:flex justify-between sticky z-10 bg-white w-full [grid-area:header] shadow-xl px-4">
        <div class="flex items-center gap-8 text-primary-color">
            <NuxtLink to="/dashboard" >
                <img class="size-16" src="/public/img/Logo Hidrofalcon.png" />
            </NuxtLink>
        </div>
        <button @click="onLogout" class="text-primary-color text-normal flex items-center font-bold gap-2">
            <Logout />
            Cerrar Session
        </button>
    </header>
</template>