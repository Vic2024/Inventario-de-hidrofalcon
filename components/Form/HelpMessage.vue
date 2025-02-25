<script setup lang="ts">
interface Props{
    idHelpMessage?: string,
    message?: string,

}
const { idHelpMessage, message } = defineProps<Props>()

</script>
<template>
    <div :id="idHelpMessage" class="hidden relative p-3 m-4 w-full">
        <p class="p-2 bg-primary-color text-white text-[.9rem] break-all flex rounded-2xl">
            {{ message }}
        </p>
        <div
            class="absolute rotate-180 bottom-[2px] right-[32px] w-0 h-0 border-b-primary-color border-l-[5px] border-l-transparent border-r-transparent border-r-[5px] border-b-[10px]" />
    </div>
</template>