<script setup lang="ts">
import ShowPass from '~/Icons/ShowPass.vue';
import HiddenPass from '~/Icons/HiddenPass.vue';
import Help from '~/Icons/Help.vue';
import useForm from '~/components/Form/form';
import type { initValues, initErrors } from '~/types';
const value = defineModel<initValues>('value', { required: true })
const errors = defineModel<initErrors>('errors', { required: true })
interface Props {
    labelName?: string,
    id?: string,
    required?: boolean,
    type?: string,
    idHelpMessage?: string,
    helpMessage?: string
}
const { labelName, id, required, type, idHelpMessage, helpMessage } = defineProps<Props>()
const { showPassword, handlerHelpMessage } = useForm()
</script>
<template>
    <div class="flex flex-col self-center w-full">
        <div class="relative py-1">
            <input :name="id" v-model="value[id ?? '']" :type="`${type ?? 'string'}`" min="1"
                :class="`peer w-full ${type === 'password' ? 'pr-16 ' : 'pr-10'} h-10 px-2 bg-transparent rounded-lg outline-none border-2 border-gray-dark-color`">
            <label
                :class="`absolute pointer-events-none left-3 ${value[id ?? ''] ? 'text-small top-[-1px] border-x-2 px-2 bg-white border-gray-dark-color' : 'top-3'} text-text-color transition-all peer-focus:border-x-2 peer-focus:bg-white peer-focus:border-gray-dark-color peer-focus:px-2 peer-focus:top-[-1px] peer-focus:text-small`">
                {{ labelName }}
                <span v-if="required" class="text-red-500">*</span>
            </label>
            <div class='absolute z-10 right-3 top-3 flex flex-row justify-between gap-1'>
                <button class="text-primary-color" v-if="type === 'password'" :name="`${id}Button`"
                    @click="() => showPassword(id, `${id}Button`)" type="button" aria-expanded="true"
                    aria-haspopup="true">
                    <ShowPass />
                    <HiddenPass />
                </button>
                <button class="text-primary-color" @click="() => handlerHelpMessage(idHelpMessage)" type="button"
                    aria-expanded="true" aria-haspopup="true">
                    <Help />
                </button>
            </div>
        </div>
        <span :id="idHelpMessage" class="hidden px-2 text-small  font-bold text-primary-color">{{ helpMessage }}</span>
        <span v-if="errors[id ?? '']" id="error" class=" text-small font-bold pl-4 text-red-500">
            {{ errors[id ?? ''] }}
        </span>
    </div>
</template>