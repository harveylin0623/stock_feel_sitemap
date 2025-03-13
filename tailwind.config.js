/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.js',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    variables: {
      DEFAULT: {
        colors: {
          'primary-1': '#FFDD44',
          'secondary-1': '#009E7A',
          'gray-7': '#E0E0E0'
        },
        header: {
          height: '145px'
        },
        nav: {
          height: '60px'
        },
        fixedCart: {
          height: '81px'
        }
      }
    },
    extend: {
      screens: {
        device2: '576px',
        device1: '768px',
        sm: '932px',
        md: '982px',
        lg: '1032px',
        xl: '1132px',
        '2xl': '1232px'
      },
      colors: {
        'primary-1': 'var(--colors-primary-1)',
        'primary-2': '#1599CE',
        'secondary-1': 'var(--colors-secondary-1)',
        'secondary-2': '#39C8C3',
        'gray-2': '#424242',
        'gray-3': '#616161',
        'gray-4': '#757575',
        'gray-5': '#9E9E9E',
        'gray-6': '#BDBDBD',
        'gray-7': 'var(--colors-gray-7)',
        'gray-8': '#F5F5F5',
        'sub-menu': '#009E7A1A',
        error: '#F66666',
        mask: '#000000CC',
        footer: '#071122',
        used: '#FF764C'
      },
      backgroundImage: {
        'pc-howto': 'url("@/assets/image/bg_yellow.png")',
        'mobile-howto': 'url("@/assets/image/bg_yellow_mb.png")',
        'flow-us': 'url("@/assets/image/flow_us.png")',
        'news-ticker': 'url("@/assets/image/news_ticker.png")',
        rectangle: 'url("@/assets/image/rectangle.png")'
      },
      boxShadow: {
        dropdown: '0px 0px 10px 0px #0000001A',
        howto: '0px 4px 20px 0px #AEAEC033'
      }
    }
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')
  ]
}
