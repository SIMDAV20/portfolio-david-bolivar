<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => {
  return queryCollection("index").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
});
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <div class="mb-12 flex flex-col gap-8">
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </div>
    <!-- <LandingBlog :page /> -->
    <!-- <LandingTestimonials :page /> -->
    <LandingFAQ :page />
  </UPage>
</template>
