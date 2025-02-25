<script setup lang="ts">
import Edit from '~/Icons/Edit.vue';
import Delete from '~/Icons/Delete.vue';
import Details from '~/Icons/Details.vue';
import useModal from '~/composable/useModal';
import { useAuthUser } from '~/composable/useAuthUser';
import { toTable } from '~/types';
import type { RecordWithoutEquipo, UserWithoutPassword } from '~/types';
const { openModal } = useModal()
const props = inject(toTable)
const datas = (props && props.data.get)!
const route = useRoute()
const isUserRoot = route.path.split('/')[2] === 'usuarios'
const isEquipPage = route.path.split('/')[2] === 'equipos'

function modification(title: string, subtitle: string | null, textButton: string) {
    const subTitle = document.getElementById('editSub') as HTMLElement
    const button = document.getElementById('buttonSubmit') as HTMLElement
    const mainTitle = document.getElementById('mainTitle') as HTMLElement
    const [_, editSub] = subTitle.childNodes as NodeListOf<HTMLElement>
    if (subtitle !== null) {
        subTitle.classList.remove('hidden')
        editSub.innerText = subtitle
    }
    const [, titleHTML,] = mainTitle.childNodes as NodeListOf<HTMLElement>
    titleHTML.innerText = title
    button.innerText = textButton

}

function editData(dataToEdit: UserWithoutPassword | RecordWithoutEquipo) {
    if (props) {
        props.formMethodHTTP.value.methodHTTP = 'PUT'
        const subTitle: string | null = isUserRoot ? dataToEdit.username : null
        modification('EDITAR', subTitle, `Editar`)
        openModal('modal')
        const data: { [key: string]: any } = {}
        Object.keys(dataToEdit).forEach(to => {
            if (typeof dataToEdit[to] !== 'object') {
                data[to] = dataToEdit[to]
            } else {
                Object.keys(dataToEdit[to]).forEach(e => data[to] = dataToEdit[to][e])
            }
        })
        props.formValues.value = { ...data }
    }
}

function deleteData(dataToDelete: UserWithoutPassword | RecordWithoutEquipo) {
    if (props) {
        props.formMethodHTTP.value.methodHTTP = 'DELETE'
        modification('ELIMINAR', dataToDelete.username, 'Eliminar')
        props.formValues.value = { ...dataToDelete, role: dataToDelete.role.role }
        openModal('modal')
    }
}

</script>
<template>
    <tbody class="flex-1 sm:flex-none">
        <tr v-for="(data, index) in datas" :key="index"
            class="flex flex-col flex-no wrap desktop:table-row mb-2 desktop:mb-0">
            <td v-for="(key) in Object.keys(data).filter(e => e !== 'id')" :key="data.id"
                class="border-grey-light border p-3">
                {{ typeof data[key] === 'object' ? data[key][Object.keys(data[key])[0]] : data[key] }}
            </td>
            <td class="flex-1 items-center justify-center justify-items-center border-grey-light border p-3">
            <div class="flex flex-row gap-2">
                <button v-if="useAuthUser().value?.role.role.toLowerCase() !== 'visitante'"
                    @click="() => editData({ ...data })">
                    <Edit />
                </button>
                <button v-if="isUserRoot" @click="() => deleteData({ ...data })">
                    <Delete />
                </button>
                <NuxtLink v-else-if="route.path.split('/').filter((r: string) => r !== '').length < 3 && !isEquipPage"
                    :href="`${route.fullPath}/${data.id}`">
                    <Details />
                </NuxtLink>
            </div>
            </td>
        </tr>
    </tbody>
</template>