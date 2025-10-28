// 导入默认主题
import DefaultTheme from 'vitepress/theme'

// 导入自定义组件
import SwiperCarousel from './SwiperCarousel.vue'
import PCCarousel from './PCCarousel.vue'
import DownloadSection from './DownloadSection.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('SwiperCarousel', SwiperCarousel)
    app.component('PCCarousel', PCCarousel)
    app.component('DownloadSection', DownloadSection)
  }
}
