<script setup>
const props = defineProps({
  recipe: Object,
});

const { $authApi } = useNuxtApp();
const emit = defineEmits(["close", "deleted"]);
const config = useRuntimeConfig();
const loading = ref(false);
const deleteRecipe = async (recipeId) => {
  try {
    loading.value = true;
    await $authApi(`/recipes/${recipeId}`, {
      baseURL: config.public.baseUrl,
      method: "DELETE",
    });

    emit("close");
    emit("deleted", recipeId);

    useToastify(`${props.recipe.name} recipe deleted successfully`, {
      type: "success",
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to delete recipe and comments", err);
    useToastify(
      `Failed to delete ${props.recipe.name} recipe, Try again later`,
      {
        type: "error",
      }
    );
    return { success: false, err };
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="fixed inset-0 z-2000 flex items-center justify-center bg-black/50 h-screen"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center space-y-4"
    >
      <h5 class="font-bold text-gray-800">
        Are you sure you want to delete
        <span class="text-[orangered]">{{ recipe.name }}</span> recipe?
      </h5>

      <div class="flex justify-center gap-4">
        <button
          @click="emit('close')"
          :disabled="loading"
          class="px-4 py-2 rounded bg-gray-300 text-gray-800 flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-gray-400"
        >
          No
        </button>
        <button
          @click="deleteRecipe(recipe.id)"
          class="px-4 py-2 rounded bg-[orangered] text-white hover:bg-red-600"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span v-else>Yes</span>
        </button>
      </div>
    </div>
  </div>
</template>
