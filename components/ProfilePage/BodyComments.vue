<script setup>
const props = defineProps(["comments"]);
</script>

<template>
  <h5>Showing recent comments</h5>
  <div
    v-for="comment in comments.reverse()"
    :key="comment.id"
    class="bg-white shadow rounded-xl p-4"
  >
    <profile-page-tab-comment-card :comment="comment" />
  </div>
</template>
