import type { UserWithoutPassword, RecordWithoutEquipo } from "~/types";
export const optionsToTable: { [propName: string]: (data: any) => [] } = {
    '/users': (data: any) => {
        return data.map((el: UserWithoutPassword) => [el.name, el.lastname, el.username, el.role.role, el.email])
    },

    'default': (data: any) => {
        return data.map((el: RecordWithoutEquipo) => Object.values(el))
    },
}