import { useAuthUser } from "~/composable/useAuthUser"

export default defineNuxtRouteMiddleware(async () => {
    const user = useAuthUser()
    if (!user.value) {
        return navigateTo('/')
    }
})