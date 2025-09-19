import { setCookie } from "h3";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(`${config.apiBase}/signin`, {
      method: "POST",
      body: {
        email: body.email,
        password: body.password
      },
    });

    if (response.error) {
      return {
        success: false,
        message: response.error,
      };
    }

    setCookie(event, "session", response.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    return {
      success: true,
      message: "Login Successful",
      user: response.user,
      token:response.token
    };
    
  } catch (err) {
    const errorMessage = err?.data?.error || err?.message || "Server Error";
    return {
      success: false,
      message: errorMessage,
    };
  }
});