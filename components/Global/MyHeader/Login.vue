<template>
  <div class="flex items-center">
    <img
      src="@/assets/image/user.png"
      alt="user"
      class="size-6"
    />
    <div
      class="ml-1 cursor-pointer"
      @click="goToLogin"
    >
      {{ $t('loginSingUp') }}
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth.js'

const { goToLogin } = useAuth()

defineOptions({
  name: 'Auth'
})
</script>
