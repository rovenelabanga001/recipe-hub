<template>
  <header>
    <nav class="container flex justify-between items-center mx-auto py-6">
      <h5 class="text-[orangered] font-bold text-lg">
        <NuxtLink to="/">Seepy</NuxtLink>
      </h5>
      <ul class="flex items-center gap-4">
        <li>
          <NuxtLink to="/" exact-active-class="exact-active">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/recipes" exact-active-class="exact-active"
            >Recipes</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/categories" exact-active-class="exact-active"
            >Categories</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/favorites" exact-active-class="exact-active"
            >Favorites</NuxtLink
          >
        </li>
      </ul>
      <div class="flex items-center gap-4">
        <button>Add Recipe</button>
        <p>User Icon logout</p>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.exact-active {
  color: orangered;
  font-weight: bold;
}
</style>
