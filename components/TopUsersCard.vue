<script setup>
const config = useRuntimeConfig();

const { data: recipes } = await useSafeFetch(
  `${config.public.baseUrl}/recipes`,
  {
    key: "recipes",
  }
);

//logic to get top 2 users from the /recipes endpoint
const topUsers = computed(() => {
  if (!recipes.value) return;

  const counts = recipes.value.reduce((acc, recipe) => {
    acc[recipe.userID] = (acc[recipe.userID] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([userID, count]) => ({ userID, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 2);
});

//fetch details for top users with their ID from the /users endpoint

const userDetails = ref([]);

watchEffect(async () => {
  if (!topUsers.value.length) return;

  const users = await Promise.all(
    topUsers.value.map((u) =>
      $fetch(`${config.public.baseUrl}/users/${u.userID}`)
    )
  );

  userDetails.value = users.map((user, i) => ({
    ...user,
    recipeCount: topUsers.value[i].count,
  }));
});
</script>
<template>
  <div class="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2">
    <TopUserCardInfo v-for="user in userDetails" :key="user.id" :user="user" />
  </div>
</template>
