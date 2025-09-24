<script setup>
const { $authApi } = useNuxtApp();
const props = defineProps({
  userId: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    default: null,
  },
});

const user = ref(null);

const fetchUser = async () => {
  try {
    if (props.username) {
      const res = await $authApi(`users/username/${props.username}`);
      user.value = res.data;
    } else if (props.userId) {
      const res = await $authApi(`/users/id/${props.userId}`);
      user.value = res;
    }
  } catch (err) {
    console.error("Failed to fetch user:", err);
    user.value = null;
  }
};

watchEffect(() =>{
  fetchUser()
})
</script>
<template>
  <div class="flex flex-col items-center h-12 w-12">
    <img
      v-if="user?.profile_pic"
      :src="user?.profile_pic"
      class="w-full h-full object-cover rounded-full"
    />
    <IconsUser v-else />
  </div>
</template>
