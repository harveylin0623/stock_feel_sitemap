import user from '@/assets/image/user.png'
import shopCart from '@/assets/image/shopping_cart.png'
import share from '@/assets/image/share.png'
import arrowBtn from '@/assets/image/arrow_btn.png'
import like from '@/assets/image/like.png'
import like2 from '@/assets/image/like-2.png'
import facebook from '@/assets/image/facebook.png'
import line from '@/assets/image/line.png'
import arrowLeft from '@/assets/image/arrow_left.png'
import shareHover from '@/assets/image/share-hover.png'
import arrowLeftHover from '@/assets/image/arrow_left_white.png'

export const useButtonIcon = () => {
  const buttonIcon = ref({
    user,
    shopCart,
    share,
    arrowBtn,
    like,
    like2,
    facebook,
    line,
    arrowLeft,
    shareHover,
    arrowLeftHover
  })

  return { buttonIcon }
}
