<template>
  <div class="flex items-center space-x-4">
    <a
      v-for="social in socialLink"
      :key="social.footerImage"
      :href="social.link"
      target="_blank"
      class="size-6 device1:size-8"
    >
      <img
        :src="social.footerImage"
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
  name: 'FooterSocialBlock'
})
</script>
