<script setup>
import DeleteRecipePrompt from "../DeleteRecipePrompt.vue";

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

const showPrompt = ref(false);
</script>
<template>
  <delete-recipe-prompt
    v-if="showPrompt"
    :recipe="recipe"
    @close="showPrompt = false"
  />
  <div class="flex flex-col">
    <p v-if="showUserInfo" class="text-gray-500 mb-3 italic text-xs md:text-sm">
      You added a recipe
    </p>
    <div class="flex items-start gap-8 md:gap-5 md:flex-row md:justify-between">
      <!-- image -->
      <div class="w-20 h-20 min shadow-2xl overflow-hidden rounded-lg">
        <img
          :src="recipe.image"
          alt=""
          class="w-full h-full object-cover object-center"
        />
      </div>

      <!-- recipe info -->
      <div class="flex flex-col text-center gap-2 items-start flex-1">
        <p class="text-xs text-gray-500 font-bold">
          {{ recipe.name }}
        </p>
        <NuxtLink
          :to="`/recipes/${recipe.id}`"
          class="text-[orangered] text-xs md:text-sm"
          >View Recipe</NuxtLink
        >
        <!-- buttons -->
        <div
          class="flex gap-6 justify-center lg:mt-0 md:ml-auto lg:self-end"
          v-if="showButtons"
        >
          <button
            @click="navigateTo(`/edit/${recipe.id}`)"
            class="text-[orangered] cursor-pointer"
          >
            <IconsEdit class="text-2xl" />
          </button>
          <button
            @click="showPrompt = true"
            class="text-[orangered] cursor-pointer"
          >
            <IconsDelete class="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
