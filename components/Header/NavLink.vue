<script setup lang="ts">
interface Props {
    href?: string;
    title?: string;
}
const { href, title } = defineProps<Props>()
</script>
<template>
    <a class="desktop:hover:bg-transparent desktop:hover:opacity-50 desktop:hover:text-primary-color desktop:py-0 desktop:p-4 flex gap-2 justify-center items-center p-4 text-h3 font-bold text-center text-primary-color hover:text-secondary-color hover:bg-primary-color transition-all"
        :href="`#${href}`">
        <slot /> {{ title }}
    </a>
</template>