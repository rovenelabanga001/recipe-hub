<script setup>
const notificationsStore = useNotificationsStore();

await notificationsStore.fetchUnread();
</script>

<template>
  <span
    v-if="notificationsStore.unread.length"
    class="ml-1 bg-[orangered] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
  >
    {{ notificationsStore.unread.length }}
  </span>
</template>
