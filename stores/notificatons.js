import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    unread: [],
  }),

  actions: {
    async fetchUnread() {
      try {
        const { $authApi } = useNuxtApp();
        const res = await $authApi("/my-notifications");
        const allNotifications = res.data || [];

        this.unread = allNotifications.filter((n) => n.read === false);
      } catch (err) {
        console.error("Failed to fetch unread notifications", err);
        this.unread = [];
      }
    },

    markAsRead(id) {
      this.unread = this.unread.filter((n) => n.id !== id);
    },
  },
});
