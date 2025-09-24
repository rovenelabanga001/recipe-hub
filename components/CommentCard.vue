<script setup>
const props = defineProps({
  comments: Array,
});

const { $authApi } = useNuxtApp();

const auth = useAuthStore();
const config = useRuntimeConfig();

const emit = defineEmits(["delete"]);

const timeAgo = (timestamp) => {
  // Remove extra microseconds so JS can parse correctly
  const cleaned = timestamp.replace(/\.(\d{3})\d+/, ".$1"); // keep milliseconds only
  const date = new Date(cleaned + "Z"); // explicitly UTC

  const now = new Date(); // local time
  const diffMs = now - date;
  if (diffMs < 0) return "now";

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffSeconds < 60) return rtf.format(-diffSeconds, "second");
  if (diffMinutes < 60) return rtf.format(-diffMinutes, "minute");
  if (diffHours < 24) return rtf.format(-diffHours, "hour");
  if (diffDays < 7) return rtf.format(-diffDays, "day");
  if (diffWeeks < 4) return rtf.format(-diffWeeks, "week");
  if (diffMonths < 12) return rtf.format(-diffMonths, "month");
  return rtf.format(-diffYears, "year");
};

const onDeleteClick = async (commentId) => {
  try {
    const res = await $authApi(
      `${config.public.baseUrl}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );
    emit("delete", commentId);
  } catch (error) {
    console.error(error);
  }
};

const viewUserProfile = inject("viewUserProfile");
</script>
<template>
  <div
    v-for="comment in props.comments"
    class="rounded-sm shadow-sm border border-gray-200 p-4 min-w-[100%] min-h-[80px] md:w-[100%] md:min-h-[100px]"
    :id="`comment-${comment.id}`"
  >
    <div class="flex items-start space-x-3">
      <UserNameCard
        :username="comment.username"
        @click="viewUserProfile(comment.username)"
      />
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Header -->
        <div class="flex items-center space-x-2 mb-2 w-full">
          <h3 class="font-semibold text-gray-900">
            <span @click="viewUserProfile(comment.username)">{{
              comment.username
            }}</span>
          </h3>
          <span class="text-gray-500">•</span>
          <client-only>
            <span class="text-gray-500">{{ timeAgo(comment.time) }}</span>
            <template #fallback>
              <p class="text-gray-400 text-sm">Loading...</p>
            </template>
          </client-only>
          <button
            class="ml-auto self-center"
            v-if="comment.username === auth.user?.username"
            @click="onDeleteClick(comment.id)"
          >
            <IconsDelete class="text-[red] cursor:pointer text-lg" />
          </button>
        </div>

        <!-- Post content -->
        <p class="text-gray-800 leading-relaxed">
          {{ comment.body }}
        </p>
      </div>
    </div>
  </div>
</template>
