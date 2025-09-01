import { defineStore } from "pinia";

export const useRecipeDraftStore = defineStore("recipeDraft", {
  state: () => ({
    title: "",
    imageUrl: "", // ✅ added image field
    cookTime: "",
    prepTime: "",
    servings: "",
    selectedCategories: [],
    selectedIngredients: [],
    selectedSteps: [],
  }),

  actions: {
    setTitle(newTitle) {
      this.title = newTitle;
    },
    toggleCategory(category) {
      if (this.selectedCategories.includes(category)) {
        this.selectedCategories = this.selectedCategories.filter(
          (cat) => cat !== category
        );
      } else {
        this.selectedCategories.push(category);
      }
    },
    addIngredient(ingredient) {
      if (ingredient && !this.selectedIngredients.includes(ingredient)) {
        this.selectedIngredients.push(ingredient);
      }
    },
    addStep(step) {
      if (step && !this.selectedSteps.includes(step)) {
        this.selectedSteps.push(step);
      }
    },
    clearDraft() {
      this.$reset();
    },
  },
});
