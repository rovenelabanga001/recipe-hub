<script setup>
import { categories } from "~/categories";
const recipeCategoryStore = useRecipeCategoryStore();

const goToCategory = (categoryName) => {
  recipeCategoryStore.selectedCategory = categoryName;
  navigateTo(`/recipes`);
};

const props = defineProps({
  dynamicStyle: String,
});
</script>

<template>
  <div
    v-for="category in categories"
    :key="category.name"
    class="flex flex-col items-center justify-center gap-2 cursor-pointer w-[25%] p-4 group md:items-start hover:shadow-lg transition duration-300"
    @click="goToCategory(category.name.toLowerCase())"
  >
    <!-- Image -->
    <div
      :class="[
        'w-16 h-16 rounded-xl overflow-hidden mb-2 group-hover:scale-110 transition-transform duration-300',
        dynamicStyle,
      ]"
    >
      <img
        :src="category.img"
        :alt="category.name"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Text -->
    <span
      class="text-sm font-medium text-center transition duration-300 group-hover:text-[orangered] group-hover:scale-105"
    >
      {{ category.name }}
    </span>
  </div>
</template>
