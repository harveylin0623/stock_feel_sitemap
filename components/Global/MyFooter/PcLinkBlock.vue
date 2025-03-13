<template>
  <div class="hidden shrink grow items-start device1:flex">
    <PcLinkItem
      v-for="item in footerLink"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script setup>
import { useFooterLink } from '@/composables/useFooterLink.js'
import PcLinkItem from '@/components/Global/MyFooter/PcLinkItem.vue'

const { footerLink } = useFooterLink()

defineOptions({
  name: 'PcLinkBlock'
})
</script>
