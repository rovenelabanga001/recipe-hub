<script setup>
const props = defineProps(["posts"]);
</script>
<template>
  <h5>Showing recent posts</h5>
  <div
    v-for="post in posts"
    :key="post.id"
    class="bg-white shadow rounded-xl p-4 space-y-3"
  >
    <profile-page-tab-card :recipe="post" />
  </div>
</template>
