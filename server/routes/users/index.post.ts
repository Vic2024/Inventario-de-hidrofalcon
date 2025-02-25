import { validUserSchema } from "~/server/validation/user"
import handlerZodErrors from "~/server/utils/handlerZodErrors"
import { comparePassword } from '~/server/utils/handlerPassword'
import { User } from '~/server/schemas/User'
import { Role } from "~/server/schemas/Role"
import { createPassword } from "~/server/utils/handlerPassword"
import { getUserFromSession } from "~/server/utils/session"
export default defineEventHandler(async (event) => {
   const userLogged = event.context.user
   const newUser = validUserSchema(await readBody(event))
   if (newUser.success !== true) {
      const errors = handlerZodErrors(newUser.error.errors)
      throw createError({
         statusCode: 400,
         statusMessage: "Bad Request",
         message: "Invalid input",
         data: errors
      })
   } else {
      const isUserLogged = await comparePassword(newUser.data.confirPassword, userLogged.password)
      if (isUserLogged === true) {
         const existUser = await User.findOne({ username: newUser.data.username })
         if (existUser) {
            throw createError({
               statusCode: 400,
               statusMessage: "Bad Request",
               message: "Invalid input",
               data: { username: 'El nombre de usuario ya existe' }
            })
         } else {
            const existEmail = await User.findOne({ email: newUser.data.email })
            if (existEmail) {
               throw createError({
                  statusCode: 400,
                  statusMessage: "Bad Request",
                  message: "Invalid input",
                  data: { email: 'El correo electronico ya existe' }
               })
            } else {
               const role = await Role.findOne({ role: newUser.data.role }, { _id: 1 })
               if (role) {
                  const userRes = await new User({
                     ...newUser.data,
                     password: await createPassword(newUser.data.password),
                     role: role.id
                  }).save()
                  const arrayRole = await Role.findByIdAndUpdate(role.id)
                  if (arrayRole) {
                     arrayRole.users = arrayRole.users.concat(userRes.id)
                     arrayRole.save()
                     const getUser = await User.findById(userRes.id).populate('role', { role: 1, _id: 0, }, Role)
                     await getUserFromSession(event)
                     return { user: getUser }
                  }
               }
            }
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