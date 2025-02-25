import { Equipment } from "../../schemas/Equipment"
export default defineEventHandler(async (event) => {
    const getEquipment = await Equipment.find({},{equipment: 1})
    return { categories: getEquipment }
})