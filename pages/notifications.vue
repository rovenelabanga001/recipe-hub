<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

const { $authApi } = useNuxtApp();
const config = useRuntimeConfig();

const notifications = ref([]);
const activeFilter = ref("Unread");

// fetch notifications once on mount
onMounted(async () => {
  const saved = localStorage.getItem("activeFilter");
  if (saved) {
    activeFilter.value = saved;
  }
  try {
    const res = await $authApi(`${config.public.baseUrl}/my-notifications`);
    notifications.value = (res.data || []).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } catch (err) {
    console.error("Failed to fetch notifications", err);
  }
});

watch(activeFilter, (newVal) => {
  localStorage.setItem("activeFilter", newVal);
});
// filtered notifications by read/unread
const filteredNotifications = computed(() => {
  if (!notifications.value.length) return [];

  if (activeFilter.value === "Read") {
    return notifications.value.filter((n) => n.read === true);
  } else if (activeFilter.value === "Unread") {
    return notifications.value.filter((n) => n.read === false);
  } else {
    return notifications.value;
  }
});

// optional: split by type
const commentNotifications = computed(() =>
  filteredNotifications.value.filter((n) => n.type === "comment")
);

const favoriteNotifications = computed(() =>
  filteredNotifications.value.filter((n) => n.type === "favorite")
);

// helper to format "time ago"
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
</script>

<template>
  <div
    class="space-y-4 bg-gray-100 py-6 px-4 rounded-lg min-h-screen overflow-y-auto w-full lg:px-8"
  >
    <div v-if="notifications.length">
      <div class="px-2 space-y-3">
        <NotificationsHeader
          :active-filter="activeFilter"
          @change-filter="activeFilter = $event"
        />

        <div class="bg-gray-400 h-0.5 w-full rounded"></div>

        <NotificationsEmptyState
          v-if="filteredNotifications.length === 0"
          :activeFilter="activeFilter"
        />

        <div v-else class="flex flex-col gap-5">
          <NotificationsNotificationCard
            v-for="notification in filteredNotifications"
            :key="notification.id"
            :comment="notification.type === 'comment' ? notification : null"
            :favorite="notification.type === 'favorite' ? notification : null"
            :time="timeAgo(notification?.createdAt)"
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
