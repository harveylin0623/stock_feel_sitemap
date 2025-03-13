export const useTotalPoint = () => {
  const getTotalPoint = (pointSummary) => {
    const { current_point } = pointSummary
    const defaultValue = '0'
    let totalPoint = defaultValue
    if (current_point === undefined) { return totalPoint }
    if (current_point.length > 0) {
      const lemonPoint = current_point.find(item => item.point_code === process.env.MMRM_POINT_CODE)
      totalPoint = lemonPoint !== undefined ? lemonPoint.amount : defaultValue
    }
    return totalPoint
  }

  return { getTotalPoint }
}
