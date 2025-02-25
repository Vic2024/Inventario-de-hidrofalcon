import zod from 'zod'
import roles from '~/constants/roles'
const userSchema = zod.object({
    name: zod.string({ message: 'Este campo no puede estar vacio' }).min(3, 'Este campo tiene que tener al menos 3 caracteres'),
    lastname: zod.string({ message: 'Este campo no puede estar vacio' }).min(3, 'Este campo tiene que tener al menos 3 caracteres'),
    username: zod.string().min(8, { message: 'Este campo debe de tener al menos 8 caracteres' }),
    password: zod.string().min(8, { message: 'Este campo debe de tener al menos 8 caracteres' }),
    email: zod.string().email({ message: 'Direccion de correo invalida' }),
    role: zod.enum(roles, { message: 'EL campo no coindice con ninguna de las opciones' }),
    confirPassword: zod.string().min(8, { message: 'Este campo debe de tener al menos 8 caracteres' }),
})

export const validUserSchema = (input: object) => userSchema.safeParse(input)

export const validDeleteUserSchema = (input: object) => {
    return userSchema.pick({ confirPassword: true, role: true }).extend({
        id: zod.string()
    }).safeParse(input)
}

export const validEditUserSchema = (input: object) => {
    return userSchema
        .omit({ username: true, password: true })
        .extend({ id: zod.string() })
        .safeParse(input)
}

export const validEmail = (input: object) => {
    return userSchema.pick({ email: true }).safeParse(input)
}

export const validConfirmPassword = (input: object) => {
    return userSchema
        .pick({ password: true, confirPassword: true })
        .safeParse(input)
}