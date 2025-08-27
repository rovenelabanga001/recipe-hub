import { getCookie } from "h3";
export default defineEventHandler((event) => {
  const token = getCookie(event, "session");

  //delete session from memory
  if (token && globalThis.sessions && globalThis.sessions[token]) {
    delete globalThis.sessions[token];
  }

  //clear the cookie on the client
  setCookie(event, "session", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // Expire immediately
    path: "/",
  });

  return { success: true, message: "Logged out successfully" };
});
