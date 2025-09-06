<script setup>
const props = defineProps(["user"]);

const viewUserProfile = inject("viewUserProfile");
</script>
<template>
  <div class="flex flex-col gap-4 border-2 border-gray-200 rounded-lg p-4">
    <div
      @click="viewUserProfile(props.user.username)"
      class="flex items-center gap-2 cursor-pointer"
    >
      <IconsUser />
      <h6 class="font-bold text-gray-500">
        <span>{{ user.username }}</span>
      </h6>
    </div>
    <TopUserRecipes :user="user" />
  </div>
</template>
