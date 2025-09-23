<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: "self",
  },
  username: {
    type: String,
    default: "",
  },
});

const auth = useAuthStore();
const { $authApi } = useNuxtApp();

let userId = ref(null);
let user = ref(null);

if (props.mode === "other") {
  const { data: fetchedUser } = await useAsyncData(
    `user-${props.username}`,
    async () => {
      const res = await $authApi(`/users/username/${props.username}`);
      return res.data; // return only the user object
    }
  );

  if (!fetchedUser.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `User "${props.username}" not found`,
      fatal: true,
    });
  }

  userId.value = fetchedUser.value.id;
  user.value = fetchedUser.value;
} else {
  userId.value = auth.user?.id;
  user.value = auth.user;
}

const { data: recipes } = await useAsyncData(`recipes-${userId.value}`, () =>
  $authApi(`/users/${userId.value}/recipes`)
);

const totalPosts = computed(() => recipes.value?.length || 0);
</script>
<template>
  <div class="flex flex-col w-full min-h-[200px] gap-4 lg:w-[40%] lg:flex-row">
    <ProfilePageHeaderProfilePicture :userId="userId"/>
    <div class="flex flex-col space-between lg:self-end">
      <h5 class="text-[orangered] text-3xl font-bold">
        {{ user?.username }}
      </h5>
      <p class="font-bold" v-if="props.mode === 'self'">{{ user?.email }}</p>
      <p class="text-gray-400">
        Recipes: <span>{{ totalPosts }}</span>
      </p>
    </div>
  </div>
</template>
