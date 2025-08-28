export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (!auth.isLoggedin && !to.path.startsWith("/auth")) {
    return navigateTo("/auth/signin");
  }
});
