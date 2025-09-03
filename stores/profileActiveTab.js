import { defineStore } from "pinia";

export const useProfileActiveTabStore = defineStore("profileActiveTab", {
  state: () => ({
    activeTab: "Overview",
  }),

  actions: {
    setAcitveTab(tab) {
      this.activeTab = tab;
    },
  },
});
