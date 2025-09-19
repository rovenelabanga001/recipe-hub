<script setup>
import { useRecipeCategoryStore } from "#imports";
import { categoriesFilter } from "~/categoriesFilter";

const recipeCategoryStore = useRecipeCategoryStore();
const slugifyCategory = inject("slugifyCategory");
</script>

<template>
  <div v-for="cat in categoriesFilter" :key="cat.name">
    <button
      class="flex flex-col items-center justify-center cursor-pointer"
      @click="recipeCategoryStore.setCategory(slugifyCategory(cat.name))"
    >
      <component
        :is="cat.icon"
        :class="[
          'text-xl font-bold lg:text-3xl',
          recipeCategoryStore.selectedCategory === slugifyCategory(cat.name)
            ? 'text-[orangered]'
            : 'text-gray-400',
        ]"
      />
      <span
        :class="[
          'text-xs md:text-xl',
          recipeCategoryStore.selectedCategory === slugifyCategory(cat.name)
            ? 'text-[orangered]'
            : 'text-gray-400',
        ]"
      >
        {{ cat.name }}
      </span>
    </button>
  </div>
</template>
