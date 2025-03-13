<template>
  <div
    id="member-center"
    class="mb-20 pt-8 sm:mb-[120px] sm:pt-10"
  >
    <div class="container">
      <div class="flex">
        <div class="hidden w-[180px] shrink-0 grow-0 sm:block">
          <MemberCenterMenu />
        </div>
        <div class="shrink grow pl-0 sm:pl-[30px]">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePageMeta } from '@/composables/usePageMeta.js'
import MemberCenterMenu from '@/components/MemberCenterMenu/index.vue'

const { memberCenterMeta } = usePageMeta()

definePageMeta({
  name: 'memberCenter'
})

defineOptions({
  name: 'MemberCenter'
})

useHead(memberCenterMeta)
</script>
