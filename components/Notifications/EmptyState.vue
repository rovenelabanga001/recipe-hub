<script setup>
defineProps({
  activeFilter: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="text-center text-gray-500 py-6">
    <span v-if="activeFilter === 'Unread'">No Unread Notifications</span>
    <span v-else-if="activeFilter === 'Read'">No Read Notifications</span>
    <span v-else>No Notifications Found</span>
  </div>
</template>
