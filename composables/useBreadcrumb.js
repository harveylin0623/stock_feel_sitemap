export const useBreadcrumb = (payload) => {
  const breadcrumbList = ref(payload)

  return { breadcrumbList }
}
