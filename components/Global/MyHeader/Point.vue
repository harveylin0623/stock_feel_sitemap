<template>
  <div class="flex items-center">
    <LemonImage />
    <p class="ml-1 text-secondary-1">{{ authStore.userInfo.totalPoint }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

defineOptions({
  name: 'Point'
})
</script>
