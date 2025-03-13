<template>
  <div>
    not found
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware () {
    return navigateTo('/')
  }
})
</script>
