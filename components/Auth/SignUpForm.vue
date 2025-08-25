<template>
  <form
    class="flex flex-col shadow-2xl rounded-2xl p-7 bg-white/30 gap-5 text-sm"
  >
    <div>
      <h3 class="text-2xl">Get started</h3>
      <p class="text-sm">Enter Your Credentials To Create Your Account</p>
    </div>
    <div class="flex flex-col">
      <label>Username</label>
      <input
        type="text"
        class="bg-white h-10 px-2 w-full rounded"
        placeholder="eg john_doe"
      />
    </div>
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
    <div class="flex flex-col mb-5">
      <label>Confirm Password</label>
      <input
        type="text"
        class="bg-white h-10 px-2 w-full rounded"
        placeholder="eg myP@ssw0rd"
      />
    </div>

    <button
      class="bg-[orangered] w-full text-white rounded h-10 cursor-pointer"
    >
      Create Account
    </button>
    <p class="text-center">
      Already have an Account?<span class="text-[#AE4700] cursor-pointer"
        ><NuxtLink>Log in</NuxtLink></span
      >
    </p>
  </form>
</template>
