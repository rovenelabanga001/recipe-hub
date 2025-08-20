<script setup>
const props = defineProps(["user"]);
</script>
<template>
  <div class="flex flex-col gap-4 border border-gray-200 rounded-lg p-4">
    <div class="flex items-center gap-2">
      <IconsUser />
      <h6>{{ user.username }}</h6>
    </div>
    <TopUserRecipes :user="user" />
  </div>
</template>
