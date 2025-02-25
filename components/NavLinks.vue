<script setup lang="ts">
interface Props {
    to?: string;
    label?: string;
}
const { to, label } = defineProps<Props>()
</script>
<template>
    <NuxtLink :to="to"
        class="flex w-full flex-col p-4 desktop:px-8 transition-all hover:bg-gray-color/35 desktop:flex-row desktop:gap-4 items-center justify-center font-bold text-primary-color text-normal">
        <slot /> {{ label }}
    </NuxtLink>
</template>
