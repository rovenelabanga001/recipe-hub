export default defineEventHandler(async (event) => {
  let body;

  try {
    body = await readBody(event); 
  } catch {
    return { success: false, message: "Invalid JSON body" };
  }

  if (!body.username || !body.email || !body.password) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    const config = useRuntimeConfig();
    const res = await $fetch(`${config.apiBase}/signup`, {
      method: "POST",
      body,
    });

    return {
      success: true,
      message: "Account Created Successfully",
      data: res,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: err?.data?.message || "Failed to create account",
    };
  }
});
