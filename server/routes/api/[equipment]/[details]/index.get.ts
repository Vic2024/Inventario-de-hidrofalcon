import { validParcialDetails } from "~/server/validation/details"
import { Details } from "~/server/schemas/Details"
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const perPage = 4
    const page = Number(query.page) ?? 1
    const toSearch = String(query.search) ?? ''
    const filter = String(query.filter)
    const generatedPDF = Boolean(query.pdf) ?? false
    const detail = getRouterParam(event, 'details')
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
            const isValidInput = validParcialDetails(prepareData)
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
        const skip = (page - 1) * perPage
        const count = await Details.find({ record: detail }, { record: 0, }).countDocuments()
        const details = await Details
            .find({ record: detail, ...toFind }, { record: 0, })
            .skip(skip)
            .limit(perPage)
        return { data: details, current: page, count: Math.ceil(count / perPage), perPage }
    }
    else {
        const details = await Details.find({ record: detail, ...toFind }, { record: 0, })
        return { data: details }
    }

})