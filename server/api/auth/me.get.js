import { getCookie } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const token = getCookie(event, "session");
  if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    return {
      user: {
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
      },
    };
  } catch {
    return { user: null };
  }
});
