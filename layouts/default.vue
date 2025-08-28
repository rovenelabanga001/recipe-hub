<template>
  <div
    class="container flex-column mx-auto px-8 md:px-15 text-xs min-h-screen md:text-lg"
  >
    <Navbar />
    <div class="flex-column mx-auto mt-4 mb-6 bg-[#FDFAF5]">
      <slot />
    </div>
  </div>
</template>
