import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    unread: [],
  }),

  actions: {
    async fetchUnread(config, userId) {
      const notifications = await $fetch(
        `${config.public.baseUrl}/notifications`,
        {
          query: { read: false },
        }
      );

      const recipes = await Promise.all(
        notifications.map((n) => {
          if (!n.recipeId) return null; // skip invalid
          return $fetch(`${config.public.baseUrl}/recipes/${n.recipeId}`);
        })
      );

      this.unread = notifications.filter(
        (n, i) => recipes[i] && recipes[i].userID === userId
      );
    },

    markAsRead(id) {
      this.unread = this.unread.filter((n) => n.id !== id);
    },
  },
});
