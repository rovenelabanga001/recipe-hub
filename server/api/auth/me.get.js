export default defineEventHandler((event) => {
  if (!event.context.user) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }

  return { user: event.context.user };
});
