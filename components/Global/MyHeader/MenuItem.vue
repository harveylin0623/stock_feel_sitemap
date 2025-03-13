<template>
  <div
    class="relative w-auto shrink-0 grow-0 pb-2 sm:shrink sm:grow"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <div
      class="flex items-center justify-center whitespace-nowrap border-l border-gray-7 px-3 font-normal sm:px-1"
      :class="{'text-secondary-1':showSubMenu, 'border-r': isLastMenu, 'border-r-gray-7': isLastMenu}"
    >
      <a
        :href="menuInfo.url"
        class="mr-1"
        target="_blank"
      >{{ menuInfo.title }}</a>
      <ChevronDownIcon
        v-if="hasSubMenu"
        class="block size-4 shrink-0 grow-0"
        :class="{'-rotate-180': showSubMenu }"
      />
    </div>
    <template v-if="hasSubMenu">
      <div
        v-show="showSubMenu"
        class="invisible absolute left-1/2 top-[90%] w-full -translate-x-1/2 space-y-2 rounded-lg bg-white p-4 shadow-dropdown sm:visible"
      >
        <a
          v-for="subMenu in subMenuList"
          :key="subMenu.id"
          :href="subMenu.url"
          target="_blank"
          class="block w-full break-words bg-white py-2 text-center hover:bg-sub-menu"
        >{{ subMenu.title }}</a>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { useScreensWidth } from '@/composables/useScreensWidth.js'

const props = defineProps({
  menuInfo: {
    type: Object,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  totalMenu: {
    type: Number,
    required: true
  }
})

const { screensWidth } = useScreensWidth()
const showSubMenu = ref(false)

const subMenuList = computed(() => props.menuInfo.subcategories)

const hasSubMenu = computed(() => subMenuList.value.length > 0)

const isLastMenu = computed(() => props.order === props.totalMenu - 1)

const mouseEnter = () => {
  if ((device.tablet() || device.mobile()) && window.innerWidth < screensWidth.value.sm) {
    return
  }
  showSubMenu.value = true
}

const mouseLeave = () => {
  showSubMenu.value = false
}

defineOptions({
  name: 'MenuItem'
})
</script>
