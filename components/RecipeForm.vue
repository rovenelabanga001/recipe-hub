<script setup>
import useVuelidate from "@vuelidate/core";
import { required, minValue, url, helpers } from "@vuelidate/validators";

const {$authApi} = useNuxtApp()
const props = defineProps({
  mode: { type: String, default: "create" },
  recipeId: { type: String, default: null },
});

const config = useRuntimeConfig();
const auth = useAuthStore();
const recipeDraft = useRecipeDraftStore();
onMounted(async () => {
  if (props.mode === "edit" && props.recipeId) {
    const recipe = await $fetch(
      `${config.public.baseUrl}/recipes/${props.recipeId}`
    );
    recipeDraft.title = recipe.title;
    recipeDraft.imageUrl = recipe.image;
    recipeDraft.prepTime = recipe.prepTime;
    recipeDraft.cookTime = recipe.cookTime;
    recipeDraft.servings = recipe.servings;
    recipeDraft.selectedIngredients = recipe.ingredients;
    recipeDraft.selectedSteps = recipe.directions;
    recipeDraft.selectedCategories = recipe.category;
  }
});

onMounted(async () => {
  if (props.mode === "create") {
    recipeDraft.clearDraft();
  }
});

const categories = ref([
  "Breakfast",
  "Brunch",
  "Lunch",
  "Dinner",
  "Desserts",
  "Snacks",
  "Drinks",
]);

const showIngredientsInput = ref(true);
const showDirectionsInput = ref(true);

const ingredient = ref("");
const step = ref("");

// -------------------
// VALIDATION RULES
// -------------------
const rules = {
  title: { required },
  imageUrl: {
    required,
    url: helpers.withMessage("Must be a valid URL", url),
  },
  prepTime: { required, minValue: minValue(1) },
  cookTime: { required, minValue: minValue(1) },
  servings: { required, minValue: minValue(1) },
  selectedIngredients: {
    required: helpers.withMessage(
      "At least 1 ingredient is required",
      (val) => val.length > 0
    ),
  },
  selectedSteps: {
    required: helpers.withMessage(
      "At least 1 step is required",
      (val) => val.length > 0
    ),
  },
  selectedCategories: {
    required: helpers.withMessage(
      "Pick at least 1 category",
      (val) => val.length > 0
    ),
  },
};

const state = reactive(recipeDraft); // validate store state
const v$ = useVuelidate(rules, state);

const addIngredient = () => {
  if (ingredient.value.trim()) {
    recipeDraft.addIngredient(ingredient.value.trim());
    ingredient.value = "";
  }
};

const addStep = () => {
  if (step.value.trim()) {
    recipeDraft.addStep(step.value.trim());
    step.value = "";
  }
};

