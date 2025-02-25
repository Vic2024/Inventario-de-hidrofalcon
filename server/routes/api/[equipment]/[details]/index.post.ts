import { validDetails } from "~/server/validation/details"
import { Record } from "~/server/schemas/Record"
import { Details } from "~/server/schemas/Details"

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const details = getRouterParam(event, 'details')
    const isValidData = validDetails(await readBody(event))
    if (isValidData.success !== true) {
        const errors = handlerZodErrors(isValidData.error.errors)
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Invalid input",
            data: errors
        })
    } else {
        const { data } = isValidData
        const findRecord = await Record.findByIdAndUpdate(details)
        if (findRecord) {
            const newDetails = {
                ...data,
                record: findRecord._id,
                creadoPor: user.username,
                modificadoPor: user.username,
                creacion: Date.now(),
                modificacion: Date.now()
            }
            const details = await new Details(newDetails).save()
            findRecord.details = findRecord.details.concat(details._id)
            await findRecord.save()
            await getUserFromSession(event)
            return { details }
        }
    }
})