export const FILTERS: { [props: string]: string } = {
    cantidad: 'number',
    creacion: 'date',
    modificacion: 'date',
    role: 'selected'
}

export const isValidFilter: { [props: string]: (input: string) => boolean } = {
    cantidad: (input) => parseInt(input) >= 1,
    'normal': (input) => input.length > 0,
    'creacion': (input) => input.length > 0,
    'modificacion': (input) => input.length > 0,
}