const onSubmitRecipe = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  if (props.mode === "create") {
    await $fetch(`${config.public.baseUrl}/recipes`, {
      method: "POST",
      body: {
        name: recipeDraft.title,
        title: recipeDraft.title,
        image: recipeDraft.imageUrl,
        prepTime: recipeDraft.prepTime,
        cookTime: recipeDraft.cookTime,
        servings: recipeDraft.servings,
        ingredients: recipeDraft.selectedIngredients,
        directions: recipeDraft.selectedSteps,
        tags: recipeDraft.selectedCategories,
        category: recipeDraft.selectedCategories,
        userID: auth.user?.id,
        createdAt: new Date().toISOString(),
      },
    });
    useToastify("Recipe added successfully", { type: "success" });
  } else {
    await $fetch(`${config.public.baseUrl}/recipes/${props.recipeId}`, {
      method: "PATCH",
      body: {
        name: recipeDraft.title,
        title: recipeDraft.title,
        image: recipeDraft.imageUrl,
        prepTime: recipeDraft.prepTime,
        cookTime: recipeDraft.cookTime,
        servings: recipeDraft.servings,
        ingredients: recipeDraft.selectedIngredients,
        directions: recipeDraft.selectedSteps,
        tags: recipeDraft.selectedCategories,
        category: recipeDraft.selectedCategories,
        userID: auth.user?.id,
      },
    });
    useToastify("Recipe updated successfully", { type: "success" });
    navigateTo("/profile");
  }

  recipeDraft.clearDraft();
  v$.value.$reset();
};
</script>
<template>
  <!-- <BackBtn v-if="props.mode === 'edit'" /> -->
  <form
    class="max-w-2xl mx-auto p-6 space-y-6 bg-cream rounded-2xl shadow"
    @submit.prevent="onSubmitRecipe"
  >
    <!-- Title -->
    <div>
      <input
        v-model="recipeDraft.title"
        type="text"
        placeholder="Title"
        class="w-full text-2xl border-b border-gray-400 font-bold focus:outline-none focus:border-[orangered]"
      />
      <span v-if="v$.title.$error" class="text-red-500 text-sm">
        Title is required
      </span>
    </div>

    <!-- Categories -->
    <div class="flex flex-col space-y-2">
      <label for="category" class="text-sm font-medium">Category:</label>
      <div class="flex flex-wrap gap-3">
        <span
          v-for="category in categories"
          :key="category"
          @click="recipeDraft.toggleCategory(category)"
          class="px-2 py-1 rounded-2xl text-xs cursor-pointer"
          :class="
            recipeDraft.selectedCategories.includes(category)
              ? 'bg-[orangered] text-white'
              : 'bg-gray-200 text-gray-600'
          "
        >
          {{ category }}
        </span>
      </div>
      <span v-if="v$.selectedCategories.$error" class="text-red-500 text-sm">
        {{ v$.selectedCategories.$errors[0].$message }}
      </span>
      <ul>
        <li v-for="cat in recipeDraft.selectedCategories" class="text-sm">
          {{ cat }}
        </li>
      </ul>
    </div>

    <!-- Image -->
    <div>
      <input
        v-model="recipeDraft.imageUrl"
        type="text"
        placeholder="Image Url"
        class="border-3 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-full h-10"
      />
      <span v-if="v$.imageUrl.$error" class="text-red-500 text-sm">
        {{ v$.imageUrl.$errors[0].$message }}
      </span>
    </div>

    <!-- Details -->
    <div class="flex flex-col">
      <label class="block font-semibold mb-2">Details</label>
      <ul class="space-y-2 text-gray-700">
        <li class="grid grid-cols-[200px_1fr] items-center">
          <span>⏱ Prep Time:</span>
          <div class="flex items-center gap-1">
            <input
              v-model="recipeDraft.prepTime"
              type="number"
              class="border-2 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-16"
            />
            <span>min</span>
          </div>
          <span
            v-if="v$.prepTime.$error"
            class="text-red-500 text-sm col-span-2"
          >
            Must be at least 1 minute
          </span>
        </li>

        <li class="grid grid-cols-[200px_1fr] items-center">
          <span>🍳 Cook Time:</span>
          <div class="flex items-center gap-1">
            <input
              v-model="recipeDraft.cookTime"
              type="number"
              class="border-2 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-16"
            />
            <span>min</span>
          </div>
          <span
            v-if="v$.cookTime.$error"
            class="text-red-500 text-sm col-span-2"
          >
            Must be at least 1 minute
          </span>
        </li>

        <li class="grid grid-cols-[200px_1fr] items-center">
          <span>🍽️ Servings:</span>
          <input
            v-model="recipeDraft.servings"
            type="number"
            class="border-2 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-16"
          />
          <span
            v-if="v$.servings.$error"
            class="text-red-500 text-sm col-span-2"
          >
            Must be at least 1
          </span>
        </li>
      </ul>
    </div>

    <!-- Ingredients -->
    <div class="flex flex-col items-start">
      <label class="block font-semibold mb-1">Ingredients</label>
      <ul
        class="list-disc list-inside"
        v-if="recipeDraft.selectedIngredients.length"
      >
        <ul class="list-disc pl-6">
          <li
            v-for="ing in recipeDraft.selectedIngredients"
            :key="ing"
            class="list-item relative pr-8"
          >
            <button
              @click="recipeDraft.removeIngredient(ing)"
              class="absolute right-0 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
            >
              <IconsRemove color="orangered" />
            </button>
            <span>{{ ing }}</span>
          </li>
        </ul>
      </ul>
      <span v-if="v$.selectedIngredients.$error" class="text-red-500 text-sm">
        {{ v$.selectedIngredients.$errors[0].$message }}
      </span>
      <button
        type="button"
        class="mt-2 text-orange-500"
        @click="showIngredientsInput = !showIngredientsInput"
        v-if="showIngredientsInput"
      >
        + Add Ingredient
      </button>
      <div v-else class="flex items-start space-x-2 w-full">
        <input
          @keydown.enter.prevent="addIngredient"
          v-model="ingredient"
          placeholder="Ingredient"
          class="border-3 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-full h-10"
        />
        <button
          type="button"
          class="text-red-500"
          @click="showIngredientsInput = !showIngredientsInput"
        >
          <IconsCancel color="orangered" />
        </button>
      </div>
    </div>

    <!-- Directions -->
    <div class="flex flex-col items-start">
      <label class="block font-semibold mb-1">Directions</label>
      <ol
        class="list-decimal pl-6 space-y-2"
        v-if="recipeDraft.selectedSteps.length"
      >
        <li
          v-for="st in recipeDraft.selectedSteps"
          :key="st"
          class="list-item relative pr-8"
        >
          <span>{{ st }}</span>
          <button
            @click="recipeDraft.removeStep(st)"
            class="absolute right-0 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
          >
            <IconsRemove color="orangered" />
          </button>
        </li>
      </ol>
      <span v-if="v$.selectedSteps.$error" class="text-red-500 text-sm">
        {{ v$.selectedSteps.$errors[0].$message }}
      </span>
      <button
        type="button"
        class="mt-2 text-orange-500"
        @click="showDirectionsInput = !showDirectionsInput"
        v-if="showDirectionsInput"
      >
        + Add Step
      </button>
      <div v-else class="flex items-start space-x-2 w-full">
        <textarea
          v-model="step"
          @keydown.enter.prevent="addStep"
          rows="2"
          placeholder="Step"
          class="border-3 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-full"
        ></textarea>
        <button
          type="button"
          class="text-red-500"
          @click="showDirectionsInput = !showDirectionsInput"
        >
          <IconsCancel color="orangered" />
        </button>
      </div>
    </div>

    <!-- Submit -->
    <div class="text-center">
      <button
        type="submit"
        class="bg-[orangered] text-white px-6 py-2 rounded-full shadow hover:bg-orange-600 cursor-pointer"
      >
        {{ props.mode === "create" ? "Submit" : "Update Recipe" }}
      </button>
    </div>
  </form>
</template>
