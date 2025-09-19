import { getCookie } from "h3";

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export default defineEventHandler((event) => {
  const token = getCookie(event, "session");
  if (!token) {
    return { user: null };
  }

  try {
    const decoded = parseJwt(token);
    return {
      user: {
        id: decoded.user_id,
        email: decoded.email,
        username: decoded.username,
      },
      token
    };
  } catch {
    console.error("JWT parsing error:", error);
    return { user: null };
  }
});
