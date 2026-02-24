<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const { data: page } = await useAsyncData("career", () => {
  return queryCollection("career").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});

const timelineItems = computed<TimelineItem[]>(() =>
  (page.value?.education || []).map((item: any) => ({
    date: item.year,
    title: item.title,
    description: item.description,
    icon: item.icon,
    institution: item.institution,
  })).sort((a, b) => b.date - a.date)
);
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
      }"
    />

    <UPageSection
      :ui="{
        container: '!pt-0 pb-24',
      }"
    >
      <div class="max-w-2xl mx-auto">
        <UTimeline
          :items="timelineItems"
          color="primary"
          size="md"
          :ui="{
            date: 'text-sm font-bold tracking-widest uppercase text-primary mb-1',
            title: 'text-base font-semibold text-highlighted',
            description: 'text-sm text-muted leading-relaxed mt-1',
            indicator: 'ring-2 ring-[var(--ui-primary)] ring-offset-2 ring-offset-[var(--ui-bg)]',
          }"
        >
          <!-- Custom date slot to also show institution -->
          <template #date="{ item }">
            <span class="text-sm font-bold tracking-widest uppercase text-primary">
              {{ item.date }}
            </span>
          </template>

          <!-- Custom title slot to show title + institution below -->
          <template #title="{ item }">
            <span class="text-base font-semibold text-highlighted">{{ item.title }}</span>
            <p class="text-sm font-medium text-muted mt-0.5">
              {{ (item as any).institution }}
            </p>
          </template>
        </UTimeline>
      </div>
    </UPageSection>
  </UPage>
</template>
