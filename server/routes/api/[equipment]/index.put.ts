import { validParcialEquipment } from "~/server/validation/equipment"
import { Record } from "~/server/schemas/Record"
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const isValidData = validParcialEquipment(body)
    const user = event.context.user
    if (isValidData.success !== true) {
        const errors = handlerZodErrors(isValidData.error.errors)
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Invalid input",
            data: errors
        })
    } else {
        const dataToEdit = {
            ...isValidData.data,
            id: body.id,
            modificacion: Date.now(),
            modificadoPor: user.username
        }
        await Record.findByIdAndUpdate(body.id, dataToEdit)
        const result = await Record.findById(body.id, { equipo: 0, details: 0 })
        return { record: result }
    }
})