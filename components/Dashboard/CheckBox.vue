<script setup lang="ts">
interface Props {
    title?: string,
    id?: string,
    value?: string
}
const { title, id, value } = defineProps < Props > ()
const filter = defineModel('filter')
</script>
<template>
    <div class="flex gap-10">
        <div class="inline-flex items-center">
            <input name="framework-custom-icon" hidden type="radio" v-model="filter" class="peer transition-all hidden"
                :id="id" :value="value" />
            <label
                class="relative flex items-center cursor-pointer border-2 rounded-full size-5 peer-checked:border-primary-color peer-checked:[&>span]:opacity-100"
                :for="id">
                <span
                    class="absolute size-3 text-primary-color rounded-full opacity-0 peer-checked:opacity-100 transition-opacity top-2 left-2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        stroke="currentColor" stroke-width="1">
                        <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                </span>
            </label>
            <label class="ml-2 text-text-color cursor-pointer text-normal desktop:text-small" :for="id">
                {{ title }}
            </label>
        </div>
    </div>
</template>
<style>
.icon{
    width: 12px;
    height: 12px;
}
</style>