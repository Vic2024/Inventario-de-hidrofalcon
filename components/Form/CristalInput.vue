<script setup lang="ts">
import useForm from '~/components/Form/form';
import ShowPass from '~/Icons/ShowPass.vue';
import HiddenPass from '~/Icons/HiddenPass.vue'
import Help from '~/Icons/Help.vue';
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
  helpMessage?: string,
}
const { labelName, id, required, type, idHelpMessage, helpMessage } = defineProps<Props>()

</script>
<template>
  <div class="flex flex-col gap-2 justify-start items-start">
    <label class="text-normal w-full px-4 text-white flex flex-row justify-between items-center text-center"
      for="username">
      <div class="flex flex-row justify-between gap-2">
        {{ labelName }}
        <span v-if="required" class="text-red-500">*</span>
      </div>
      <div class='flex flex-row justify-between gap-2'>
        <button v-if="type === 'password'" :name="`${id}Button`" @click="() => showPassword(id, `${id}Button`)"
          type="button" aria-expanded="true" aria-haspopup="true">
          <ShowPass />
          <HiddenPass />
        </button>
        <button @click="() => handlerHelpMessage(idHelpMessage)" type="button" aria-expanded="true"
          aria-haspopup="true">
          <Help />
        </button>
      </div>
    </label>
    <input class="w-full rounded-lg bg-white/15 px-2 text-white outline-none" :type="`${type ?? 'string'}`" :name="id"
      v-model="value[id ?? '']" />
    <span v-if="errors[id ?? ''] === undefined || errors[id ?? ''] === null" :id="idHelpMessage"
      class="hidden text-small pl-4 text-white">
      {{ helpMessage }}
    </span>
    <span v-if="errors[id ?? '']" id="error" class="text-small font-bold pl-4 text-red-500">
      {{ errors[id ?? ''] }}
    </span>
  </div>
</template>