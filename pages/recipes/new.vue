<script setup>
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

const selectedCategories = ref([]);

const ingredient = ref("");
const selectedIngredients = ref([]);

const step = ref("");
const selectedSteps = ref([]);

const onCategoryClick = (category) => {
  if (!selectedCategories.value.includes(category)) {
    selectedCategories.value.push(category);
  }
};

const addUnique = (targetArr, valueRef) => {
  const value = valueRef.value.trim();
  if (value && !targetArr.value.includes(value)) {
    targetArr.value.push(value);
  }

  valueRef.value = "";
};

const onIngredientSubmit = () => addUnique(selectedIngredients, ingredient);
const onStepSubmit = () => addUnique(selectedSteps, step);
</script>
<template>
  <form
    action=""
    class="max-w-2xl mx-auto p-6 space-y-6 bg-cream rounded-2xl shadow"
  >
    <input
      type="text"
      placeholder="Title"
      class="w-full text-2xl border-b border-gray-400 font-bold focus:outline-none focus:border-[orangered]"
    />
    <div class="flex flex-col space-y-2">
      <label for="category" class="text-sm font-medium">Category:</label>
      <div class="flex flex-wrap gap-3">
        <span
          v-for="category in categories"
          @click="onCategoryClick(category)"
          class="px-2 py-1 rounded-2xl text-xs bg-gray-200 text-gray-600 w-[auto] cursor-pointer"
          >{{ category }}</span
        >
      </div>
      <ul v-if="selectedCategories.length >= 1" class="list-disc list-inside">
        <li v-for="category in selectedCategories" class="text-sm">
          {{ category }}
        </li>
      </ul>
    </div>

    <div>
      <input
        type="text"
        placeholder="Image Url"
        class="border-3 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-full h-10"
      />
    </div>
    <div class="flex flex-col">
      <label class="block font-semibold mb-2">Details</label>
      <ul class="space-y-2 text-gray-700">
        <li class="grid grid-cols-[200px_1fr] items-center">
          <span>⏱ Prep Time:</span>
          <div class="flex items-center gap-1">
            <input
              type="number"
              class="border-2 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-16"
            />
            <span>min</span>
          </div>
        </li>

        <li class="grid grid-cols-[200px_1fr] items-center">
          <span>🍳 Cook Time:</span>
          <div class="flex items-center gap-1">
            <input
              type="number"
              class="border-2 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-16"
            />
            <span>min</span>
          </div>
        </li>

        <li class="grid grid-cols-[200px_1fr] items-center">
          <span>🍽️ Servings:</span>
          <input
            type="number"
            class="border-2 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-16"
          />
        </li>
      </ul>
    </div>
    <div>
      <label class="block font-semibold mb-1">Ingredients</label>
      <div class="space-y-2">
        <div class="flex items-start space-x-2" v-if="!showIngredientsInput">
          <input
            @keydown.enter.prevent="onIngredientSubmit"
            v-model="ingredient"
            class="border-3 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-full h-10"
            placeholder="Ingredient"
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
      <ul class="list-disc list-inside">
        <li v-for="ingredient in selectedIngredients">
          {{ ingredient }}
        </li>
      </ul>
      <button
        type="button"
        class="mt-2 text-orange-500"
        v-if="showIngredientsInput"
        @click="showIngredientsInput = !showIngredientsInput"
      >
        + Add Ingredient
      </button>
    </div>
    <div>
      <label class="block font-semibold mb-1">Directions</label>
      <div>
        <div class="flex items-start space-x-2" v-if="!showDirectionsInput">
          <textarea
            v-model="step"
            @keydown.enter.prevent="onStepSubmit"
            rows="2"
            class="border-3 border-gray-400 rounded px-2 text-sm focus:outline-none focus:border-[orangered] w-full"
            placeholder="Step"
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
      <ol class="list-decimal pl-6 space-y-2">
        <li v-for="step in selectedSteps">
          {{ step }}
        </li>
      </ol>
      <button
        type="button"
        class="mt-2 text-orange-500"
        @click="showDirectionsInput = !showDirectionsInput"
        v-if="showDirectionsInput"
      >
        + Add Step
      </button>
    </div>
    <div class="text-center">
      <button
        type="submit"
        class="bg-[orangered] text-white px-6 py-2 rounded-full shadow hover:bg-[orange]-600 cursor-pointer"
      >
        Submit
      </button>
    </div>
  </form>
</template>
