<script setup>
const props = defineProps({
  recipe: Object,
});

const emit = defineEmits(["close"]);
const config = useRuntimeConfig();

const deleteRecipeWithComments = async (recipeId) => {
  try {
    await $fetch(`/recipes/${recipeId}`, {
      baseURL: config.public.baseUrl,
      method: "DELETE",
    });

    const comments = await $fetch("/comments", {
      baseURL: config.public.baseUrl,
      query: { recipeId },
    });

    await Promise.all(
      comments.map((comment) =>
        $fetch(`/comments/${comment.id}`, {
          baseURL: config.public.baseUrl,
          method: "DELETE",
        })
      )
    );

    emit("close");
    await refreshNuxtData("posts");
    await refreshNuxtData("comments");

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
          class="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          No
        </button>
        <button
          @click="deleteRecipeWithComments(recipe.id)"
          class="px-4 py-2 rounded bg-[orangered] text-white hover:bg-red-600"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>
