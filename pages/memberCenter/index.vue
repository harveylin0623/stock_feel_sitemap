<template>
  <div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware () {
    return navigateTo('/memberCenter/myCoupon')
  }
})

defineOptions({
  name: 'MemberCenter'
})
</script>
