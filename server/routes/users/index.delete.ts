import { validDeleteUserSchema } from "~/server/validation/user"
import { comparePassword } from '~/server/utils/handlerPassword'
import { User } from '~/server/schemas/User'
import { Role } from "~/server/schemas/Role"
import { getUserFromSession } from "~/server/utils/session"
export default defineEventHandler(async (event) => {
    const userLogged = event.context.user
    const userToDelete = validDeleteUserSchema(await readBody(event))
    if (userToDelete.success !== true) {
        const errors = handlerZodErrors(userToDelete.error.errors)
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Invalid input",
            data: errors
        })
    } else {
        const isUserLogged = await comparePassword(userToDelete.data.confirPassword, userLogged.password)
        if (isUserLogged !== true) {
            throw createError({
                statusCode: 401,
                statusMessage: "Bad Request",
                message: "Invalid input",
                data: { confirPassword: 'Contraseña invalida, intentelo de nuevo' }
            })
        } else {
            const role = await Role.findOne({ role: userToDelete.data.role })
            if (role) {
                role.users = role.users.filter(id => id.toString() !== userToDelete.data.id)
                await role.save()
            }
            const userDelete = await User.findByIdAndDelete(userToDelete.data.id)
            await getUserFromSession(event)
            return { user: userDelete }
        }
    }
})