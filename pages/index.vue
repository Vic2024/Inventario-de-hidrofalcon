<script setup lang="ts">
import Init from '../components/Sections/index/Init.vue'
import About from '../components/Sections/index/About.vue'
import Values from '../components/Sections/index/Values.vue'
import Department from '../components/Sections/index/Department.vue'
import Menu from '../Icons/Menu.vue';
import NavLink from '~/components/Header/NavLink.vue';
import LightBuld from '~/Icons/LightBuld.vue';
import ValuesIcon from '../Icons/Values.vue'
import DepartmentIcon from '../Icons/Department.vue'
import useMenu from '~/composable/useMenu';
const { handlerMenu } = useMenu()
useHead(() => ({
   title: 'Inventario del area de informatica',
}))
</script>
<template>
    <div>
        <NuxtLayout name="header">
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
                    <ValuesIcon />
                </NavLink>
                <NavLink title="Departamento del Sistema" href="Departamento">
                    <DepartmentIcon />
                </NavLink>
            </nav>
        </NuxtLayout>
        <Init />
        <About />
        <Values />
        <Department />
    </div>
</template>
