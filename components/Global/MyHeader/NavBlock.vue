<template>
  <div class="hidden bg-gray-8 sm:block">
    <div class="container">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-5">
          <NuxtLink
            :to="redirectEcUrl"
            :external="true"
            class="py-[10px] text-sm text-gray-3"
            target="_blank"
          >
            {{ $t('backHome') }}
          </NuxtLink>
          <CorporationDropdown />
        </div>
        <div class="flex items-center">
          <p class="mr-2 text-sm text-gray-3">Follow Us：</p>
          <SocialBlock />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CorporationDropdown from '@/components/Global/MyHeader/CorporationDropdown.vue'
import SocialBlock from '@/components/Global/MyHeader/SocialBlock.vue'

const redirectEcUrl = ref(process.env.MMRM_EC_STOCKFEEL)

defineOptions({
  name: 'NavBlock'
})
</script>
