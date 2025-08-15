<script setup lang="ts">
import { categories } from "~/categories";
</script>

<template>
  <div
    v-for="category in categories"
    :key="category.name"
    class="flex flex-col cursor-pointer group"
  >
    <div
      class="w-16 h-16 rounded-xl overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-200"
    >
      <img
        :src="category.img"
        :alt="category.name"
        class="w-full h-full object-cover"
      />
      <span class="text-sm font-medium text-center">{{ category.name }}</span>
    </div>
  </div>
</template>
