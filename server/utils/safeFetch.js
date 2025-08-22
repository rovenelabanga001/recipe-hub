import { showError } from "nuxt/app";

export const safeFetch = async (
  url,
  opts = {},
  fallbackMessage = "Something Went Wrong"
) => {
  try {
    return await $fetch(url, opts);
  } catch (err) {
    showError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || fallback,
    });
  }
};
