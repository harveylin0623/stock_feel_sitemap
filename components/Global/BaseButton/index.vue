<template>
  <div
    class="btn"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <img
      :src="displayLeftIconUrl"
      class="size-6"
      :class="{'opacity-0':!showLeftIcon}"
      alt=""
    />
    <p class="whitespace-nowrap font-normal">{{ text }}</p>
    <img
      :src="displayRightIconUrl"
      class="size-6"
      :class="{'opacity-0':!showRightIcon}"
      alt=""
    />
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  leftIconUrl: {
    type: String,
    default: ''
  },
  rightIconUrl: {
    type: String,
    default: ''
  },
  hoverLeftIconUrl: {
    type: String,
    default: ''
  },
  hoverRightIconUrl: {
    type: String,
    default: ''
  }
})

const isMouseEnter = ref(false)

const showLeftIcon = computed(() => props.leftIconUrl !== '')

const showRightIcon = computed(() => props.rightIconUrl !== '')

const displayLeftIconUrl = computed(() => {
  let text = ''
  if (isMouseEnter.value && showLeftIcon.value && props.hoverLeftIconUrl !== '') {
    text = props.hoverLeftIconUrl
  } else {
    text = props.leftIconUrl
  }
  return text
})

const displayRightIconUrl = computed(() => {
  let text = ''
  if (isMouseEnter.value && showRightIcon.value && props.hoverRightIconUrl !== '') {
    text = props.hoverRightIconUrl
  } else {
    text = props.rightIconUrl
  }
  return text
})

const mouseEnter = () => {
  if (props.hoverLeftIconUrl !== '' || props.hoverRightIconUrl !== '') {
    isMouseEnter.value = true
  }
}

const mouseLeave = () => {
  isMouseEnter.value = false
}

defineOptions({
  name: 'BaseButton'
})
</script>
