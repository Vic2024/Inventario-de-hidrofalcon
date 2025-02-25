export default defineNuxtRouteMiddleware(async (to, _) => {
   const categories = to.params.categories
   const { isValid } = await $fetch('/equipments/isValidEquipment',
      { method: "POST", body: { equipement: categories } }
   )
  if(isValid === false) return navigateTo('/dashboard/404')
})