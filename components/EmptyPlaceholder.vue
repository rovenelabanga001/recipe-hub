<script setup>
const props = defineProps({
  message: String,
  instructions: String,
  btnTxt: String,
  showBtn: {
    type: Boolean,
    default: true,
  },
  route: String,
});
</script>

<template>
  <div class="flex flex-col items-center justify-center space-y-6">
    <div class="w-50 h-50">
      <img
        src="/assets/images/error-image.png"
        class="h-full w-full object-cover object-center"
      />
    </div>
    <p class="italic">{{ message }} {{ instructions }}</p>
    <button
      v-if="showBtn"
      @click="navigateTo(`${route}`)"
      class="bg-[orangered] text-white w-auto py-2 px-3 rounded-xl cursor-pointer"
    >
      {{ btnTxt }}
    </button>
  </div>
</template>
