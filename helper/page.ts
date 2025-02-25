import type { initValues } from "~/types"


export function renderForm(id: string, formValues: initValues) {
    if (typeof formValues.id === 'string' && formValues.id.length === 0) return true
    else if (id === 'password' || id === 'username') return false
    else return true
}

export const upperFirstLetter = (str: string | string[]) => {
    if (typeof str === 'string') {
        return str.charAt(0).toUpperCase() + str.slice(1)
    } else {
        return str.map(s => s.charAt(0).toUpperCase() + str.slice(1))[0]
    }
}