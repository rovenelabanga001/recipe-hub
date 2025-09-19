<script setup>
const { $authApi } = useNuxtApp();

const { data: topUsers } = await useAsyncData("top-users", async () => {
  const res = await $authApi("/top-users");
  return res.data.map((item) => ({
    ...item.user,
    recipeCount: item.recipe_count,
  }));
});
</script>

<template>
  <div class="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2">
    <TopUserCardInfo v-for="user in topUsers" :key="user.id" :user="user" />
  </div>
</template>
