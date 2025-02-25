import zod from 'zod'
const pageSchema = zod.object({
    equipment:zod.string().min(3, { message: 'Este campo debe de tener al menos 3 caracteres' }),
    confirPassword: zod.string().min(8, { message: 'Este campo debe de tener al menos 8 caracteres' }),
})

export const validPageSchema = (input: object) => pageSchema.safeParse(input)

export const validEditPageSchema = (input: object) => {
    return pageSchema
        .extend({ id: zod.string() })
        .safeParse(input)
}
