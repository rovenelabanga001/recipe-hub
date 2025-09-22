import { defineStore } from "pinia";

export const useRecipeDraftStore = defineStore("recipeDraft", {
  state: () => ({
    title: "",
    imageFile: null,
    imageUrl: "",
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
    removeIngredient(ingredient) {
      this.selectedIngredients = this.selectedIngredients.filter(
        (ing) => ing !== ingredient
      );
    },
    addStep(step) {
      if (step && !this.selectedSteps.includes(step)) {
        this.selectedSteps.push(step);
      }
    },
    removeStep(step) {
      this.selectedSteps = this.selectedSteps.filter((s) => s !== step);
    },
    clearDraft() {
      this.$reset();
    },
    setImage(file) {
      this.imageFile = file;
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.imageUrl = null;
      }
    },
  },
});
