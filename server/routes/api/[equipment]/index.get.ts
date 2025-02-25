import { Equipment } from "~/server/schemas/Equipment"
import { Record } from "~/server/schemas/Record"
import { validParcialEquipment } from "~/server/validation/equipment"
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const perPage = 4
    const page = Number(query.page) ?? 1
    const toSearch = String(query.search) ?? ''
    const filter = String(query.filter)
    const generatedPDF = Boolean(query.pdf) ?? false
    const equipment = getRouterParam(event, 'equipment')
    const toFind: { [propsNmae: string]: any } = {}

    const optionToFilter: { [props: string]: any } = {
        cantidad: (input: any) => parseInt(input)
    }

    const prepareDate = (date: any) => date.substring(0, 8).concat(Number(date.substring(8)) + 1)

    if (!generatedPDF) {
        if (filter.length > 0 && toSearch.length > 0) {
            const prepareData = optionToFilter[filter]
                ? { [filter]: optionToFilter[filter](toSearch) }
                : { [filter]: toSearch }
            const isValidInput = validParcialEquipment(prepareData)
            if (isValidInput.success !== true) {
                const errors = handlerZodErrors(isValidInput.error.errors)
                throw createError({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "Invalid input",
                    data: errors
                })
            } else {
                const dataFiltered: { [props: string]: string | undefined | number | Date } = isValidInput.data
                if (filter === 'creacion' || filter === 'modificacion') {
                    const lastDate = prepareDate(dataFiltered[filter])
                    const firstDate = dataFiltered[filter]
                    if (typeof firstDate === 'string') {
                        toFind['$and'] = [
                            { [filter]: { $gte: new Date(firstDate) } },
                            { [filter]: { $lt: new Date(lastDate) } }
                        ]
                    }
                } else toFind[filter] = dataFiltered[filter]
            }
        }
        else if (toSearch && toSearch.length > 0) {
            const isANumber = parseInt(toSearch)
            if (isANumber) toFind['cantidad'] = isANumber
            else toFind.$text = { $search: toSearch }
        }
        const idEquip = await Equipment.findOne({ equipment }, { _id: 1 })
        const count = await Record.find({ equipo: idEquip?._id }, { equipo: 0 }).populate('equipo', {}, Equipment).countDocuments()
        const skip = (page - 1) * perPage
        const records = await Record
            .find({ equipo: idEquip?._id, ...toFind }, { equipo: 0, details: 0 })
            .skip(skip)
            .limit(perPage)
            .populate('equipo', {}, Equipment)
        return { data: records, current: page, count: Math.ceil(count / perPage), perPage }
    } else {
        const idEquip = await Equipment.findOne({ equipment }, { _id: 1 })
        const records = await Record.find({ equipo: idEquip?._id, ...toFind }, { equipo: 0 })
        return { data: records }
    }
})