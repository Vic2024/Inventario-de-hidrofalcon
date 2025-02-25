<script setup lang="ts">
import SectionTitle from '~/components/SectionTitle.vue';
import SubTitle from '~/components/SubTitle.vue';
import Controls from '~/components/Controls.vue';
import Table from '~/components/Table/Table.vue';
import RadioButtons from '~/components/Dashboard/RadioButtons.vue'
import ModalDashboard from '~/components/Dashboard/ModalDashboard.vue';
import InputDashboard from '~/components/Form/InputDashboard.vue';
import InputSelecte from '~/components/Dashboard/InputSelecte.vue';
import TextArea from '~/components/Form/TextArea.vue';
import Loader from '~/components/Loader.vue';
import PaginationMobile from '~/components/Dashboard/PaginationMobile.vue';
import usePage from '~/composable/usePage';
import CheckBox from '~/components/Dashboard/CheckBox.vue';
import { filterBoxs, initValues, initErrors, form } from '~/constants/detailsPage';
import getSubTitle from '~/composable/get-subtitle';
import { toTable, toModal, toPagination, toFilter, toSearch } from '~/types';
import { renderForm, upperFirstLetter } from '~/helper/page'
const route = useRoute()

const titlePage = upperFirstLetter(route.params.categories)
const subtitle = await getSubTitle()
definePageMeta({
    middleware: ['is-login', 'is-correct-equipment', 'is-correct-details']
})
useHead(() => ({
    title: `${titlePage} - ${subtitle}`,
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
} = await usePage(`/api/${route.params.categories}/${route.params.details}`, initValues, initErrors, ['Serial', 'Descripcion', 'Ubicacion', 'Estado', 'Fecha de creacion', 'Creado Por', 'Fecha de Modificacion', 'Modificado Por'])
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
            <SectionTitle id="titlePage" :title="titlePage" />
            <SubTitle id="subTitlePage" :title="subtitle" />
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
                    <SubTitle id="editSub" :title="subtitle" />
                    <div class="px-8 flex flex-col">
                        <div v-if="formMethodHTTP.methodHTTP === 'POST' || formMethodHTTP.methodHTTP === 'PUT'"
                            v-for="input in form">
                            <div v-if="renderForm(input.id, formValues)">
                                <InputDashboard v-if="input.typeInput === 'normalInput'" v-model:errors="formErrors"
                                    v-model:value="formValues" :id="input.id" :label-name="input.labelName"
                                    :required="input.required" :type="input.type" :id-help-message="input.idHelpMessage"
                                    :help-message="input.helpMessage" />
                            </div>
                            <InputSelecte v-if="input.typeInput === 'selectInput'" :id="input.id"
                                :nameLabel="input.nameLabel" :required="input.required" :options="input.options"
                                v-model:errors="formErrors" v-model:value="formValues" />
                            <TextArea v-if="input.typeInput === 'textArea'" v-model:errors="formErrors"
                                v-model:value="formValues" :id="input.id" :label-name="input.labelName"
                                :required="input.required" :type="input.type" :id-help-message="input.idHelpMessage"
                                :help-message="input.helpMessage" />
                        </div>
                        <div class="py-4 flex flex-col gap-2 items-center">
                            <h3 class=" text-h3 text-text-color">Estado</h3>
                            <div class="flex gap-2">
                                <CheckBox v-model:filter="formValues.estado" title="Activo" id="active"
                                    value="Activo" />
                                <CheckBox v-model:filter="formValues.estado" title="Inactivo" id="inactive"
                                    value="Inactivo" />
                            </div>
                            <span v-if="formErrors.estado" id="error" class=" text-small font-bold pl-4 text-red-500">
                                {{ formErrors.estado }}
                            </span>
                        </div>
                        <button id="buttonSubmit" @click="submit"
                            class="self-center px-8 mt-4 py-4 rounded-lg text-white bg-primary-color text-normal font-bold">
                            Agregar
                        </button>
                    </div>
                </div>
            </ModalDashboard>
        </ClientOnly>
    </NuxtLayout>
</template>
