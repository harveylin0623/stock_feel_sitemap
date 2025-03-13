<template>
  <NuxtLink
    :to="menu.url"
    class="flex items-center"
    :external="menu.external"
    :target="linkTargetValue"
  >
    <img
      :src="imageUrl"
      class="h-auto w-[52px]"
      alt=""
    />
    <p
      class="ml-2"
      :class="{'text-secondary-1':isSameRouteName, 'font-medium': isSameRouteName}"
    >
      {{ menu.title }}
    </p>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const linkTargetValue = computed(() => props.menu.external ? '_blank' : '_self')
const isSameRouteName = computed(() => props.menu.routeName.includes(route.name))
const imageUrl = computed(() => isSameRouteName.value ? props.menu.activeImage : props.menu.image)

defineOptions({
  name: 'MenuItem'
})
</script>
