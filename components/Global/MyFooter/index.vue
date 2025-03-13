<template>
  <footer class="rounded-t-[40px] bg-footer py-10 sm:py-[60px]">
    <div class="container">
      <div class=" items-start device1:flex device1:flex-row-reverse">
        <div class="mb-5 pl-4 device1:mb-0 device1:pl-0">
          <img
            src="@/assets/image/logo2.png"
            class="h-auto w-[130px] device1:ml-auto device1:w-[182px]"
            alt=""
          />
          <div class="mt-[18px] flex items-center device1:mt-6">
            <p class="mr-4 text-gray-5">Follow Us：</p>
            <FooterSocialBlock />
          </div>
        </div>
        <PcLinkBlock />
        <AccordionBlock />
      </div>
      <CompanyInfo />
    </div>
  </footer>
</template>

<script setup>
import FooterSocialBlock from '@/components/Global/MyFooter/SocialBlock.vue'
import PcLinkBlock from '@/components/Global/MyFooter/PcLinkBlock.vue'
import AccordionBlock from '@/components/Global/MyFooter/AccordionBlock.vue'
import CompanyInfo from '@/components/Global/MyFooter/CompanyInfo.vue'

defineOptions({
  name: 'MyFooter'
})
</script>
