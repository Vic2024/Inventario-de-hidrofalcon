import { Record } from "~/server/schemas/Record"
export default defineEventHandler(async (event) => {
    const detail = getRouterParam(event, 'details')
    const getRecord = await Record.findById(detail, { marca: 1, modelo: 1 })
    if (getRecord) return `${getRecord.marca}-${getRecord.modelo}`
    else return 'Titulo por defecto'
})