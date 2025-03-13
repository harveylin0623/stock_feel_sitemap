<template>
  <div class="relative hidden shrink-0 grow-0 sm:block">
    <div
      class="flex cursor-pointer items-center space-x-1"
      @click.stop="toggleDropdown"
    >
      <img
        :src="authStore.avatarUrl"
        class="size-6 rounded-full"
        alt="avatar"
      />
      <p
        class="select-none"
        :class="{'text-secondary-1':showDropdown}"
      >
        {{ $t('seo.pageTitle.memberCenter') }}
      </p>
      <ChevronDownIcon
        class="size-4"
        :class="{'-rotate-180':showDropdown, 'text-secondary-1':showDropdown}"
      />
    </div>
    <ProfileDropdown
      v-model="showDropdown"
      :avatar="authStore.avatarUrl"
      :user-name="authStore.userInfo.name"
    />
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '@/stores/auth.js'
import ProfileDropdown from '@/components/Global/MyHeader/ProfileDropdown.vue'

const authStore = useAuthStore()
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

defineOptions({
  name: 'Profile'
})
</script>
