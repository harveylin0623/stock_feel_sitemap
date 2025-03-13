<template>
  <header class="fixed left-0 top-0 z-10 w-full bg-white">
    <NavBlock />
    <div
      class="border-b-gray-7 pt-4"
      :class="headerTopBorderStatus"
    >
      <div class="container">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center">
            <Logo />
          </div>
          <div class="flex items-center space-x-3 text-sm sm:space-x-5">
            <template v-if="authStore.isLogin">
              <Point />
              <TicketMobile />
              <Profile />
            </template>
            <Login v-else />
          </div>
        </div>
        <div
          class="flex flex-nowrap items-center overflow-x-auto overflow-y-hidden transition-[height] duration-150 sm:overflow-visible"
          :class="menuHeightStatus"
        >
          <MenuItem
            v-for="(menu, index) in headerStore.menuList"
            :key="menu.id"
            :menu-info="menu"
            :order="index"
            :total-menu="totalMenu"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import _ from 'lodash'
import { useAuthStore } from '@/stores/auth.js'
import { useHeaderStore } from '@/stores/header.js'
import { useScrollDownHide } from '@/composables/useScrollDownHide.js'
import { useScreensWidth } from '@/composables/useScreensWidth.js'
import NavBlock from '@/components/Global/MyHeader/NavBlock.vue'
import Logo from '@/components/Global/MyHeader/Logo.vue'
import Login from '@/components/Global/MyHeader/Login.vue'
import Point from '@/components/Global/MyHeader/Point.vue'
import Profile from '@/components/Global/MyHeader/Profile.vue'
import MenuItem from '@/components/Global/MyHeader/MenuItem.vue'
import TicketMobile from '@/components/Global/MyHeader/TicketMobile.vue'

const authStore = useAuthStore()
const headerStore = useHeaderStore()
const { scrollDownHide, headerTopBorderStatus, menuHeightStatus, displayMenu } = useScrollDownHide()
const { screensWidth } = useScreensWidth()

const totalMenu = computed(() => headerStore.menuList.length)

const scrollHandler = () => {
  if (window.innerWidth < screensWidth.value.sm) {
    displayMenu()
  }
}

const resizeHandler = () => {
  if (window.innerWidth >= screensWidth.value.sm) {
    scrollDownHide.value = false
  }
}

const throttleScroll = _.throttle(scrollHandler, 200)

onMounted(() => {
  window.addEventListener('scroll', throttleScroll)
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttleScroll)
  window.removeEventListener('resize', resizeHandler)
})

defineOptions({
  name: 'MyHeader'
})
</script>
