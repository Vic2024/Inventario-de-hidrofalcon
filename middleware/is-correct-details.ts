export default defineNuxtRouteMiddleware(async (to, _) => {
    const categories = to.params.categories
    const details = to.params.details
    const redirect: { [name: string]: any } = {
        equipment: () => navigateTo('/dashboard/404'),
        record: () => navigateTo(`/dashboard/${categories}/404`),
    }
    const { isValid, where } = await $fetch('/isValidDetails',
        { method: "POST", body: { details, categories } }
    )
    if (isValid !== true) return redirect[where]()
})