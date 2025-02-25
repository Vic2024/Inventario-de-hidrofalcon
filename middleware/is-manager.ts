import { useAuthUser } from "~/composable/useAuthUser"

export default defineNuxtRouteMiddleware(async () => {
    const user = useAuthUser()
    if (user.value) {
        const { role } = user.value.role
        const isAccepted = role === 'superUser' || role === 'admin'
        if (isAccepted !== true) return navigateTo('/dashboard')
    }
})