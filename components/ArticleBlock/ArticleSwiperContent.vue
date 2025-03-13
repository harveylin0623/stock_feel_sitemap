<template>
  <div @click="redirectHandler">
    <div class="relative overflow-hidden rounded-b rounded-tl rounded-tr-[40px] pt-[100%]">
      <img
        :src="article.imgUrl"
        class="absolute left-0 top-0 z-[1] size-full"
        :alt="article.title"
      />
    </div>
    <div
      v-if="hasLabel"
      class="absolute z-[2] flex w-full -translate-y-1/2 items-center justify-end space-x-1 pr-2"
    >
      <div
        v-for="(label,index) in article.labels"
        :key="index"
        class="relative border border-b-0 border-black bg-white px-2 py-1 text-xs after:absolute after:left-1/2  after:top-full after:h-px after:w-[85%] after:-translate-x-1/2 after:bg-black"
      >
        # {{ label }}
      </div>
    </div>
    <div class="mb-2 line-clamp-2 pt-5 font-medium">{{ article.title }}</div>
    <p class="text-sm text-gray-5 device1:text-base">{{ article.date }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const hasLabel = computed(() => props.article.labels.length > 0)

const redirectHandler = () => {
  window.open(props.article.hyperlink)
}

defineOptions({
  name: 'ArticleSwiperContent'
})
</script>
