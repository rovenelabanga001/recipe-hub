<script setup>
import { categories } from "~/categories";

const goToCategory = (categoryName) => {
  navigateTo(`/categories/${categoryName}`);
};
</script>

<template>
  <div
    v-for="category in categories"
    :key="category.name"
    class="flex items-center gap-5 cursor-pointer group"
    @click="goToCategory(category.name.toLowerCase())"
  >
    <div
      class="w-16 h-16 rounded-xl overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-200"
    >
      <img
        :src="category.img"
        :alt="category.name"
        class="w-full h-full object-cover"
      />
    </div>
    <span class="text-sm font-medium text-center">{{ category.name }}</span>
  </div>
</template>
