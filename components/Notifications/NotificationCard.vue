<script setup>
const props = defineProps({
  comment: Object,
  favorite: Object,
  time: String,
});

const config = useRuntimeConfig();

const handleClick = async () => {
  if (props.comment) {
    await $fetch(`${config.public.baseUrl}/notifications/${props.comment.id}`, {
      method: "PATCH",
      body: { read: true },
    });
    navigateTo(
      `/recipes/${props.comment.postId}?commentId=${props.comment.commentId}`
    );
  } else {
    await $fetch(
      `${config.public.baseUrl}/notifications/${props.favorite.id}`,
      {
        method: "PATCH",
        body: { read: true },
      }
    );
    navigateTo(`/recipes/${props.favorite.recipeId}`);
  }
};
</script>
<template>
  <div
    class="flex flex-col items-start gap-4 bg-white w-full min-h-[80px] rounded-lg px-2 py-3"
  >
    <p>
      <span class="text-xs font-bold text-gray-500">
        {{ comment ? comment.message : favorite.message }}
      </span>
    </p>
    <div class="flex justify-between w-full">
      <button
        @click="handleClick"
        class="rounded-2xl w-auto text-[orangered] text-xs px-2 py-1 cursor-pointer"
      >
        {{ comment ? "See Comment" : "See Post" }}
      </button>
      <ClientOnly>
        <p class="self-end text-gray-400 text-xs">
          {{ time }}
        </p>
      </ClientOnly>
    </div>
  </div>
</template>
