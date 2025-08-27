import { setCookie } from "h3";
import crypto from "crypto";
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
      };
    }

    //generate a session token
    const token = crypto.randomBytes(16).toString("hex");

    //store user session in memory
    globalThis.sessions = globalThis.sessions || {};
    globalThis.sessions[token] = {
      id: user.id,
      email: user.id,
      username: user.username,
    };

    setCookie(event, "session", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, //1 day
    });

    
    return {
      success: true,
      message: "Login Successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: "Server Error",
      details: err.message,
    };
  }
});
