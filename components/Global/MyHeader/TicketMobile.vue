<template>
  <NuxtLink
    to="/memberCenter/myCoupon"
    class="flex items-center"
  >
    <img
      src="@/assets/image/ticket.png"
      class="size-6"
      alt="point icon"
    />
    <p class="ml-1 text-sm text-secondary-1">{{ authStore.userInfo.totalTicket }}</p>
  </NuxtLink>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

defineOptions({
  name: 'TicketMobile'
})
</script>
