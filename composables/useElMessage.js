export const useElMessage = () => {
  const messageType = ref({
    success: 'success',
    warning: 'warning',
    error: 'error'
  })

  const showElMessage = (options = {}) => {
    ElMessage({
      type: messageType.value.success,
      message: '',
      center: true,
      grouping: true,
      duration: 5000,
      ...options
    })
  }

  return {
    messageType,
    showElMessage
  }
}
