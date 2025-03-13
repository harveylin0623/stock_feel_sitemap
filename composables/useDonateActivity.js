import _ from 'lodash'
export const useDonateActivity = () => {
  const isDonateActivity = ref(false)
  const donateMetaKey = ref('Type')
  const donateMetaValue = ref('Donate')
  const donateMetaBrandCode = ref('brand_code')
  const donateMetaStoreCode = ref('store_code')

  const checkIsDonateActivity = (couponList, useWriteOff = false) => {
    const result = {
      isVerify: false, // 是否可以進行核銷
      isDonate: false, // 事否為捐贈活動
      brandCode: '',
      storeCode: ''
    }
    if (couponList.length === 0) { return result }
    const externalMeta = couponList[0].external_meta
    if (_.isUndefined(externalMeta)) { return result }
    if (externalMeta.length === 0) { return result }
    const donateMeta = externalMeta.find((obj) => {
      return obj.key === donateMetaKey.value && obj.value === donateMetaValue.value
    })
    const isDonate = !(_.isUndefined(donateMeta))
    if (useWriteOff) { // 如果要使用核銷功能進行此判斷
      const brandCodeMeta = externalMeta.find(item => item.key === donateMetaBrandCode.value)
      const storeCodeMeta = externalMeta.find(item => item.key === donateMetaStoreCode.value)
      const isVerify = isDonate && !(_.isUndefined(brandCodeMeta)) && !(_.isUndefined(storeCodeMeta))
      result.isVerify = isVerify
      result.isDonate = isDonate
      result.brandCode = isVerify ? brandCodeMeta.value : ''
      result.storeCode = isVerify ? storeCodeMeta.value : ''
      return result
    }
    result.isDonate = isDonate
    return result
  }

  return { isDonateActivity, donateMetaKey, donateMetaValue, donateMetaBrandCode, donateMetaStoreCode, checkIsDonateActivity }
}
