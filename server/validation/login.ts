import zod from 'zod'

const userSchema = zod.object({
    username:zod.string().min(8,{message:'Este campo debe de tener al menos 8 caracteres'}),
    password:zod.string().min(8,{message:'Este campo debe de tener al menos 8 caracteres'})
})

export const validUserSchema = (input:object) => userSchema.safeParse(input)
export const validPartialUserSchema = (input:object) => userSchema.partial().safeParse(input)