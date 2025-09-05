<script setup>
import { NotificationsNotificationCard } from "#components";
import EmptyPlaceholder from "~/components/EmptyPlaceholder.vue";

definePageMeta({
  layout: "default",
  middleware: "auth",
});
const auth = useAuthStore();
const config = useRuntimeConfig();
const { data: notifications } = await useAsyncData(
  "notifications",
  async () => {
    const comments = await $fetch(
      `${config.public.baseUrl}/notifications?userId=${auth.user.id}&type=comment`
    );

    const favorites = await $fetch(
      `${config.public.baseUrl}/notifications?userId=${auth.user.id}&type=favorite`
    );

    return [...comments, ...favorites].sort((a, b) => {
  const dateA = new Date(a.createdAt || a.time);
  const dateB = new Date(b.createdAt || b.time);
  return dateB - dateA; // latest first
});
  }
);
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
    class="space-y-4 bg-gray-100 py-6 px-4 rounded-lg min-h-screen max-h-[550px] w-[100%] lg:px-8"
  >
    <h5 class="font-bold" v-if="notifications.length >= 1">
      Showing All Notifications
    </h5>
    <div v-if="notifications.length >= 1">
      <div class="px-2 space-y-2">
        <div class="bg-gray-400 h-0.5 w-full rounded"></div>
        <div v-for="notification in notifications" key:notification.id>
          <NotificationsNotificationCard
            :comment="notification.type === 'comment' ? notification : null"
            :favorite="notification.type === 'favorite' ? notification : null"
            :time="timeAgo(notification.createdAt)"
          />
        </div>
      </div>
    </div>
    <EmptyPlaceholder
      v-else
      message="Oops! You don't have any notifications yet"
      btn-txt="Explore"
      route="/"
    />
  </div>
</template>
