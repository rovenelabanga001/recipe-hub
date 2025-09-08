<script setup>
const props = defineProps(["posts"]);
const route = useRoute();

// Only show buttons if we're on /profile
const showButtons = computed(() => route.path === "/profile");
</script>

<template>
  <h5>Showing posts</h5>
  <div
    v-for="post in posts"
    :key="post.id"
    class="bg-white shadow rounded-xl p-4 space-y-3"
  >
    <profile-page-tab-card
      :recipe="post"
      :show-buttons="showButtons"
      :show-user-info="false"
    />
  </div>
</template>
