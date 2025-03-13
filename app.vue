<template>
  <NuxtLoadingIndicator
    :color="indicatorColor"
    :height="2"
    :throttle="0"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { t } = useI18n()
const templateTitle = ref(t('seo.pageTitle.template'))
const indicatorColor = ref('')

const getIndicatorColor = () => {
  const color = window.getComputedStyle(document.documentElement).getPropertyValue('--colors-secondary-1')
  indicatorColor.value = color || ''
}

onMounted(() => {
  getIndicatorColor()
})

useHead({
  titleTemplate: `%s | ${templateTitle.value}`
})
</script>
