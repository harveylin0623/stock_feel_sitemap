<template>
  <a
    class="flex w-full items-center"
    :href="dropdown.url"
    target="_blank"
  >
    <img
      :src="dropdown.dropdownImage"
      class="h-auto w-[30px]"
      alt=""
    />
    <p class="ml-3 text-base">{{ dropdown.title }}</p>
  </a>
</template>

<script setup>
defineProps({
  dropdown: {
    type: Object,
    required: true
  }
})

defineOptions({
  name: 'ProfileDropdownItem'
})
</script>
