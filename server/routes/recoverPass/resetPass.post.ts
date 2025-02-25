import { validConfirmPassword } from "~/server/validation/user"
import Jwt from "jsonwebtoken"
import { User } from '~/server/schemas/User'
import { createPassword } from "#imports"
export default defineEventHandler(async (event) => {
    const { id, token } = getQuery(event)
    const config = useRuntimeConfig(event)
    const data = validConfirmPassword(await readBody(event))
    let isValidToken
    if (data.success !== true) {
        const errors = handlerZodErrors(data.error.errors)
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Invalid input",
            data: errors
        })
    } else {
        if (data.data.password.toLowerCase() !== data.data.confirPassword.toLowerCase()) {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "Invalid input",
                data: { message: 'Las contraseñas no coinciden' }
            })
        } else {
            try {
                isValidToken = Jwt.verify(String(token), config.cookieSecret) as { id: string, username: string }
            } catch (err) {
                throw createError({
                    statusCode: 498,
                    statusMessage: "Invalid Token",
                    message: "Token Expired",
                    data: { message: 'Las credenciales se han expirado' }
                })
            }

            const getUser = await User.findById(isValidToken.id)
            if(getUser){
                const newPasswor = await createPassword(data.data.password)
                getUser.password = newPasswor
                await getUser.save()
                return { message:'Contraseña cambiada'}
            }

        }
    }
})