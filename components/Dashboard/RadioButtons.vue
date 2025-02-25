<script setup lang="ts">
interface Props {
    title: string,
    id: string,
    value: string
}
const { title } = defineProps<Props>()
const filter = defineModel('filter')
function handleButton(value: string | undefined) {
    filter.value = value
}
</script>
<template>
    <button @click="handleButton(value)" id="id"
        :class="`rounded-lg border-2 border-primary-color ${filter === value ? 'bg-primary-color' : ''} cursor-pointer flex items-center gap-2 w-full px-4 py-2 transition-all`">
        <div
            :class="`relative size-5 border-2 ${filter === value ? 'border-white' : 'border-primary-color'} rounded-full`">
            <span
                :class="`absolute size-3 text-white rounded-full ${filter === value ? 'opacity-100' : 'opacity-0'} transition-opacity top-2 left-2 transform -translate-x-1/2 -translate-y-1/2`">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor"
                    stroke-width="1">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </span>
        </div>
        <span :class="`${filter === value ? 'text-white' : 'text-text-color'} text-normal`">{{ title }}</span>
    </button>
</template>