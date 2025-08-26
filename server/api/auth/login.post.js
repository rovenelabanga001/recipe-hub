export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const config = useRuntimeConfig();

  try {
    const users = await $fetch(`${config.apiBase}/users`);

    const user = users.find(
      (u) => u.email === body.email && u.password === body.password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };
    }

    return {
      success: true,
      message: "Login Successful",
    };
  } catch (err) {
    return {
      success: false,
      message: "Server Error",
      details: err.message,
    };
  }
});
