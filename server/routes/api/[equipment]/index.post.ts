import { validEquipment } from "~/server/validation/equipment"
import { Equipment } from "~/server/schemas/Equipment"
import { Record } from "~/server/schemas/Record"

export default defineEventHandler(async (event) => {
   const body = await readBody(event)
   const isValidData = validEquipment(body)
   const equip = getRouterParam(event, 'equipment')
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
      const { data } = isValidData
      const findEquipment = await Equipment.findOne({ equipment: equip })
      if (findEquipment) {
         const newRecord = {
            ...data,
            equipo: findEquipment._id,
            creadoPor: user.username,
            modificadoPor: user.username,
            creacion: Date.now(),
            modificacion: Date.now()
         }
         const record = await new Record(newRecord).save()
         findEquipment.records = findEquipment.records.concat(record._id)
         await findEquipment.save()
         await getUserFromSession(event)
         return { record }
      }
   }
})