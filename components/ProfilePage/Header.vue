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
  <div
    class="flex flex-col w-[100%] min-h-[200px] flex gap-4 lg:w-[40%] lg:flex-row"
  >
    <div
      class="flex items-start justify-start w-[100%] rounded-xl lg:items-center lg:w-full lg:justify-center lg:border lg:border-[orangered]"
    >
      <IconsUser class="text-5xl lg:text-7xl" />
    </div>
    <div class="lg:self-end">
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
