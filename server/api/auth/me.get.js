import { getCookie } from "h3";
export default defineEventHandler((event) => {
  const token = getCookie(event, "session");
  
  if (!token || globalThis.sessions?.[token]) {
    return { user: null };
  }

  return { user: globalThis.sessions[token] };
});
