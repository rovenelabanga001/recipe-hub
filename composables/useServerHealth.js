// composables/useServerHealth.js
export const useServerHealth = () => {
  const serverError = ref(null)
  const pending = ref(true)
  const config = useRuntimeConfig()

  const checkHealth = async () => {
    pending.value = true
    try {
      await $fetch(`${config.public.baseUrl}/health`)
      serverError.value = null
    } catch (err) {
      serverError.value = {
        statusCode: err?.response?.status || 500,
        statusMessage: "Server is unreachable. Please try again later.",
      }
    } finally {
      pending.value = false  
    }
  }

  onMounted(() => {
    checkHealth()
    // Re-check server every 30s
    setInterval(checkHealth, 30000)
  })

  return { serverError, pending, checkHealth }
}
