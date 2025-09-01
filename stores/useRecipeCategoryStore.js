import { defineStore } from "pinia";

export const useRecipeCategoryStore = defineStore("recipeCategoryStore", {
  state: () => ({
    selectedCategory: "All",
  }),
  actions: {
    setCategory(category) {
      this.selectedCategory = category;
    },
  },
});
