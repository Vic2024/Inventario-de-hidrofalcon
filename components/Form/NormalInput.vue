<script setup lang="ts">
import Help from '~/Icons/Help.vue'
import HelpMessage from './HelpMessage.vue';
import ShowPass from '~/Icons/ShowPass.vue';
import HiddenPass from '~/Icons/HiddenPass.vue'
import useForm from '~/components/Form/form';
import type { initValues, initErrors } from '~/types';
const { showPassword, handlerHelpMessage } = useForm()
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
    ?? ''
</script>
<template>
    <div class="p-4 mx-4 flex flex-col gap-1 w-full">
        <label :for="id"
            class="relative text-gray-dark-color font-normal px-1 flex flex-col gap-1 items-center text-center">
            <HelpMessage v-if="errors[id ?? ''] === undefined || errors[id ?? ''] === null" :message="helpMessage"
                :idHelpMessage="idHelpMessage" />
            <div class="flex flex-row justify-between w-full pr-6">
                <div>
                    {{ labelName }}
                    <span v-if="required" class="text-red-500">*</span>
                </div>
                <div class='flex flex-row justify-between gap-1'>
                    <button v-if="type === 'password'" :name="`${id}Button`"
                        @click="() => showPassword(id, `${id}Button`)" type="button" aria-expanded="true"
                        aria-haspopup="true">
                        <ShowPass />
                        <HiddenPass />
                    </button>
                    <button @click="() => handlerHelpMessage(idHelpMessage)" type="button" aria-expanded="true"
                        aria-haspopup="true">
                        <Help />
                    </button>
                </div>
            </div>
        </label>
        <input v-model="value[id ?? '']" :type="`${type ?? 'string'}`"
            class="border-2 px-2 border-gray-dark-color rounded-md" :name="id" />
        <span v-if="errors[id ?? '']" id="error" class=" text-[.9rem] font-bold pl-4 text-red-500">
            {{ errors[id ?? ''] }}
        </span>
    </div>
</template>
