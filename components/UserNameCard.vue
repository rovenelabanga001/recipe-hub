<script setup>
const {$authApi} = useNuxtApp()
const props = defineProps(["userId"])

const user = await $authApi(`/users/id/${props.userId}`)
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