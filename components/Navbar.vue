<script setup>
const isOpen = ref(false);
const authStore = useAuthStore();
const onAddClick = () => {
  navigateTo("/recipes/new");
};
</script>
<template>
  <header>
    <nav class="container flex justify-between items-center mx-auto py-6">
      <div class="flex items-center gap-2">
        <img src="@/assets/images/logo.png" alt="logo" />
        <h5
          class="text-[orangered] font-bold-200 text-lg"
          style="font-family: 'Spicy Rice', cursive"
        >
          <NuxtLink to="/">Seepy</NuxtLink>
        </h5>
      </div>
      <ul class="hidden lg:flex items-center gap-4">
        <li>
          <NuxtLink to="/" exact-active-class="exact-active">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/recipes" exact-active-class="exact-active"
            >Recipes</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/notifications" exact-active-class="exact-active"
            >Notifications</NuxtLink
          >
        </li>
      </ul>
      <div class="hidden lg:flex items-center gap-4">
        <button
          @click="onAddClick"
          class="bg-[orangered] text-white py-1 px-2 rounded-3xl cursor-pointer"
        >
          Add Recipe +
        </button>
        <button
          @click="authStore.logout"
          class="bg-[orangered] text-white px-3 py-1 rounded-3xl cursor-pointer"
        >
          Logout
        </button>
        <button @click="navigateTo('/profile')" class="cursor-pointer">
          <IconsUser class="text-[orangered]" />
        </button>
      </div>
      <button class="lg:hidden z-1001" @click="isOpen = !isOpen">
        <IconsClose v-if="isOpen" />
        <IconsMenu v-else />
      </button>
    </nav>
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="lg:hidden flex flex-col items-start fixed top-0 right-0 bg-white shadow-lg px-4 py-20 h-[100%] w-[70%] z-1000 bg-[#FDFAF5]"
        style="background-color: #fdfaf5"
      >
        <ul class="flex flex-col gap-4">
          <li>
            <NuxtLink to="/" exact-active-class="exact-active">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/recipes" exact-active-class="exact-active"
              >Recipes</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/notifications" exact-active-class="exact-active"
              >Notifications</NuxtLink
            >
          </li>
        </ul>
        <div class="flex flex-col items-start gap-4 pt-4">
          <button @click="navigateTo('/profile')" class="cursor-pointer">
            <IconsUser class="text-[orangered]" />
          </button>
          <button
            @click="onAddClick"
            class="bg-[orangered] text-white py-1 px-2 rounded-3xl cursor-pointer"
          >
            Add Recipe +
          </button>
          <button
            @click="authStore.logout"
            class="flex self-start bg-[orangered] text-white px-3 py-1 rounded-3xl w-[100%] cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>
<style scoped>
.exact-active {
  color: orangered;
  font-weight: bold;
}
</style>
