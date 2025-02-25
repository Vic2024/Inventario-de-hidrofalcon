const getSubTitle = async () => {
   const route = useRoute()
   const details = route.params.details
   const categories = route.params.categories
   const { data } = await useFetch(`/api/${categories}/${details}/getSubTitle`)
   return data.value
}

export default getSubTitle