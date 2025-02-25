import { validEmail } from "~/server/validation/user"
import handlerZodErrors from "~/server/utils/handlerZodErrors"
import { User } from '~/server/schemas/User'
import jwt from "jsonwebtoken"
import sendEmail from "~/server/utils/sendEmail"
export default defineEventHandler(async (event) => {
    const data = validEmail(await readBody(event))
    const config = useRuntimeConfig(event)
    if (data.success !== true) {
        const errors = handlerZodErrors(data.error.errors)
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Invalid input",
            data: errors
        })
    } else {
        const isRegister = await User.findOne({ email: data.data.email })
        if (!isRegister) {
            throw createError({
                statusCode: 401,
                statusMessage: "Bad Request",
                message: "Invalid input",
                data: 'El usuario no se encuentra registrado'
            })
        } else {
            const dataForToken = { id: isRegister.id, username: isRegister.username }
            const token = jwt.sign(dataForToken, config.cookieSecret, {
                expiresIn: '10m'
            })
            const url = `http://${config.host}:${config.port}/resetPass-${isRegister.id}/${token}`
            const email = await sendEmail({
                url,
                email: data.data.email
            })
            if (email !== true) {
                throw createError({
                    statusCode: 500,
                    statusMessage: "Server Error",
                    message: "Server Error",
                    data: 'Ocurrio un error inesperado'
                })
            } else {
                return {
                    message: 'Revisa tu correo que te enviamos un enlace para poder recuperar tu contraseña'
                }
            }
        }
    }
})
