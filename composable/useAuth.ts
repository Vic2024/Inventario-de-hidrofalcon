import { useAuthUser, useCookie } from "./useAuthUser";
import type { UserWithoutPassword } from "~/types";


export const useAuth = (
    { initLogin, initErrors }:
        {
            initLogin: { username: string, password: string },
            initErrors: { username: null, password: null, isLogin: null }
        }
) => {
    const authUser = useAuthUser()
    const setUser = (user: any) => authUser.value = user
    const initValue = {
        values: initLogin,
        errors: initErrors,
        pending: false
    }

    const data = ref(initValue)



    const login = async ({ username, password }: { username: string, password: string }) => {
        const data = await $fetch('/session/login', {
            method: 'POST',
            body: { username, password }
        })

        setUser(data.user)

        return authUser
    }


    const submit = async () => {
        try {
            data.value.errors = initErrors
            data.value.pending = true
            const res = await login({ ...data.value.values })
            const redirect = '/dashboard'
            if (res) await navigateTo(redirect)

        } catch (error: any) {
            if (error.statusCode === 400) data.value.errors = { ...initErrors, ...error.data.data }
            if (error.statusCode === 401) data.value.errors = { ...initErrors, isLogin: error.data.message }
        } finally {
            data.value.pending = false
        }
    }


    return { data, submit }
}


export const logout = async () => {
    const authUser = useAuthUser()
    const setUser = (user: any) => authUser.value = user
    const data = await $fetch('/session/logout', {
        method: 'POST'
    })
    setUser(data.user)
}

export const getMe = async () => {
    const authUser = useAuthUser()
    const setCookie = (cookie: any) => useCookie().value = cookie
    const setUser = (user: any) => authUser.value = user
    if (!authUser.value) {
        try {
            const data: { user: UserWithoutPassword } = await $fetch('/session/me', { method: 'GET' })
            setUser(data.user)
        } catch (err) {
            setCookie(null)
        }
    }
}