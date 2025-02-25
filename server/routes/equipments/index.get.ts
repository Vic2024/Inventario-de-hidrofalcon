import { Equipment } from "../../schemas/Equipment"
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const perPage = 4
    const page = Number(query.page) ?? 1
    const toSearch = String(query.search) ?? ''
    const filter = String(query.filter)
    const generatedPDF = Boolean(query.pdf) ?? false
    const toFind: { [propsNmae: string]: any } = {}

    if (!generatedPDF) {
        const count = await Equipment.countDocuments(toFind)
        const skip = (page - 1) * perPage
        if (filter.length > 0 && toSearch.length > 0) {
            toFind[filter] = toSearch
        } else if (toSearch && toSearch.length > 0) {
            toFind.$text = { $search: toSearch }
        }
        const getEquipment = await Equipment
            .find({ ...toFind }, { records: 0 })
            .skip(skip)
            .limit(perPage)
        return { data: getEquipment, current: page, count: Math.ceil(count / perPage), perPage }
    }
    else {
        const getEquipReport = await Equipment.find({}, { records: 0 })
        return { data: getEquipReport }
    }

})