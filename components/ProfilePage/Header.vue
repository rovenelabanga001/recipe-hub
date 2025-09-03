<script setup>
const auth = useAuthStore();
const config = useRuntimeConfig();

const { data } = await useSafeFetch(
  `${config.public.baseUrl}/recipes?userID=${auth.user.id}`,
  { key: "totalRecipes" }
);

const totalPosts = data.value?.length;
</script>
<template>
  <div class="flex w-[40%] min-h-[200px] flex gap-4">
    <div
      class="flex justify-center items-center w-[80%] border border-[orangered] rounded-xl"
    >
      <IconsUser class="text-7xl" />
    </div>
    <div class="self-end">
      <h5 class="text-[orangered] text-3xl font-bold">
        {{ auth.user?.username }}
      </h5>
      <p class="font-bold">{{ auth.user?.email }}</p>
      <p class="text-gray-400">
        Recipes: <span>{{ totalPosts }}</span>
      </p>
    </div>
  </div>
</template>
