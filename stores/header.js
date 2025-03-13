import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', () => {
  const menuList = ref([])

  const setMenuList = (list) => {
    menuList.value = list
  }

  const changeMenuOpenStatus = (payload) => {
    const targetMenu = menuList.value.find(menu => menu.id === payload.id)
    targetMenu.isOpen = !payload.isOpen
    menuList.value.forEach((menu) => {
      if (menu.id !== payload.id) { menu.isOpen = false }
    })
  }

  return { menuList, setMenuList, changeMenuOpenStatus }
})
