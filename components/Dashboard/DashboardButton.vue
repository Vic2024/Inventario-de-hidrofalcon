<script setup lang="ts">
interface Props {
    label?: string,
    click?: (payload: MouseEvent) => void,
    disable?: boolean
}
const { label, click, disable } = defineProps<Props>()
</script>
<template>
    <button :disabled="disable" @click="click"
        class="bg-white  p-4 shadow-xl rounded-lg text-normal font-normal flex gap-2 items-center">
        <slot /> {{ label }}
    </button>
</template>