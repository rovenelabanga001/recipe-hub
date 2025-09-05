<script setup>
const props = defineProps({
  activeFilter: {
    type: String,
    default: true,
  },
});

defineEmits(["changeFilter"]);
</script>
<template>
  <div
    class="flex flex-col items-start gap-4 w-full px-2 md:flex-row md:justify-between md:h-[50px]"
  >
    <h5 class="font-bold">
      Showing
      <span v-if="activeFilter === 'Unread'">Unread</span>
      <span v-else-if="activeFilter === 'Read'">Read</span>
      <span v-else>All</span>
      Notifications
    </h5>

    <div class="flex items-center gap-3 text-xs md:text-sm">
      <button
        v-for="filter in ['Unread', 'Read', 'All']"
        :key="filter"
        @click="$emit('changeFilter', filter)"
        :class="[
          'px-1 py-1 rounded-2xl w-15 md:px-3 md:w-20',
          activeFilter === filter
            ? 'bg-[orangered] text-white'
            : 'text-[orangered]',
        ]"
      >
        {{ filter }}
      </button>
    </div>
  </div>
</template>
