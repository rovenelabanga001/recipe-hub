export default defineEventHandler(async(event) =>{
    const config = useRuntimeConfig()

    try{
        const users = await $fetch(`${config.apiBase}/users`)
        return users
    }

    catch(err){
        return {
      error: true,
      message: "Failed to fetch users",
      details: err.message,
    };
    }
})