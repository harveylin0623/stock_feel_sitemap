<template>
  <BasicModal
    v-model:is-open="isOpen"
    header-title="請先登入"
    :show-icon="true"
    :show-x-mark="showXIcon"
  >
    <template v-slot:default>
      <div class="flex items-center justify-center">
        <BaseButton
          text="前往登入"
          class="btn-primary-1 w-[150px]"
          :right-icon-url="buttonIcon.arrowBtn"
          @click="confirmHandler"
        />
      </div>
    </template>
  </BasicModal>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useAuthStore } from '@/stores/auth.js'
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import { useAuth } from '@/composables/useAuth.js'
import BasicModal from '@/components/Modal/BasicModal.vue'

const route = useRoute()
const commonStore = useCommonStore()
const authStore = useAuthStore()
const { buttonIcon } = useButtonIcon()
const { goToLogin } = useAuth()

const showXIcon = computed(() => route.meta.isAuth !== true)

const isOpen = computed({
  get () {
    return commonStore.showReLoginModal
  },
  set (val) {
    commonStore.toggleReLoginModal(val)
  }
})

const confirmHandler = () => {
  authStore.logout()
  goToLogin()
}

defineOptions({
  name: 'ReloginModal'
})
</script>
