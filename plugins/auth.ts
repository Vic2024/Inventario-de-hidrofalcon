import { getMe } from "~/composable/useAuth"

export default defineNuxtPlugin(async () =>{
    await getMe()
})