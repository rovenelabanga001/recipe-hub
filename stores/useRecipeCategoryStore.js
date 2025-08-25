import { defineStore } from "pinia";
import { ref } from "vue";

export const useRecipeCategoryStore = defineStore("recipeCategoryStore", {
  state: () => ({
    selectedCategory: "All",
  }),
});
