import { Equipment } from "@/server/schemas/Equipment"
import { Record } from "@/server/schemas/Record"
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const getEquipment = await Equipment.findOne({ equipment: body.categories }, { _id: 1 })
    if (!getEquipment) {
        return { where: 'equipment', isValid: false }
    } else {
        try{
            const getDetails = await Record.findOne({ $and: [{ _id: body.details }, { equipo: getEquipment._id }] })
            if (!getDetails) return { where: 'record', isValid: false }
            else return { where: 'record', isValid: true }

        }catch(err){
           return { where: 'record', isValid: false }
        }
    }

})