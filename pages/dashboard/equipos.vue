<script setup lang="ts">
import SectionTitle from '~/components/SectionTitle.vue';
import SubTitle from '~/components/SubTitle.vue';
import Controls from '~/components/Controls.vue';
import Table from '~/components/Table/Table.vue';
import RadioButtons from '~/components/Dashboard/RadioButtons.vue'
import ModalDashboard from '~/components/Dashboard/ModalDashboard.vue';
import InputDashboard from '~/components/Form/InputDashboard.vue';

import Loader from '~/components/Loader.vue';
import PaginationMobile from '~/components/Dashboard/PaginationMobile.vue';
import { filterBoxs, form, initValues, initErrors } from '~/constants/equipPage';
import usePage from '~/composable/usePage';
import { toModal, toTable, toPagination, toFilter, toSearch } from '~/types';
import { renderForm } from '~/helper/page';
definePageMeta({
    middleware: ['is-login', 'is-manager']
})
useHead(() => ({
    title: 'Equipos',
}))
const {
    submit,
    formMethodHTTP,
    formValues,
    formErrors,
    data,
    handleFilter,
    search,
    resetForm,
    changePage,
    getData,
    generatePDF,
    filterInput
} = await usePage('/equipments', initValues, initErrors, ['Equipos'])
provide(toModal, { resetForm })
provide(toTable, {
    data,
    formMethodHTTP,
    formValues,
    formErrors,
    getData,
    generatePDF
})
provide(toPagination, { data, changePage })
provide(toFilter, { handleFilter, filterInput, filterBoxs })
provide(toSearch, { search })


</script>
<template>
    <NuxtLayout name="dashboard">
        <div v-if="data.isPending !== true" class="flex flex-col p-4 w-full h-full">
            <SectionTitle id="titlePage" title="Equipos" />
            <Controls />
            <Table />
            <PaginationMobile />
        </div>
        <div v-else class="h-full flex justify-center items-center">
            <Loader />
        </div>
        <ClientOnly>
            <ModalDashboard id='modal-filter'>
                <div class="flex flex-col">
                    <SectionTitle title="FILTRAR POR" />
                    <div class="flex flex-col gap-4 self-center">
                        <RadioButtons v-for="box in filterBoxs" v-model:filter="filterInput" :title="box.title"
                            :id="box.id" :value="box.value" />
                    </div>
                    <button @click="handleFilter(filterInput)"
                        class="mt-4 py-4 rounded-lg text-white bg-primary-color text-normal font-bold">
                        Aplicar Filtro
                    </button>
                </div>
            </ModalDashboard>
        </ClientOnly>
        <ClientOnly>
            <ModalDashboard :resetForm="resetForm" id='modal'>
                <div class="relative flex flex-col">
                    <SectionTitle id="mainTitle" title="AGREAGAR" />
                    <SubTitle hidden id="editSub" />
                    <div class="px-8 flex flex-col">
                        <div v-if="formMethodHTTP.methodHTTP === 'POST' || formMethodHTTP.methodHTTP === 'PUT'"
                            v-for="input in form">
                            <div v-if="renderForm(input.id, formValues)">
                                <InputDashboard v-if="input.typeInput === 'normalInput'" v-model:errors="formErrors"
                                    v-model:value="formValues" :id="input.id" :label-name="input.labelName"
                                    :required="input.required" :type="input.type" :id-help-message="input.idHelpMessage"
                                    :help-message="input.helpMessage" />
                            </div>
                        </div>
                        <InputDashboard v-model:errors="formErrors" v-model:value="formValues" id="confirPassword"
                            label-name="Confirimar contraseña" required type="password"
                            id-help-message="ConfirPasswordHelpMessage"
                            help-message="Estoo es una prueba (Confirimar contraseña)" />
                        <button id="buttonSubmit" @click="submit"
                            class=" self-center px-8 mt-4 py-4 rounded-lg text-white bg-primary-color text-normal font-bold">
                            Agregar
                        </button>
                    </div>
                </div>
            </ModalDashboard>
        </ClientOnly>
    </NuxtLayout>
</template>