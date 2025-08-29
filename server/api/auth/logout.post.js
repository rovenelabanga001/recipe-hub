// server/api/auth/logout.post.js
import { setCookie } from "h3";

export default defineEventHandler((event) => {
  setCookie(event, "session", "", {
    maxAge: -1,
  });
  return { success: true, message: "Logged out" };
});
