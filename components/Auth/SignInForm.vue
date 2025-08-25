<template>
  <form
    class="flex flex-col shadow-2xl rounded-2xl p-7 bg-white/30 gap-5 text-sm"
  >
    <h3 class="text-2xl">Log In</h3>
    <div class="flex flex-col">
      <label>Email</label>
      <input
        type="email"
        class="bg-white h-10 px-2 w-full rounded"
        placeholder="eg john_doe@example.com"
      />
    </div>
    <div class="flex flex-col">
      <label>Password</label>
      <input
        type="text"
        class="bg-white h-10 px-2 w-full rounded"
        placeholder="eg myP@ssw0rd"
      />
    </div>

    <button
      class="bg-[orangered] w-full text-white rounded h-10 cursor-pointer"
    >
      Sign In
    </button>
    <p class="text-center">
      Don't have an account yet?<span class="text-[#AE4700] cursor-pointer"
        ><NuxtLink>Register</NuxtLink></span
      >
    </p>
  </form>
</template>
