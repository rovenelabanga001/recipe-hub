<script setup>
const props = defineProps(["overviewItems"]);
</script>
<template>
  <h5>Showing recent contributions</h5>
  <div
    v-for="(item, i) in overviewItems"
    :key="i"
    class="flex flex-col items-start bg-white shadow rounded-xl p-4"
  >
    <profile-page-tab-card v-if="item.type === 'post'" :recipe="item" />
    <profile-page-tab-comment-card
      v-else-if="item.type === 'comment'"
      :comment="item"
    />
  </div>
</template>
