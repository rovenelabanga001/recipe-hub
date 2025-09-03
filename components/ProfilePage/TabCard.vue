<script setup>
const props = defineProps({
  showUserInfo: {
    type: Boolean,
    default: true,
  },
  showButtons: {
    type: Boolean,
    default: false,
  },
  recipe: Object,
});
</script>
<template>
  <div class="flex flex-col items-center md:gap-5 md:flex-row">
    <!-- image -->
    <div class="w-20 h-20 min shadow-2xl overflow-hidden rounded-lg">
      <img
        :src="recipe.image"
        alt=""
        class="w-full h-full object-cover object-center"
      />
    </div>

    <!-- recipe info -->
    <div class="flex flex-col text-center items-center md:text-start">
      <p v-if="showUserInfo" class="text-gray-500 italic text-sm">
        You added a recipe
      </p>
      <p class="text-lg text-gray-500 font-bold">
        {{ recipe.name }}
      </p>
      <button
        @click="navigateTo(`/recipes/${recipe.id}`)"
        class="mt-2 text-[orangered] text-sm py-1 rounded-lg cursor-pointer"
      >
        View Recipe
      </button>
    </div>

    <!-- buttons -->
    <div
      class="flex gap-6 justify-center mt-4 lg:mt-0 md:ml-auto lg:self-end"
      v-if="showButtons"
    >
      <button
        @click="navigateTo(`/edit/${recipe.id}`)"
        class="mt-2 text-[orangered] border border-[orangered] text-sm px-3 py-1 rounded-lg cursor-pointer"
      >
        Edit
      </button>
      <button
        class="mt-2 text-white bg-[orangered] font-bold text-sm px-3 py-1 rounded-lg cursor-pointer"
      >
        Delete
      </button>
    </div>
  </div>
</template>
