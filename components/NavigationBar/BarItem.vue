<template>
  <NuxtLink
    class="flex h-full w-[77px] flex-col items-center justify-center border-b-2"
    :class="[borderColorClass]"
    :to="bar.pageUrl"
    :target="linkTarget"
    :external="bar.external"
  >
    <img
      :src="bar.image"
      class="size-6"
      alt=""
    />
    <p
      class="mt-[2px] text-center text-xs"
      :class="{'text-secondary-1':isCurrentPage}"
    >
      {{ bar.title }}
    </p>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  bar: {
    type: Object,
    required: true
  }
})

const route = useRoute()

const linkTarget = computed(() => props.bar.external ? '_blank' : '_self')

const isCurrentPage = computed(() => props.bar.routeName.includes(route.meta.name))

const borderColorClass = computed(() => {
  return isCurrentPage.value ? 'border-b-secondary-1' : 'border-b-white'
})

defineOptions({
  name: 'BarItem'
})
</script>
