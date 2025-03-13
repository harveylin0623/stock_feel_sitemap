<template>
  <div class="hidden items-center sm:flex">
    <img
      src="@/assets/image/ticket.png"
      alt=""
      class="size-6"
    />
    <NuxtLink
      to="/memberCenter/myCoupon"
      class="ml-1"
    >
      {{ $t('seo.pageTitle.myCoupon') }}
    </NuxtLink>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Ticket'
})
</script>
