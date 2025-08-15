export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const query = getQuery(event);

  const response = await $fetch(`${config.apiBase}/recipes`);
  return response.slice(0, 4);
});
