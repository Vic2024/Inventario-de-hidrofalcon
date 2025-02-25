import { validEditPageSchema } from "~/server/validation/page"
import handlerZodErrors from "~/server/utils/handlerZodErrors"
import { comparePassword } from '~/server/utils/handlerPassword'
import { getUserFromSession } from "~/server/utils/session"
import { Equipment } from "~/server/schemas/Equipment"
export default defineEventHandler(async (event) => {
    const userLogged = event.context.user
    const equipToEdit = validEditPageSchema(await readBody(event))
    if (!equipToEdit.success) {
        const errors = handlerZodErrors(equipToEdit.error.errors)
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Invalid input",
            data: errors
        })
    } else {
        const isUserLogged = await comparePassword(equipToEdit.data.confirPassword, userLogged.password)
        if (isUserLogged) {
            await Equipment.findByIdAndUpdate(equipToEdit.data.id, { equipment: equipToEdit.data.equipment })
            const result = await Equipment.findById(equipToEdit.data.id, { equipment: 1 })
            if (result) {
                await getUserFromSession(event)
                return { equipment: { id: result._id, equipment: result.equipment } }
            }
        } else {
            throw createError({
                statusCode: 401,
                statusMessage: "Bad Request",
                message: "Invalid input",
                data: { confirPassword: 'Contraseña invalida, intentelo de nuevo' }
            })
        }
    }
})