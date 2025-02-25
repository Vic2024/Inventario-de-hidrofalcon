<script setup lang="ts">
import Filter from '~/Icons/Filter.vue';
import CheckBox from './CheckBox.vue';
import { toFilter } from '~/types';
const props = inject(toFilter)
const handleFilter = (props && props.handleFilter)! 
const filterInput = (props && props.filterInput)!
</script>
<template>
    <div class="hidden desktop:block group relative">
        <button class="bg-white peer p-4 shadow-xl rounded-lg text-normal font-normal flex gap-2 items-center">
            <Filter />
            Filtrar
        </button>
        <ul
            class="flex invisible opacity-0 transition-all ease-in-out duration-300
             group-hover:visible group-hover:opacity-100
             flex-col gap-4 items-start absolute -left-6 top-[120%] rounded-lg bg-white max-h-60 p-2 overflow-y-auto no-scrollbar w-40  shadow-xl">
            <li v-for="box in props?.filterBoxs" class="border-b-2 pb-2 w-full self-start">
                <CheckBox v-model:filter="filterInput" :title="box.title" :id="box.id" :value="box.value" />
            </li>
            <button @click="() => handleFilter(filterInput)"
                class=" w-full py-4 rounded-lg text-white bg-primary-color text-small font-bold">
                Aplicar Filtro
            </button>
        </ul>
    </div>
</template>
