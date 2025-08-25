import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: {},
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUser(userID) {
      if (this.users[userID]) return this.users[userID];

      this.loading = true;

      try {
        const config = useRuntimeConfig();
        const data = await $fetch(`${config.public.baseUrl}/users/${userID}`);
        if (!data.ok) throw new Error(error.value.message);

        this.users[userID] = data.value;
        return data.value;
      } catch (err) {
        this.error = err.message;
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});
