<script setup lang="ts">
interface Props {
    titles?: string[]
}
const { titles } = defineProps<Props>()
</script>
<template>
    <thead class="text-white">
        <tr v-for="(t, index) in titles" :key="index"
            class="bg-primary-color flex flex-col flex-no wrap desktop:table-row rounded-l-lg desktop:rounded-none mb-2 desktop:mb-0">
            <th v-for="title in t" class="p-3 text-left">{{ title.toUpperCase() }}</th>
            <th class="p-3 text-left">ACCIONES</th>
        </tr>
    </thead>
</template>