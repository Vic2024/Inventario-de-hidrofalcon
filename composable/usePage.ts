import type { initValues, initErrors, methodOptions, data, formMethodHTTP, resultGetData } from "~/types"
import { useEquipment } from "./useEquipment"
import type { Reactive, Ref } from "vue"
import useModal from "./useModal"
import { watchDebounced } from '@vueuse/core'
import convertToPdf from "./generatePDF"
import dataDate from "./dataDate"

const usePage = async (url: string, initValues: initValues, initErrors: initErrors, titles: string[]) => {
    const router = useRoute()
    const equipment = useEquipment()
    const isInEquipmentPage = router.path.split('/')[2] === 'equipos'
    const { push } = useRouter()
    const { closeModal } = useModal()
    const data: Reactive<data> =
        reactive({ get: null, isPending: true, currentPage: 1, pages: null, titles: null, perPage: null })
    const formMethodHTTP: Ref<formMethodHTTP> = ref({ methodHTTP: 'POST' })
    const formValues: Ref<initValues> = ref({ ...initValues })
    const formErrors: Ref<initErrors> = ref({ ...initErrors })
    const filter: Reactive<{ isActive: boolean, filter: string }> =
        reactive({ isActive: false, filter: '' })
    const search = ref('')
    const filterInput = ref('')

    const resetForm = () => {
        formValues.value = { ...initValues }
        formErrors.value = { ...initErrors }
    }

    const changePage = (page: number) => {
        data.currentPage = page
        getData()
    }

    async function submit() {
        const type: methodOptions = formMethodHTTP.value.methodHTTP
        try {
            // @ts-ignore
            const result: { [propName: string]: { [propName: string]: string } } = await $fetch(url, {
                method: type,
                body: { ...formValues.value }
            })
            if (result) {
                if (type === 'POST' || type === 'DELETE') {
                    data.currentPage = 1
                    resetForm()
                    closeModal('modal')
                    getData()
                    if (isInEquipmentPage) {
                        if(equipment.value){
                            equipment.value.push({ id: result.equipment.id, equipment: result.equipment.equipment })
                        }
                    }
                } else {
                    const dataToEdit = result[Object.keys(result)[0]]
                    if (data.get) {
                        const index = data.get.findIndex((el) => dataToEdit.id === el.id)
                        data.get[index] = { ...dataToEdit }
                    }
                    if (isInEquipmentPage) {
                        if(equipment.value){
                            const indexEquipment = equipment.value.findIndex((eq) => dataToEdit.id === eq.id)
                            equipment.value[indexEquipment] = { id: dataToEdit.id, equipment: dataToEdit.equipment }
                        }
                    }
                    resetForm()
                    closeModal('modal')
                }

            }
        } catch (err: any) {
            if (err.statusCode === 400 || err.statusCode === 401) {
                formErrors.value = { ...initErrors, ...err.data.data }
            }
        }

    }

    function handleFilter(valueToFilter: Ref<string > | string) {
        const value = valueToFilter.toString()
        console.log(search.value)
        const isFirstPage = data.currentPage <= 1 ? {} : { page: data.currentPage }
        const isValueToFilter = value.length > 0 && search.value.length > 0
            ? { [value]: search.value }
            : { [value]: '' }
        if (value !== 'reiniciar') {
            filter.isActive = true
            filter.filter = value
            push({ query: { ...isFirstPage, ...isValueToFilter } })
        } else {
            const isSearch = search.value.length > 0 ? { search: search.value } : {}
            push({ query: { ...isFirstPage, ...isSearch } })
            filter.isActive = false
            filter.filter = ''
        }
        closeModal('modal-filter')
    }

    async function generatePDF() {
        const result: resultGetData = await $fetch(`${url}`, {
            method: 'GET',
            query: { pdf: true }
        })
        convertToPdf(url, result.data, titles)
    }

    watchDebounced(search,
        () => {
            data.currentPage = 1
            getData()
        },
        { debounce: 500, maxWait: 2000 },
    )


    async function getData() {
        data.isPending = true
        try {
            const result: resultGetData = await $fetch(`${url}`, {
                method: 'GET',
                query: { page: data.currentPage, search: search.value, filter: filter.filter }
            })
            data.get = result.data
            data.currentPage = result.current
            data.pages = result.count
            data.titles = Array(result.data ? result.data.length : 0).fill(titles)
            data.perPage = result.perPage
            dataDate(result.data)
            const urlOption: { query: { [propsName: string]: string | number } } =
                data.currentPage === 1 ? { query: {} } : { query: { page: data.currentPage } }
            if (filter.isActive !== false) {
                if (search.value.length > 0) urlOption.query[filter.filter] = search.value
                else urlOption.query[filter.filter] = search.value
            } else {
                if (search.value.length > 0) urlOption.query.search = search.value
            }
            push(urlOption)
        } catch (err) {

        } finally { setTimeout(() => data.isPending = false, 5000) }

    }

    onMounted(() => getData())

    return {
        submit,
        formMethodHTTP,
        formValues,
        formErrors,
        data,
        handleFilter,
        search,
        filter,
        filterInput,
        resetForm,
        changePage,
        getData,
        generatePDF
    }
}

export default usePage