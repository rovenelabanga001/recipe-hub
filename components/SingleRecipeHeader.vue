<script setup>
const props = defineProps(["recipe"]);
</script>
<template>
  <div class="flex justify-between items-start w-[100%] md:w[50%]">
    <h3 class="font-bold text-2xl">{{ recipe.name }}</h3>
    <button class="">
      <IconsFavorite color="orangered" class="size-5" />
    </button>
  </div>
  <ul class="flex gap-3">
    <li
      v-for="tag in recipe.tags"
      :key="tag"
      class="bg-gray-200 rounded-lg px-2 py-1 text-xs"
    >
      {{ tag }}
    </li>
  </ul>
</template>
