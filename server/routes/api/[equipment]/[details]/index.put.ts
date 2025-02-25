import { validParcialDetails } from "~/server/validation/details"
import { Details } from "~/server/schemas/Details"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const isValidData = validParcialDetails(body)
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
        await Details.findByIdAndUpdate(body.id, dataToEdit)
        const result = await Details.findById(body.id, { record: 0 })
        return { record: result }
    }
})