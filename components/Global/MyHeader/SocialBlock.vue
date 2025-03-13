<template>
  <div class="flex items-center space-x-2">
    <a
      v-for="social in socialLink"
      :key="social.sidebarImage"
      :href="social.link"
      target="_blank"
      class="size-6"
    >
      <img
        :src="social.sidebarImage"
        alt=""
        class="size-full"
      />
    </a>
  </div>
</template>

<script setup>
import { useSocialLink } from '@/composables/useSocialLink.js'

const { socialLink } = useSocialLink()

defineOptions({
  name: 'HeaderSocialBlock'
})
</script>
