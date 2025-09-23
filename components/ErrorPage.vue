<script setup>

const router = useRouter();

const props = defineProps({
  error: Object,
});

// Compute a friendly error message
const errorMessage = computed(() => {
  if (!props.error) return "Something went wrong.";

  switch (props.error.statusCode) {
    case 404:
      return "Page not found!";
    case 500:
      return "Server error! Please try again later.";
    case 403:
      return "You don't have permission to view this page.";
    default:
      return props.error.statusMessage || "An unexpected error occurred.";
  }
});

// Handlers for action buttons
const goHome = () => navigateTo("/");
const goBack = () => router.back();
const retry = () => window.location.reload();
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center gap-5 bg-[#FDFAF5] px-4">
    <!-- Error Image -->
    <img
      src="/assets/images/error-image.png"
      alt="error image"
      class="h-32 w-32 object-cover"
    />

    <!-- Error Text -->
    <div class="flex flex-col justify-center items-center text-center gap-3">
      <h5 class="text-orange-500 font-bold text-2xl">Oops!</h5>
      <p class="text-gray-400 text-xl">{{ errorMessage }}</p>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3 mt-3 flex-wrap justify-center">
      <!-- <button
        @click="goHome"
        class="bg-orange-500 px-4 py-2 text-white rounded-sm hover:bg-orange-600 transition"
      >
        Home
      </button>
      <button
        @click="goBack"
        class="bg-gray-200 px-4 py-2 text-gray-700 rounded-sm hover:bg-gray-300 transition"
      >
        Back
      </button> -->
      <button
        @click="retry"
        class="bg-blue-500 px-4 py-2 text-white rounded-sm hover:bg-blue-600 transition"
      >
        Retry
      </button>
    </div>
  </div>
</template>
