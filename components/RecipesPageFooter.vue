<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  goToPage: Function,
});
</script>
<template>
  <div class="flex gap-2 mt-6 fixed bottom-0">
    <button
      class="px-3 py-1 rounded-xl bg-gray-200 hover:bg-gray-400 disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Prev
    </button>
    <div class="flex gap-1">
      <button
        v-for="page in totalPages"
        :key="page"
        class="px-3 py-1 rounded"
        :class="
          page === currentPage
            ? 'bg-[orangered] text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        "
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
    <button
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>
