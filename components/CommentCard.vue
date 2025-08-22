<script setup>
const props = defineProps({
  comments: Array,
});

const timeAgo = (timestamp) => {
  const now = new Date();
  const kenyaOffset = 3 * 60; // Kenya is UTC+3 in minutes
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60000;
  const kenyaNow = new Date(utcNow + kenyaOffset * 60000);

  const date = new Date(timestamp);
  const diffMs = kenyaNow - date;

  if (diffMs < 0) return "now";

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return `${diffSeconds} secs ago`;
  } else if (diffMinutes <= 60) {
    return `${diffMinutes} mins ago`;
  } else if (diffHours <= 24) {
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  } else if (diffDays <= 7) {
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  } else if (diffWeeks <= 4) {
    return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
  } else if (diffMonths <= 12) {
    return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
  } else {
    return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
  }
};
</script>
<template>
  <div
    v-for="comment in comments"
    class="rounded-sm shadow-sm border border-gray-200 p-4 min-w-[100%] min-h-[80px] md:w-[100%] md:min-h-[100px]"
  >
    <div class="flex items-start space-x-3">
      <!-- Avatar -->
      <div class="flex-shrink-0">
        <IconsUser class="w-6 h-6" />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Header -->
        <div class="flex items-center space-x-2 mb-2">
          <h3 class="text-sm font-semibold text-gray-900">
            {{ comment.username }}
          </h3>
          <span class="text-sm text-gray-500">•</span>
          <span class="text-sm text-gray-500">{{ timeAgo(comment.time) }}</span>
        </div>

        <!-- Post content -->
        <p class="text-sm text-gray-800 leading-relaxed">
          {{ comment.body }}
        </p>
      </div>
    </div>
  </div>
</template>
