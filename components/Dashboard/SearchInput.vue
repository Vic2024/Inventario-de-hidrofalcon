<script setup lang="ts">
import Search from '~/Icons/Search.vue';
import { FILTERS, isValidFilter } from '~/constants/filters'
import { toSearch } from '~/types';
interface Props { placeholder: string }
const { placeholder } = defineProps<Props>()
const props = inject(toSearch)
const typeInput = ref('text')
const filter = ref('normal')
const search = (props && props.search) ?? ''
watchEffect(() => {
    const queryFilter = Object.keys(useRoute().query).length <= 1
        ? Object.keys(useRoute().query)[0] === 'page' || Object.keys(useRoute().query)[0] === 'search'
            ? undefined
            : Object.keys(useRoute().query)[0]
        : Object.keys(useRoute().query)[1] === 'search'
            ? undefined
            : Object.keys(useRoute().query)[1]
    if (queryFilter) {
        typeInput.value = FILTERS[queryFilter] ?? 'text'
        filter.value = Object.keys(FILTERS).find(filter => filter === queryFilter) ?? 'normal'
    } else filter.value = 'normal'
})

</script>
<template>
    <div
        :class="`bg-gray-color group transition-all  desktop:hover:w-1/5 ${isValidFilter[filter](search) ? 'desktop:w-1/5' : 'desktop:w-10'} duration-300 desktop:h-10 rounded-full shadow-xl flex desktop:relative items-center`">
        <div
            :class="`size-10 rotate-0 desktop:group-hover:rotate-[360deg] ${isValidFilter[filter](search) ? 'desktop:rotate-[360deg]' : ''} duration-300 bg-white rounded-full flex justify-center items-center`">
            <Search />
        </div>
        <input v-model="search"
            :class="`focus:outline-none outline-none w-auto desktop:w-0 desktop:group-hover:w-[81%] ${isValidFilter[filter](search) ? 'desktop:w-[81%]' : ''} duration-300 left-11 rounded-r-full h-full px-2 desktop:absolute placeholder:text-text-color text-text-color bg-transparent`"
            :type="typeInput" :placeholder="placeholder">
    </div>
</template>