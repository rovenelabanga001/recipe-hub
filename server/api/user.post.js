export default defineEventHandler(async (event) => {
  let body;

  try {
    body = await readBody(event); // H3 will parse JSON automatically
    console.log("Body Received", body);
  } catch {
    return { success: false, message: "Invalid JSON body" };
  }

  if (!body.username || !body.email || !body.password) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    const config = useRuntimeConfig();
    const res = await $fetch(`${config.apiBase}/users`, {
      method: "POST",
      body, // pass object directly
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
