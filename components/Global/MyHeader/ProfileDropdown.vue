<template>
  <div
    v-show="modelValue"
    class="absolute right-0 top-[calc(100%+16px)] z-[1] w-[200px] rounded bg-white px-4 py-[18px] shadow-dropdown"
  >
    <div class="flex items-center border-b border-b-gray-7 pb-2">
      <img
        :src="avatar"
        class="size-10 rounded-full"
        alt=""
      />
      <div class="ml-2">
        <p>{{ userName }}</p>
        <p class="text-secondary-1">初級會員</p>
      </div>
    </div>
    <div class="my-2 space-y-3">
      <ProfileDropdownItem
        v-for="list in dropdownList"
        :key="list.id"
        :dropdown="list"
      />
    </div>
    <div
      class="border-t border-t-gray-7 pt-2"
      @click="goToLogout"
    >
      <div class="flex w-full cursor-pointer items-center">
        <img
          src="@/assets/image/memberDoprdown/logout.png"
          class="h-auto w-[30px]"
          alt=""
        />
        <p class="ml-3 text-base">登出</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth.js'
import { useMemberMenuList } from '@/composables/useMemberMenuList.js'
import ProfileDropdownItem from '@/components/Global/MyHeader/ProfileDropdownItem.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
})

const { goToLogout } = useAuth()
const { memberMenuList } = useMemberMenuList()
const memberMenuIds = ref([2, 4, 5, 3, 6])

const dropdownList = computed(() => {
  const list = memberMenuIds.value.reduce((prev, current) => {
    const obj = memberMenuList.value.find(item => item.id === current)
    prev.push(obj)
    return prev
  }, [])
  return list
})

const emit = defineEmits(['update:modelValue'])

const closeDropdown = () => {
  emit('update:modelValue', false)
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown)
})

defineOptions({
  name: 'ProfileDropdown'
})
</script>
