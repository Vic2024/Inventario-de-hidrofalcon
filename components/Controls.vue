<script setup lang="ts">
import Filter from '~/Icons/Filter.vue';
import Add from '~/Icons/Add.vue';
import Update from '~/Icons/Update.vue';
import DocumenReport from '~/Icons/DocumenReport.vue';
import DashboardButton from './Dashboard/DashboardButton.vue';
import SearchInput from './Dashboard/SearchInput.vue';
import useModal from '~/composable/useModal';
import PaginationDesktop from './Dashboard/PaginationDesktop.vue';
import FilterDesktop from './Dashboard/FilterDesktop.vue';
import { useAuthUser } from '~/composable/useAuthUser';
import { toTable } from '~/types';
const route = useRoute()
const isEquipPage = route.path.split('/')[2] === 'equipos'
const { openModal } = useModal()
const props = inject(toTable)
function handlerModal() {
    const mainTitle = document.getElementById('mainTitle') as HTMLElement
    const button = document.getElementById('buttonSubmit') as HTMLElement
    const subTitle = document.getElementById('editSub') as HTMLElement
    const [_, title] = mainTitle.childNodes as NodeListOf<HTMLElement>
    subTitle.classList.add('hidden')
    title.innerText = 'AGREGAR'
    button.innerHTML = 'Agregar'
    if (props) props.formMethodHTTP.value.methodHTTP = "POST"
    openModal('modal')
}

</script>
<template>
    <div class="flex flex-col desktop:flex-row gap-3 desktop:gap-4 items-center">
        <div class="flex justify-evenly gap-4">
            <DashboardButton v-if="!isEquipPage" class="desktop:hidden" label="Filtrar"
                :click="() => openModal('modal-filter')">
                <Filter />
            </DashboardButton>
            <FilterDesktop v-if="!isEquipPage" />
            <DashboardButton :disable="useAuthUser().value?.role?.role.toLowerCase() === 'visitante'" label="Agregar"
                :click="handlerModal">
                <Add />
            </DashboardButton>
        </div>
        <div class="flex justify-evenly w-full desktop:w-auto">
            <DashboardButton label="Actualizar tabla" :click="props && props.getData">
                <Update />
            </DashboardButton>
        </div>
        <div class="flex justify-evenly w-full desktop:w-auto">
            <DashboardButton label="Generar Reporte" :click="props && props.generatePDF">
                <DocumenReport />
            </DashboardButton>
        </div>
        <SearchInput placeholder="Buscar Usuario..." />
        <PaginationDesktop />
    </div>
</template>