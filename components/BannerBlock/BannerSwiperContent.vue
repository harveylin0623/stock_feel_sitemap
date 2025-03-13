<template>
  <div @click="cmsClick">
    <img
      :src="bannerImage"
      class="h-auto w-full"
      :alt="content.title"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const bannerImage = computed(() => {
  const { url } = props.content.feature_image
  return url !== null ? url : 'https://fakeimg.pl/1440x500?text=+'
})

const cmsClick = () => {
  const links = props.content.link_block.links
  if (links.length <= 0) { return }
  const { hyperlink_url } = links[0]
  window.open(hyperlink_url)
}

defineOptions({
  name: 'BannerSwiperContent'
})
</script>
