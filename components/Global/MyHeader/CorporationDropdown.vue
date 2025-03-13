<template>
  <div
    class="relative py-[10px]"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <div class="flex cursor-pointer items-center text-sm text-gray-3">
      <p
        class="mr-1"
        :class="{'text-secondary-1':dropdownIsOpen}"
      >
        {{ $t('footerLink.group.ganganGroup') }}
      </p>
      <ChevronDownIcon
        class="size-4"
        :class="{'text-secondary-1':dropdownIsOpen, '-rotate-180': dropdownIsOpen}"
      />
    </div>
    <div
      v-show="dropdownIsOpen"
      class="absolute left-0 top-full z-[1] w-[170px] translate-x-[-40px] rounded-lg bg-white p-4 shadow-dropdown"
    >
      <a
        v-for="(item,index) in groupList"
        :key="index"
        :href="item.url"
        target="_blank"
        class="block w-full bg-white px-[14px] py-[10px] text-center text-sm hover:bg-sub-menu"
      >
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { useFooterLink } from '@/composables/useFooterLink.js'

const { footerLink } = useFooterLink()
const dropdownIsOpen = ref(false)

const groupList = computed(() => {
  const obj = footerLink.value.find(item => item.id === 3)
  return obj !== undefined ? obj.children : []
})

const mouseEnter = () => {
  dropdownIsOpen.value = true
}

const mouseLeave = () => {
  dropdownIsOpen.value = false
}

defineOptions({
  name: 'CorporationDropdown'
})
</script>

