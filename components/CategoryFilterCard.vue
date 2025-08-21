<script setup>
import { categoriesFilter } from "~/categoriesFilter";

const selectedCategory = inject("selectedCategory");
</script>

<template>
  <div v-for="cat in categoriesFilter" :key="cat.name">
    <button
      class="flex flex-col items-center justify-center"
      @click="selectedCategory = cat.name"
    >
      <component
        :is="cat.icon"
        :class="[
          'text-xl font-bold lg:text-3xl',
          selectedCategory === cat.name ? 'text-[orangered]' : 'text-gray-400',
        ]"
      />
      <span
        :class="[
          'text-xs md:text-xl',
          selectedCategory === cat.name ? 'text-[orangered]' : 'text-gray-400',
        ]"
        >{{ cat.name }}</span
      >
    </button>
  </div>
</template>
