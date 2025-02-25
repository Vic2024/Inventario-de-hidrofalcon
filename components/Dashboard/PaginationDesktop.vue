<script setup lang="ts">
import Arrow from '~/Icons/Arrow.vue';
import { toPagination } from '~/types';
const props = inject(toPagination)
</script>
<template>
    <div class="hidden desktop:flex desktop:flex-row items-center gap-4 ml-auto mr-4 font-bold">
        Pagina
        <div class="relative group">
            <button
                class="flex flex-row gap-3 text-center justify-between px-2 py-1 border-2 border-primary-color rounded-md">
                <span>{{ props?.data.currentPage }}</span>
                <div class="group-hover:rotate-180 duration-300 transition-all">
                    <Arrow />
                </div>
            </button>
            <ul
                class="invisible opacity-0 transition-all ease-in-out duration-300
             group-hover:visible group-hover:opacity-100 absolute top-[2.1rem] w-full py-1 bg-white flex flex-col gap-2 border-2 border-primary-color rounded-md">
                <button v-for="page in props?.data.pages" @click="() => props?.changePage(page)" 
                    :disabled="page === props?.data.currentPage"
                    class="px-2 text-center w-full disabled:bg-gray-color/35 hover:bg-gray-color/35 cursor-pointer">{{ page }}</button>
            </ul>
        </div>
        de
        <span>{{ props?.data.pages }}</span>
    </div>
</template>