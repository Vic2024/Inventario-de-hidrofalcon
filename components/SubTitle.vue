<script setup lang="ts">
interface Props {
    readonly title?: string | null,
    readonly width?: string,
    readonly cristal?: boolean,
    readonly id?: string,
    readonly hidden?: boolean
}
const { title, width, cristal, id, hidden } = defineProps<Props>()

</script>
<template>
    <div :id="id" :class="`${hidden ? 'hidden' : ''} flex gap-2 items-center justify-center px-8 pb-4`">
        <hr class="border border-primary-color flex-1">
        <h3
            :class="`text-h3 ${cristal ? 'text-white' : 'text-[#1e1e1e]'} font-bold  text-center ${width ? width : ''}`">
            {{ title ?? 'TITLE SECTION' }}</h3>
        <hr class="border border-primary-color flex-1">
    </div>
</template>
