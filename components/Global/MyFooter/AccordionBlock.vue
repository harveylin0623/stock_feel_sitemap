<template>
  <div class="mb-10 space-y-5 device1:hidden">
    <AccordionItem
      v-for="item in footerLink"
      :key="item.id"
      :item="item"
      @toggle="toggleItem"
    />
  </div>
</template>

<script setup>
import { useFooterLink } from '@/composables/useFooterLink.js'
import AccordionItem from '@/components/Global/MyFooter/AccordionItem.vue'

const { footerLink } = useFooterLink()

const toggleItem = (payload) => {
  const obj = footerLink.value.find(item => item.id === payload.id)
  obj.isOpen = payload.isOpen
  if (payload.isOpen) {
    footerLink.value.forEach((item) => {
      if (item.id !== payload.id) {
        item.isOpen = false
      }
    })
  }
}

defineOptions({
  name: 'AccordionBlock'
})
</script>
