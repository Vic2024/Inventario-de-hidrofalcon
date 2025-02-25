import type { Ref } from "vue"
import type { InjectionKey } from "vue"
export interface User {
    id: string,
    name: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    role: {
        role: string
    }
    [propsName: string]: any
}

interface Record {
    id: string,
    marca: string,
    cantidad: number,
    fecha_creacion: Date,
    fecha_modificacion: Date,
    equipo: { equipo: string },
    creado_por: string,
    modificado_por: string
    [propsName: string]: any
}

export type initValues = { [propName: string]: string | number | boolean }
export type initErrors = { [propName: string]: null | string }

export type initData = { values: initValues, errors: initErrors }

export type UserWithoutPassword = Omit<User, "password">
export type RecordWithoutEquipo = Omit<Record, 'equipo'>
export type filterBoxs = { title: string; id: string; value: string; }[]
export type getData = null | UserWithoutPassword[] | RecordWithoutEquipo[]

export type methodOptions = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type NewErrors = { [key: string]: string }

export type dataFromServer = { [propsName: string]: UserWithoutPassword | RecordWithoutEquipo | null }

export type data = {
    get: getData,
    isPending: boolean,
    currentPage: number,
    pages: number | null,
    titles: string[] | null,
    perPage: number | null
}

export type formMethodHTTP = { methodHTTP: methodOptions }
export type options = { filter: string, search: string }
export type operation = { [propName: string]: (data: any) => void }
export type resultGetData = { data: getData, current: number, count: number, perPage: number }

type toTable = {
    data: data,
    formMethodHTTP: Ref<formMethodHTTP>,
    formValues: Ref<initValues>,
    formErrors: Ref<initErrors>,
    getData: () => Promise<void>,
    generatePDF: () => Promise<void>
}
type toModal = {
    resetForm: () => void
}
type toPagination = {
    data: data,
    changePage: (page: number) => void
}

type toFilter = {
    handleFilter: (valueToFilter: Ref<string> | string) => void,
    filterInput: Ref<string>,
    filterBoxs: {
        title: string;
        id: string;
        value: string;
    }[]
}

type toSearch = {
    search: Ref<string>
}

export const toTable = Symbol() as InjectionKey<toTable>
export const toModal = Symbol() as InjectionKey<toModal>
export const toPagination = Symbol() as InjectionKey<toPagination>
export const toFilter = Symbol() as InjectionKey<toFilter>
export const toSearch = Symbol() as InjectionKey<toSearch>
