<script setup lang="ts">
import ArrowSelecte from '~/Icons/ArrowSelecte.vue';
import type roles from '~/constants/roles'
import type location from '~/constants/location'
const value = defineModel<{ [key: string]: string | number | boolean }>('value')
const errors = defineModel<{ [key: string]: string | null }>('errors')
const { id, required, options, nameLabel } = defineProps<{
    id: string,
    required: boolean,
    options: typeof roles | undefined | typeof location | Array<{ value: string, label: string }>,
    nameLabel: string | undefined
}>()
const handlerSelecte = (valueOption: string) =>
    value.value = { ...value.value, [id]: valueOption }
</script>
<template>
    <div class="group relative py-1">
        <div
            class="h-10 px-2 bg-transparent rounded-lg outline-none border-2 border-gray-dark-color flex items-center gap-1 justify-between">
            <label>
                {{ value && value[id] || nameLabel
                }}
                <span v-if="(required && value)
                    && (typeof value[id] === 'string'
                        && value[id].length === 0)" class="text-red-500">*</span>
            </label>
            <ArrowSelecte class="group-hover:rotate-180 transition-all" />
        </div>
        <ul
            class="hidden group-hover:block rounded-lg border-2 border-gray-dark-color px-2 absolute z-20 top-[41px] bg-white w-full max-h-[8rem] overflow-y-auto no-scrollbar">
            <li v-for="(option, index) in options"
                @click="() => handlerSelecte(typeof option === 'object' ? option.value : option)"
                :class="`cursor-pointer py-2 ${options && index === options.length - 1 ? '' : 'border-b-2 border-gray-dark-color'}`">
                {{ typeof option === 'object' ? option.label : option }}
            </li>
        </ul>
        <span v-if="errors && errors[id]" id="error" class="text-small font-bold pl-4 text-red-500">
            {{ errors && errors[id] }}
        </span>
    </div>
</template>