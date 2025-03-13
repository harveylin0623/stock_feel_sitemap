<template>
  <div
    id="background-marquee"
    class="mb-8 h-[80px] bg-news-ticker bg-[length:auto_100%] bg-repeat-x"
  >
  </div>
</template>

<script setup>
defineOptions({
  name: 'ImageMarquee'
})
</script>

<style lang="scss" scoped>
#background-marquee {
  background-position-x: 0px;
  animation-name: run;
  animation-duration: 100s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes run {
  0% {
    background-position-x: 0px;
  }
  100% {
    background-position-x: -7896px;
  }
}
</style>
