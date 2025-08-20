<script setup>
import { categoriesFilter } from "~/categoriesFilter";
</script>

<template>
  <div v-for="cat in categoriesFilter">
    <button class="flex flex-col items-center justify-center">
      <component
        :is="cat.icon"
        class="text-[orangered] text-xl font-bold lg:text-3xl"
      />
      <span class="text-xs md:text-xl text-gray-500">{{ cat.name }}</span>
    </button>
  </div>
</template>
