<template>
  <BasicModal
    v-model:is-open="isOpen"
    :header-title="headerTitle"
  >
    <template v-slot:default>
      <img
        :src="redeemImageUrl"
        class="mx-auto mb-6 size-[200px]"
        alt=""
      />
      <div class="mb-2 text-center text-[28px] font-medium">
        <template v-if="isFail">
          <div v-show="showPointNotEnouthMsg">
            <p>{{ $t('coinNotEnouthText.one') }}</p>
            <p>{{ $t('coinNotEnouthText.two') }}</p>
          </div>
          <p v-show="!showPointNotEnouthMsg">{{ rcrm }}</p>
        </template>
        <p v-else>{{ $t('sureWantToUseLemonCoinsRedeemCoupon', { coin: payCoin }) }}</p>
      </div>
      <div class="mb-10 flex items-center justify-center">
        <p class="mr-4 text-gray-5">{{ $t('remainingLemonCoins') }}</p>
        <LemonImage />
        <p class="ml-1 text-secondary-1">{{ authStore.userInfo.totalPoint }}</p>
      </div>
      <div class="flex items-center justify-between">
        <BaseButton
          :text="$t('cancel')"
          class="btn-outline-gray-2 w-[49%]"
          @click="toggle(false)"
        />
        <BaseButton
          :text="confirmText"
          class="btn-primary-1 w-[49%]"
          :right-icon-url="buttonIcon.arrowBtn"
          @click="confirmHandler"
        />
      </div>
    </template>
  </BasicModal>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import { useMemberMenuList } from '@/composables/useMemberMenuList.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import BasicModal from '@/components/Modal/BasicModal.vue'
import redeemDoing from '@/assets/image/redeem_tickets.png'
import redeemFail from '@/assets/image/insufficient_balance.png'

const props = defineProps({
  payCoin: {
    type: String,
    required: true
  },
  redeemStatus: {
    type: String,
    default: 'fail'
  },
  rcCode: {
    type: String,
    default: ''
  }
})

const { t } = useI18n()
const authStore = useAuthStore()
const { buttonIcon } = useButtonIcon()
const { memberMenuList } = useMemberMenuList()
const { mmrmResponseCode } = useMmrmResponseCode()
const isOpen = ref(false)

const isFail = computed(() => props.redeemStatus === 'fail')

const headerTitle = computed(() => isFail.value ? t('redemptionFailed') : '')

const redeemImageUrl = computed(() => isFail.value ? redeemFail : redeemDoing)

const confirmText = computed(() => isFail.value ? t('goToMissionCenter') : t('confirmExchange'))

const showPointNotEnouthMsg = computed(() => {
  return props.rcCode === mmrmResponseCode.value.COUPON_ACTIVITY_REDEEM_POINT_NOT_ENOUGH.code
})

const rcrm = computed(() => {
  const obj = mmrmResponseCode.value[props.rcCode]
  return obj !== undefined ? obj.title : ''
})

const emit = defineEmits(['redeemConfirm'])

const confirmHandler = () => {
  if (isFail.value) {
    const obj = memberMenuList.value.find(menu => menu.id === 3)
    if (obj !== undefined) {
      window.open(obj.url)
    }
  } else {
    emit('redeemConfirm')
  }
}

const toggle = (val) => {
  isOpen.value = val
}

defineExpose({
  toggle
})

defineOptions({
  name: 'RedeemModal'
})
</script>
