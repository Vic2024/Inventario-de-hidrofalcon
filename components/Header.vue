<script setup lang="ts">
import Menu from '../Icons/Menu.vue';
import NavLink from './Header/NavLink.vue';
import LightBuld from '~/Icons/LightBuld.vue';
import Values from '../Icons/Values.vue'
import Department from '../Icons/Department.vue'

const handlerMenu = () => {
    const nav = document.querySelector('.menu')
    if (nav instanceof HTMLElement) {
        nav.classList.toggle('opacity-100')
        nav.classList.toggle('pointer-events-auto')
    }
}

onMounted(() => {
    document.addEventListener("click", (e: MouseEvent) => {
        const targetElement = e.target as HTMLElement
        if (!targetElement.matches(".menu a")) return false
        const menuElement = document.querySelector('.menu a') as HTMLElement
        menuElement.classList.remove('opacity-100')
        menuElement.classList.remove('pointer-events-auto')
    })

})


</script>
<template>
    <header
        class="fixed z-[1] bottom-0 h-16 w-full bg-white shadow-xl desktop:sticky desktop:top-0 desktop:p-2 desktop:flex desktop:justify-between">
        <ul class="h-full flex items-center justify-between ">
            <button @click="handlerMenu" class="desktop:hidden mx-4 text-primary-color">
                <Menu />
            </button>
            <a href="#inicio">
                <img class="object-fill w-16 h-16" src="/public/img/Logo Hidrofalcon.png" />
            </a>
        </ul>
        <nav
            class="menu desktop:static desktop:w-auto desktop:pointer-events-auto desktop:opacity-100 desktop:flex-row fixed left-0 bottom-16 w-full flex flex-col bg-secondary-color pointer-events-none opacity-0 transition-opacity duration-500">
            <NavLink title="Ideales" href="Ideales">
                <LightBuld />
            </NavLink>
            <NavLink title="Valores" href="Valores">
                <Values />
            </NavLink>
            <NavLink title="Departamento del Sistema" href="Departamento">
                <Department />
            </NavLink>
        </nav>
    </header>
</template>
