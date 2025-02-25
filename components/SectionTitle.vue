<script setup lang="ts">
interface Props {
    title?: string;
    width?: string;
    cristal?: boolean;
    id?: string;
}
const { title, width, id } = defineProps<Props>()

</script>
<template>
    <div :id="id" class="flex gap-2 items-center justify-center py-4">
        <hr class="border border-primary-color flex-1">
        <h1
            :class="`text-h1 font-bold ${cristal ? 'text-white' : 'text-[#1e1e1e]'}  text-center ${width ? width : ''}`">
            {{ title ?? 'TITLE SECTION' }}</h1>
        <hr class="border border-primary-color flex-1">
    </div>
</template>
