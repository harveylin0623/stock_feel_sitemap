<template>
  <div class="border-y border-y-black p-5">
    <p class="mb-5">會員專區</p>
    <div class="space-y-5">
      <MenuItem
        v-for="(menu,index) in memberMenuList"
        :key="index"
        :menu="menu"
      />
    </div>
  </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { useMemberMenuList } from '@/composables/useMemberMenuList.js'

const { memberMenuList } = useMemberMenuList()

defineOptions({
  name: 'MemberCenterMenu'
})
</script>
