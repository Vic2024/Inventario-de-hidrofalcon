import { validEditUserSchema } from "~/server/validation/user"
import handlerZodErrors from "~/server/utils/handlerZodErrors"
import { comparePassword } from '~/server/utils/handlerPassword'
import { User } from '~/server/schemas/User'
import { Role } from "~/server/schemas/Role"
import { getUserFromSession } from "~/server/utils/session"
export default defineEventHandler(async (event) => {
    const userLogged = event.context.user
    const isEditUser = validEditUserSchema(await readBody(event))
    if (isEditUser.success !== true) {
        const errors = handlerZodErrors(isEditUser.error.errors)
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: "Invalid input",
            data: errors
        })
    } else {
        const isValidUser = await comparePassword(isEditUser.data.confirPassword, userLogged.password)
        if (isValidUser !== true) {
            throw createError({
                statusCode: 401,
                statusMessage: "Bad Request",
                message: "Invalid input",
                data: { confirPassword: 'Contraseña invalida, intentelo de nuevo' }
            })
        } else {
            const userToEdit = await User.findById(isEditUser.data.id)
            const roleToEdit = await Role.findOne({ role: isEditUser.data.role })
            if (userToEdit && roleToEdit) {
                userToEdit.name = isEditUser.data.name
                userToEdit.lastname = isEditUser.data.lastname
                userToEdit.email = isEditUser.data.email
                if (userToEdit.role?.toString() !== roleToEdit.id) {
                    const roleToDelete = await Role.findById(userToEdit.role)
                    if (roleToDelete) {
                        roleToDelete.users = roleToDelete.users.filter(user => user.toString() !== userToEdit.id)
                        await roleToDelete.save()
                    }
                    userToEdit.role = roleToEdit.id
                    roleToEdit.users = roleToEdit.users.concat(userToEdit.id)
                    await roleToEdit.save()
                }
                await userToEdit.save()
                const userModifi = await User.findById(isEditUser.data.id).populate('role', { role: 1, _id: 0, }, Role)
                await getUserFromSession(event)
                return { user: userModifi }

            }
        }
    }
})