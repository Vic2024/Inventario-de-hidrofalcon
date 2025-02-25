import zod from 'zod'
import location from '~/constants/location'


const schema = zod.object({
    serial: zod.string().min(4, { message: 'Este campo debe de tener al menos 4 caracteres ' }),
    descripcion: zod.string().min(4, { message: 'Este campo debe de tener al menos 4 caracteres ' }),
    ubicacion: zod.enum(location, { message: 'EL campo no coindice con ninguna de las opciones' }),
    estado: zod.enum(["Activo", "Inactivo"], { message: 'EL campo no coindice con ninguna de las opciones' }),
    creadoPor: zod.string().min(2, { message: 'Este campo debe de tener al menos 2 caracteres' }),
    modificadoPor: zod.string().min(2, { message: 'Este campo debe de tener al menos 2 caracteres' }),
    creacion: zod.string().date(),
    modificacion: zod.string().date(),
})

export const validDetails = (input: object) => {
    return schema
        .omit({ creadoPor: true, modificadoPor: true, creacion: true, modificacion: true })
        .safeParse(input)
}

export const validParcialDetails = (input: object) => {
    return schema
        .partial()
        .omit({ creadoPor: true, modificadoPor: true, creacion: true, modificacion: true })
        .safeParse(input)
}

