<template>
  <LikeDragMenu
    :menu-title="menuTitle"
    :is-open="commonStore.showRedeemPanel"
    @close="closeHandler"
  >
    <div>
      <img
        :src="redeemImageUrl"
        class="mx-auto mb-6 size-[160px]"
        alt=""
      />
      <div
        class="mb-2 text-center text-xl font-medium"
      >
        <template v-if="isFail">
          <div v-show="showNotEnouthMsg">
            <p>{{ $t('coinNotEnouthText.one') }}</p>
            <p>{{ $t('coinNotEnouthText.two') }}</p>
          </div>
          <p v-show="!showNotEnouthMsg">{{ rcrm }}</p>
        </template>
        <p v-else>{{ $t('sureWantToUseLemonCoinsRedeemCoupon', { coin: payCoin }) }}</p>
      </div>
      <div class="mb-10 flex items-center justify-center">
        <p class="mr-4 text-gray-5">{{ $t('remainingLemonCoins') }}</p>
        <LemonImage />
        <p class="ml-1 text-secondary-1">{{ authStore.userInfo.totalPoint }}</p>
      </div>
      <div class="space-y-5">
        <BaseButton
          :text="confirmText"
          class="btn-primary-1"
          :right-icon-url="buttonIcon.arrowBtn"
          @click="confirmHandler"
        />
        <BaseButton
          :text="$t('cancel')"
          class="btn-outline-gray-2"
          @click="closeHandler"
        />
      </div>
    </div>
  </LikeDragMenu>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useCommonStore } from '@/stores/common.js'
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import { useMemberMenuList } from '@/composables/useMemberMenuList.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import LikeDragMenu from '@/components/LikeDragMenu/index.vue'
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
const commonStore = useCommonStore()
const { buttonIcon } = useButtonIcon()
const { memberMenuList } = useMemberMenuList()
const { mmrmResponseCode } = useMmrmResponseCode()

const isFail = computed(() => props.redeemStatus === 'fail')

const menuTitle = computed(() => isFail.value ? t('redemptionFailed') : '')

const redeemImageUrl = computed(() => isFail.value ? redeemFail : redeemDoing)

const confirmText = computed(() => isFail.value ? t('goToMissionCenter') : t('confirmExchange'))

const showNotEnouthMsg = computed(() => {
  return props.rcCode === mmrmResponseCode.value.COUPON_ACTIVITY_REDEEM_POINT_NOT_ENOUGH.code
})

const rcrm = computed(() => {
  const obj = mmrmResponseCode.value[props.rcCode]
  return obj === undefined ? '' : obj.title
})

const emit = defineEmits(['redeemConfirm'])

const closeHandler = () => {
  commonStore.toggleRedeemPanel(false)
}

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

onBeforeUnmount(() => {
  closeHandler()
})

defineOptions({
  name: 'RedeemPanel'
})
</script>
