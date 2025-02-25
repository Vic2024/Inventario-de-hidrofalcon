<script setup lang="ts">
import useMenu from '~/composable/useMenu';
import Menu from '~/Icons/Menu.vue';
import NavLinks from '~/components/NavLinks.vue';
import { logout } from '~/composable/useAuth';
import { useAuthUser } from '~/composable/useAuthUser'
import { useEquipment } from '~/composable/useEquipment';
const user = useAuthUser()
const { role } = user.value?.role
const loading = ref(false)

const onLogout = async () => {
    try {
        loading.value = true
        await logout()
        await navigateTo('/')
    } catch (err) {
        console.log(err)
    } finally {
        loading.value = false
    }
}
const { handlerMenu } = useMenu()
const equipments = useEquipment()
const { data } = await useFetch<{ categories: { equipment: string, id: string }[] }>('/equipments/getEquipments', { method: 'get' })
equipments.value = data.value?.categories
const upperFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

</script>
<template>
    <aside id="aside"
        class="[grid-area:aside] flex items-center  justify-between desktop:block pr-2 desktop:pr-0 sticky desktop:static bottom-0 desktop:h-full z-20 w-full bg-white h-16 shadow-xl text-primary-color">
        <img class="size-16 desktop:hidden" src="/public/img/Logo Hidrofalcon.png" />
        <button class="desktop:hidden" @click="handlerMenu">
            <Menu />
        </button>
        <nav
            class="menu opacity-0 desktop:opacity-100 desktop:static desktop:py-4 transition-all ease-in-out duration-500 fixed left-0 bottom-16 w-full h-[240px] desktop:h-[473px] overflow-y-auto no-scrollbar flex flex-col bg-white ">
            <NavLinks v-for="equipment in equipments" :key="equipment.id" :to="`/dashboard/${equipment.equipment}`"
                :label="upperFirstLetter(equipment.equipment)" />
            <div v-if="role === 'superUser' || role === 'Administrador'">
                <NavLinks to="/dashboard/usuarios" label="Usuarios" />
                <NavLinks to="/dashboard/equipos" label="Equipos" />
            </div>
            <button @click="onLogout"
                class=" desktop:invisible flex w-full flex-row p-4 gap-2 transition-all hover:bg-gray-color/35  items-center justify-center font-bold text-primary-color text-normal">
                Cerrar Session
            </button>
        </nav>
    </aside>
</template>