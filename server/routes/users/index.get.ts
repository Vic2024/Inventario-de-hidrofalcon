import { User } from "~/server/schemas/User"
import { Role } from "~/server/schemas/Role"
import mongoose from "mongoose"
export default defineEventHandler(async (event) => {
    const user = event.context.user
    const query = getQuery(event)
    const perPage = 4
    const page = Number(query.page) || 1
    const toSearch = query.search ? String(query.search) : ''
    const filter = query.filter ? String(query.filter) : ''
    const generatedPDF = Boolean(query.pdf) || false
    const roles = await Role.find({}, { _id: 1, role: 1 })
    const toFind: { [propsNmae: string]: any } = {
        $nor: [{ _id: user._id }, { _id: '66bccb1d2aff2e45fd33e478' }, { _id: '66bcd62871f0f33a2814a0f3' }],
    }
    const filterOptions: { [propsName: string]: string } = {
        'nombre': 'name',
        'apellido': 'lastname',
        'username': 'username',
        'correo': 'email',
        'role': 'role',
    }

    if (!generatedPDF) {
        if (filter.length > 0 && toSearch.length > 0) {
            const optionFilter = filterOptions[filter]
            if (optionFilter === 'role') {
                const filterRole = roles.filter(role => role.role?.toString().toLowerCase().includes(toSearch.toLowerCase()))
                if (filterRole.length > 0) toFind[optionFilter] = filterRole[0]._id
                else toFind[optionFilter] = new mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
            } else {
                toFind[optionFilter] = toSearch
            }
        } else if (toSearch && toSearch.length > 0) {
            const filterRole = roles.filter(role => role.role?.toString().toLowerCase().includes(toSearch.toLowerCase()))
            if (filterRole.length > 0) toFind['role'] = filterRole[0]._id
            else toFind.$text = { $search: toSearch }
        }
        const count = await User.countDocuments(toFind)
        const skip = (page - 1) * perPage
        const allUSers = await User
            .find({ ...toFind })
            .skip(skip)
            .limit(perPage)
            .populate('role', { role: 1, _id: 0, }, Role)
        return { data: allUSers, current: page, count: Math.ceil(count / perPage), perPage }
    } else {
        const allUsers = await User.find({ ...toFind }).populate('role', { role: 1, _id: 0, }, Role)
        return { data: allUsers }

    }

}) 