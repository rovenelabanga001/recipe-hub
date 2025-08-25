<script setup></script>
<template>
  <div class="flex items-start justify-center min-h-screen px-10 py-25 gap-5">
    <div
      class="flex items-center justify-around gap-10 bg-gradient-to-r from-[#FFFFFFCC] via-[#F5A380E6] to-[#EC4700] w-[70%] px-5 py-15 rounded-2xl"
    >
      <slot />
      <div class="max-w-[40%] max-h-[30%]">
        <img src="/assets/images/auth-image.png" />
      </div>
    </div>
  </div>
</template>
