import { validPageSchema } from "~/server/validation/page"
import handlerZodErrors from "~/server/utils/handlerZodErrors"
import { comparePassword } from '~/server/utils/handlerPassword'
import { getUserFromSession } from "~/server/utils/session"
import { Equipment } from "~/server/schemas/Equipment"
export default defineEventHandler(async (event) => {
    const userLogged = event.context.user
    const newEquipment = validPageSchema(await readBody(event))
    if (newEquipment.success !== true) {
        const errors = handlerZodErrors(newEquipment.error.errors)
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Invalid input",
            data: errors
        })
    } else {
        const isUserLogged = await comparePassword(newEquipment.data.confirPassword, userLogged.password)
        if (isUserLogged === true) {
            const existEquipment = await Equipment.findOne({ equipment: newEquipment.data.equipment.toLowerCase() })
            if (existEquipment) {
                throw createError({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Invalid input",
                    data: { equipment: 'El equipo existe' }
                })
            } else {
                const result = await new Equipment({ equipment: newEquipment.data.equipment.toLowerCase(), records: [] }).save()
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