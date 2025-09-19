import { defineStore } from "pinia";

export const useRecipeCategoryStore = defineStore("recipeCategoryStore", {
  state: () => ({
    selectedCategory: "all",
  }),
  actions: {
    setCategory(category) {
      this.selectedCategory = category;
    },
  },
});
