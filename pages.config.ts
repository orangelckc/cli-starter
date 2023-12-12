import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    'navigationBarTitleText': 'uniapp',
    'navigationBarBackgroundColor': '@navBgColor',
    'navigationBarTextStyle': '@navTxtStyle',
    'backgroundColor': '@bgColor',
    'backgroundTextStyle': '@bgTxtStyle',
    'backgroundColorTop': '@bgColorTop',
    'backgroundColorBottom': '@bgColorBottom',
    'app-plus': {
      titleNView: false, // 移除 H5、APP 顶部导航
    },
  },
  tabBar: {
    color: '#999',
    selectedColor: '#19AD19',
    backgroundColor: '#FFF',
    list: [
      {
        pagePath: 'pages/Home/index',
        text: '首页',
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home-active.png',
      },
      {
        pagePath: 'pages/Book/index',
        text: '书籍',
        iconPath: 'static/tabbar/book.png',
        selectedIconPath: 'static/tabbar/book-active.png',
      },
      {
        pagePath: 'pages/User/index',
        text: '我的',
        iconPath: 'static/tabbar/user.png',
        selectedIconPath: 'static/tabbar/user-active.png',
      },
    ],
  },
  easycom: {
    autoscan: true,
    custom: {
      '^uv-(.*)': '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
    },
  },
  entryPagePath: 'pages/Home/index',
})
