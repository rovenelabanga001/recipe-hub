<script setup>
const modelValue = defineModel();
</script>
<template>
  <input
    type="text"
    placeholder="Search recipe here"
    v-model="modelValue"
    class="border border-gray-800 rounded-lg px-4 h-10 w-full focus:outline-none focus:ring-2 focus:ring-[orangered] focus:border-[orangered]"
  />
</template>
