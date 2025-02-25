<script setup lang="ts">
import Tbody from './Tbody.vue';
import Thead from './Thead.vue';
import { toTable } from '~/types';
const props = inject(toTable)
</script>
<template>
    <div v-if="props && props.data.get && props.data.get.length > 0">
        <table
            class="w-full flex flex-row flex-no-wrap desktop:bg-white rounded-lg overflow-hidden desktop:shadow-xl my-5">
            <Thead :titles="props && props.data.titles !== null ?props.data.titles:[] " />
            <Tbody/>
        </table>
    </div>
    <div v-else class="h-full flex flex-col justify-center items-center">
        <img class="size-56" src="/public/img/Logo Hidrofalcon.png" alt="Logo Hidrofalcon">
        <h2 class="text-h2 text-center text-text-color">No se encuentra ningun registro</h2>
    </div>
</template>
<style>
@media (min-width: 834px) {
    table {
        display: inline-table !important;
    }

    thead tr:not(:first-child) {
        display: none;
    }
}

td:not(:last-child) {
    border-bottom: 0;
}

th:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, .1);
}
</style>