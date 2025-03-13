<template>
  <div class="mb-6 flex flex-wrap items-center space-x-2 sm:mb-8">
    <div
      v-for="(breadcrumb,index) in breadcrumbList"
      :key="index"
      class="flex items-center text-sm"
    >
      <NuxtLink
        :to="breadcrumb.path"
        class="mr-2 font-medium"
      >
        {{ breadcrumb.title }}
      </NuxtLink>
      <span v-show="index < totalBreadcrumb - 1">/</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  breadcrumbList: {
    type: Array,
    default () {
      return []
    }
  }
})

const totalBreadcrumb = computed(() => props.breadcrumbList.length)

defineOptions({
  name: 'Breadcrumb'
})
</script>
