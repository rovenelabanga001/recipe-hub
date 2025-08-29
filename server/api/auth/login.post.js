import { setCookie } from "h3";
import crypto from "crypto";
import jwt from "jsonwebtoken";
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

    //issue jwt
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      config.jwtSecret || "dev_secret",
      { expiresIn: "1d" }
    );
    setCookie(event, "session", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
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
