export default defineEventHandler(async (event) => {
    const userWithPassword = event.context.user
    if (!userWithPassword) {
        return {
            user: null
        }
    } else {
        return {
            user: userWithPassword
        }
    }



})