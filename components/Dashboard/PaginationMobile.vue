<script setup lang="ts">
import { toPagination } from '~/types'
const sectionButton = ref(1)
const props = inject(toPagination)
const length = props && props.data.pages
const perPage = (props && props.data.perPage) ?? 0
const currentPage = (props && props.data.currentPage) ?? 0
const pages = (props && props.data.pages) ?? 0
function changePage(...params: (string | number)[]) {
    if (params.length > 0 && params.length < 3) {
        const [action, current] = params
        if (typeof action === 'string' && typeof current === 'number') {
            const option: { [key: string]: (arr: any | number) => void } = {
                'next': () => {
                    if (props) {
                        props.data.currentPage++
                        if (props.data.currentPage === sectionButton.value * perPage + 1) sectionButton.value++
                    }

                },
                'prev': () => {
                    if (props) {
                        props.data.currentPage--
                        if (props.data.currentPage === sectionButton.value * perPage - perPage) sectionButton.value--
                    }
                },
                'current': (current: number) => {
                    props ? props.data.currentPage = current : null
                }
            }
            option[action](current)
            props ? props.changePage(props.data.currentPage) : null

        }
    }
}
</script>
<template>
    <div class="desktop:hidden flex justify-between items-center p-2 gap-2">
        <button :disabled="currentPage <= 1" @click="() => changePage('prev')"
            class="size-9 rounded shadow-xl bg-white text-center">
            << </button>
                <div class="flex-1 flex gap-2 justify-center items-center">
                    <button @click="() => changePage('current', show)" v-for="show in Array.from({ length: length ?? 0 }, (_, index) => index + 1).slice(
                        (sectionButton - 1) * perPage,
                        (sectionButton - 1) * perPage + perPage
                    )"
                        :class="`size-9 rounded shadow-xl  text-center ${show === currentPage ? 'bg-primary-color text-white' : 'bg-white'}`">
                        {{ show }}
                    </button>
                </div>
                <button :disabled="currentPage === pages" @click="() => changePage('next')"
                    class="size-9 rounded shadow-xl bg-white text-center"> >>
                </button>
    </div>
</template>