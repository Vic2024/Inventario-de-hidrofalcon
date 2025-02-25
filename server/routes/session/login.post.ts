import { validUserSchema } from "~/server/validation/login"
import handlerZodErrors from "~/server/utils/handlerZodErrors"
import { User } from '~/server/schemas/User'
import { Role } from "~/server/schemas/Role"
import { comparePassword } from '~/server/utils/handlerPassword'
import { createError } from "#imports"
import jwt from 'jsonwebtoken'
export default defineEventHandler(async (event) => {
    const user = validUserSchema(await readBody(event))
    if (user.success !== true) {
        const errors = handlerZodErrors(user.error.errors)
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Invalid input",
            data: errors
        })
    } else {
        const getUser = await User.findOne({ username: user.data.username }).populate('role', { role: 1, _id: 0, }, Role)
        if (getUser) {
            const isCorretPass = await comparePassword(user.data.password, getUser.password)
            if (isCorretPass !== true) {
                throw createError({
                    statusCode: 401,
                    message: "La contraseña no coincide",
                });
            } else {
                const config = useRuntimeConfig()
                const dataForToken = { id: getUser.id, username: getUser.username }
                const token = jwt.sign(dataForToken, config.cookieSecret, {
                    expiresIn: '120'
                })
                const refreshToken = jwt.sign(dataForToken, config.cookieSecretRefresh, {
                    expiresIn: '7d'
                })
                setCookie(event, config.cookieNameAccess, JSON.stringify({ token, refreshToken }), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                })

                return { user: getUser }
            }
        } else {
            throw createError({
                statusCode: 401,
                message: "El usuario no se encuentra registrado",
            });
        }
    }
})