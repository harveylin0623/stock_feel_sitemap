<template>
  <div class="mx-auto block w-[90%] items-center border-y border-y-black bg-white p-5 shadow-[0px_4px_20px_0px_#AEAEC033] sm:flex sm:w-[780px] sm:p-10">
    <div class="mx-auto mb-5 size-[160px] shrink-0 grow-0 sm:mb-0 sm:size-40">
      <img
        src="@/assets/image/logo3.png"
        class="size-full"
        alt=""
      />
    </div>
    <div class="shrink grow pl-0 sm:pl-10">
      <div class="mb-8 space-y-4 text-gray-3">
        <p>{{ $t('joinBlock.desc1') }}</p>
        <p>{{ $t('joinBlock.desc2') }}</p>
        <p>{{ $t('joinBlock.desc3') }}</p>
      </div>
      <div class="items-center justify-between space-y-5 sm:flex sm:space-y-0">
        <BaseButton
          :text="$t('joinLemonStore',{ name: 'FB' })"
          class="btn-primary-1 w-full sm:w-[49%]"
          :left-icon-url="buttonIcon.facebook"
          @click="goToFb"
        />
        <BaseButton
          :text="$t('joinLemonStore',{ name: 'LINE' })"
          class="btn-primary-1 w-full sm:w-[49%]"
          :left-icon-url="buttonIcon.line"
          @click="introHandler"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import { useSocialLink } from '@/composables/useSocialLink.js'

const { buttonIcon } = useButtonIcon()
const { socialLink } = useSocialLink()

const emit = defineEmits(['join'])

const goToFb = () => {
  const obj = socialLink.value.find(item => item.title === 'fb')
  window.open(obj.link)
}

const introHandler = () => {
  emit('join')
}

defineOptions({
  name: 'JoinOurBlock'
})
</script>
