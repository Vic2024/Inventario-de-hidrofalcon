import zod from 'zod'

const schema = zod.object({
    marca: zod.string().min(2, { message: 'Este campo debe de tener al menos 2 caracteres' }),
    modelo: zod.string().min(2, { message: 'Este campo debe de tener al menos 2 caracteres' }),
    cantidad: zod.number().min(1, { message: 'Este campo debe de tener al menos 2 caracteres' }),
    creadoPor: zod.string().min(2, { message: 'Este campo debe de tener al menos 2 caracteres' }),
    modificadoPor: zod.string().min(2, { message: 'Este campo debe de tener al menos 2 caracteres' }),
    creacion: zod.string().date(),
    modificacion: zod.string().date(),
})

export const validEquipment = (input: object) => {
    return schema
        .omit({ creadoPor: true, modificadoPor: true, creacion: true, modificacion: true })
        .safeParse(input)
}

export const validParcialEquipment = (input: object) => {
    return schema
        .partial()
        .pick({ creadoPor: true, modificadoPor: true, creacion: true, modificacion: true })
        .safeParse(input)
}