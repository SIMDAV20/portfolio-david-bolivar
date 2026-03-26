<script setup lang="ts">
interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  date: string;
  status?: string;
  company?: string;
  moreDescription?: string;
}

const { data: page } = await useAsyncData("projects-page", () => {
  return queryCollection("pages").path("/projects").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: projectsRaw } = await useAsyncData("projects", () => {
  return queryCollection("projects").all();
});

const projects = computed(() => {
  if (!projectsRaw.value) return [];
  return [...projectsRaw.value].sort((a, b) => {
    // Active/in-development projects always come first
    const statusA = a.status || "";
    const statusB = b.status || "";
    if (statusA === "active" && statusB !== "active") return -1;
    if (statusB === "active" && statusA !== "active") return 1;
    // Then sort by date descending
    return Number(b.date) - Number(a.date);
  });
});

const selectedProject = ref<Project | null>(null);
const open = ref(false);

function openProject(project: Project) {
  selectedProject.value = project;
  open.value = true;
}

const { global } = useAppConfig();

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});

const tagsColor = computed<Record<string, string>>(() => {
  return {
    "Vue 3": "bg-green-500 text-white",
    "Laravel 10": "bg-red-500 text-white",
    "Laravel 12": "bg-red-500 text-white",
    Angular: "bg-red-500 text-white",
    NestJS: "bg-red-500 text-white",
    MySQL: "bg-blue-500 text-white",
    AWS: "bg-orange-500 text-white",
    MongoDB: "bg-[#4DB33D] text-white",
    Flutter: "bg-[#02569B] text-white",
    PostgreSQL: "bg-[#336791] text-white",
    "Stored Procedures": "bg-[#336791] text-white",
  };
});
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start',
      }"
    >
      <!-- <template #links>
        <div v-if="page.links" class="flex items-center gap-2">
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            v-bind="page.links[0]"
          />
          <UButton :to="`mailto:${global.email}`" v-bind="page.links[1]" />
        </div>
      </template> -->
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0',
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="`project-${index}`"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last',
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ new Date(project.date).getFullYear() }}
            </span>
          </template>
          <template #footer>
            <div class="flex flex-row gap-2">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                variant="subtle"
                :class="tagsColor[tag]"
              >
                {{ tag }}
              </UBadge>
            </div>

            <UButton
              label="More info"
              variant="link"
              color="neutral"
              class="text-sm mt-2 cursor-pointer"
              @click.stop="openProject(project)"
            />
          </template>
          <img
            :src="project.image"
            :alt="project.title"
            class="object-cover w-full h-48 rounded-lg"
          />
        </UPageCard>
      </Motion>

      <UModal
        v-model:open="open"
        :close-button="{
          color: 'primary',
          variant: 'outline',
        }"
        :title="selectedProject?.title"
        :ui="{
          content: 'max-w-2xl',
        }"
      >
        <template #body>
          <div class="text-sm space-y-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_p]:mb-2 [&_strong]:font-semibold">
            <MDC v-if="selectedProject?.moreDescription" :value="selectedProject.moreDescription" />
          </div>
        </template>
      </UModal>
    </UPageSection>
  </UPage>
</template>
