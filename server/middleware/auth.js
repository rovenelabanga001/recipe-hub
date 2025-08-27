import { getCookie } from "h3";

export default defineEventHandler((event) => {
  const token = getCookie(event, "session");
  globalThis.sessions = globalThis.sessions || {};

  event.context.user =
    token && globalThis.sessions[token] ? globalThis.sessions[token] : null;
});
