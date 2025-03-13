<template>
  <NuxtLink
    :to="redirectEcUrl"
    :external="true"
    class="w-[91px] shrink-0 grow-0 sm:w-[130px]"
    target="_blank"
  >
    <img
      src="@/assets/image/logo.png"
      class="h-auto w-full"
      alt="logo"
    />
  </NuxtLink>
</template>

<script setup>
const redirectEcUrl = ref(process.env.MMRM_EC_STOCKFEEL)

defineOptions({
  name: 'Logo'
})
</script>
