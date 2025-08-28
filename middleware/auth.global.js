export default defineNuxtRouteMiddleware((to) => {
  const publicPages = ["/auth/signup", "/auth/signin"];

  if (publicPages.includes(to.path)) return;

  const token = useCookie("session").value;

  if (!token) {
    return navigateTo("/auth/signin");
  }
});
