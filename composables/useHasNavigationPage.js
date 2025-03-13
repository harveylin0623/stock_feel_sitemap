export const useHasNavigationPage = () => {
  // 可以出現導覽列的頁面名稱
  const navigationPageList = ref(['home', 'myCoupon', 'redeemHistory', 'redeemHistoryDetail'])

  return { navigationPageList }
}
