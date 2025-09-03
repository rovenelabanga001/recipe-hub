<script setup>
const props = defineProps({
  showUserInfo: {
    type: Boolean,
    default: true,
  },
  recipe: Object,
});
</script>
<template>
  <div class="flex items-center gap-5">
    <div class="w-20 h-20 min shadow-2xl overflow-hidden rounded-lg">
      <img
        :src="recipe.image"
        alt=""
        class="w-full h-full object-cover object-center"
      />
    </div>
    <div>
      <p v-if="showUserInfo" class="text-gray-500 italic text-sm">
        You added a recipe
      </p>
      <p class="text-lg text-gray-500 font-bold">
        {{ recipe.name }}
      </p>
      <button
        @click="navigateTo(`/recipes/${recipe.id}`)"
        class="mt-2 text-[orangered] w-[auto] text-start text-sm px-1 py-1 rounded-lg bg-none cursor-pointer"
      >
        View Recipe
      </button>
    </div>
  </div>
</template>
