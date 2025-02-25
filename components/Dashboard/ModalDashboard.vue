<script setup lang="ts">
import Close from '~/Icons/Close.vue';
import useModal from '~/composable/useModal';
import { toModal } from '~/types';
const { closeModal } = useModal()
const props = inject(toModal)
const { id } = defineProps<{ id: string }>()

const handlerCloseModal = () => {
    closeModal(id)
    if (props?.resetForm) setTimeout(() => props.resetForm(), 500)
}
</script>
<template>
    <dialog :id="id" class="animate-modal w-full p-4 h-full fixed  z-20 top-0 left-0 bg-black/50">
        <div class="flex flex-col justify-center items-center content-center  h-full w-full">
            <div
                class="bg-white rounded-2xl w-full p-4  desktop:w-1/2 flex flex-col desktop:max-h-[500px] desktop:overflow-auto desktop:no-scrollbar">
                <button @click="handlerCloseModal" class="size-6 text-primary-color self-end">
                    <Close />
                </button>
                <slot />
            </div>
        </div>
    </dialog>
</template>
<style>
.animate-modal[open] {
    opacity: 1;
    transition: opacity .3s ease-in-out;

    @starting-style {
        opacity: 0;
    }
}

.animate-modal {
    transition: opacity .3s ease-in-out, display .3s allow-discrete;
    opacity: 0;
}
</style>