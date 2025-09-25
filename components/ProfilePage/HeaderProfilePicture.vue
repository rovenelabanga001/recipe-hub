<script setup>
const props = defineProps({
  userId: String,
  mode: { type: String, default: "other" },
});
const { $authApi } = useNuxtApp();

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
const { data: user, refresh } = await useAsyncData(`user-${props.userId}`, () =>
  $authApi(`/users/id/${props.userId}`)
);

const isUploading = ref(false);
const isDeleting = ref(false);

const onDeleteProfilePicture = async () => {
  try {
    isDeleting.value = true;

    await $authApi("/users/profile_picture/reset", {
      method: "POST",
    });

    await refresh();
  } catch (err) {
    console.error("console.error", err);
  } finally {
    isDeleting.value = false;
  }
};

const onFileSelected = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    isUploading.value = true;
    const formData = new FormData();
    formData.append("file", file);

    await $authApi("/users/profile_picture", {
      method: "POST",
      body: formData,
    });

    await refresh();
  } catch (err) {
    console.error("Upload failed", err);
  } finally {
    isUploading.value = false;
  }
};
</script>
<template>
  <LoadingComponent v-if="isUploading || isDeleting" />
  <div
    class="flex flex-col items-start justify-center w-[40%] min-h-[100px] rounded-xl md:w-[50%] lg:w-full"
    v-else
  >
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-white flex items-center justify-center z-[999999]"
      @click.self="closeModal"
    >
      <img
        :src="user.profile_pic"
        alt="Profile Picture"
        class="max-w-[70%] max-h-[70%] rounded-lg object-contain shadow-lg"
      />
    </div>
    <div class="relative inline-block h-full w-[150px] md:w-[200px]">
      <img
        @click="openModal"
        v-if="user?.profile_pic"
        :src="user?.profile_pic"
        alt="Profile Picture"
        class="w-full h-full min-w-full min-h-full rounded-xl object-cover"
      />
      <IconsUser v-else class="text-6xl md:text-7xl lg:text-8xl" />
      <div
        v-if="props.mode === 'self'"
        class="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-white rounded-full p-1 shadow-md w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex items-center justify-center"
      >
        <label>
          <IconsUploadPhoto
            class="cursor-pointer text-[orangered] text-base md:text-lg lg:text-xl"
          />
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="
              (e) => {
                onFileSelected(e);
                e.target.value = null;
              }
            "
          />
        </label>
      </div>
      <!-- <div
        class="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 bg-white rounded-full p-1 shadow-md w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex items-center justify-center"
      >
        <button @click="onDeleteProfilePicture">
          <IconsDelete
            class="cursor-pointer text-red-500 text-base md:text-lg lg:text-xl"
          />
        </button>
      </div> -->
    </div>
  </div>
</template>
