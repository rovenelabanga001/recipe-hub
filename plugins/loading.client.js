export default defineNuxtPlugin((nuxtApp) => {
  const isLoading = useState('isLoading', () => false)

  nuxtApp.hook('page:start', () => {
    isLoading.value = true
  })

  nuxtApp.hook('page:finish', () => {
    isLoading.value = false
  })
})
