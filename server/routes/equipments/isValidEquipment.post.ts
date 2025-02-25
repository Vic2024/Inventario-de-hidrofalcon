import { Equipment } from "../../schemas/Equipment"
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const existEquipment = await Equipment.findOne({ equipment: body.equipement })
    if (existEquipment) return { isValid: true }
    else return { isValid: false }

})