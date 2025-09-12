<template>
  <div class="carousel-container">
    <div class="swiper-wrapper">
      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="20"
        :loop="true"
        :centered-slides="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :pagination="false"
        :navigation="false"
        class="my-swiper"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
        :breakpoints="{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: false
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
            centeredSlides: false
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
            centeredSlides: true
          }
        }"
      >
        <swiper-slide v-for="(image, index) in images" :key="index">
          <div class="slide-content">
            <img :src="image.src" :alt="image.alt" class="carousel-image" />
            <div class="image-caption">{{ image.alt }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    
    <!-- 自定义分页器 -->
    <div class="custom-pagination">
      <span 
        v-for="(image, index) in images" 
        :key="index"
        class="pagination-bullet"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

// 导入Swiper样式
import 'swiper/css'

// 轮播图片数据
const images = ref([
  {
    src: '/screenshots/epic_free_games.png',
    alt: 'EPIC免费游戏'
  },
  {
    src: '/screenshots/totp_display.png',
    alt: '两步验证'
  },
  {
    src: '/screenshots/rss_info.png',
    alt: 'rss订阅'
  },
  {
    src: '/screenshots/image_color.png',
    alt: '图片取色'
  },
  {
    src: '/screenshots/zhinanzhen_info.png',
    alt: '指南针'
  },
  {
    src: '/screenshots/huahua_info.png',
    alt: '绘画板'
  },
  {
    src: '/screenshots/zhuangbei_info.png',
    alt: '装备记录'
  }
])

// 当前幻灯片索引
const currentSlide = ref(0)
let swiperInstance = null

// 跳转到指定幻灯片
const goToSlide = (index) => {
  if (swiperInstance) {
    swiperInstance.slideTo(index)
  }
}

// Swiper实例回调
const onSwiper = (swiper) => {
  swiperInstance = swiper
}

// 幻灯片变化回调
const onSlideChange = (swiper) => {
  currentSlide.value = swiper.realIndex
}

// Swiper模块
const modules = [Autoplay]
</script>

<style scoped>
.carousel-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.swiper-wrapper {
  margin-bottom: 30px;
}

.my-swiper {
  height: 550px;
  padding: 20px 0;
}

.slide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 400px;
  object-fit: contain;
  border-radius: 12px;
  transition: all 0.3s ease;
  transform: scale(0.9);
}

.image-caption {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  font-weight: 500;
  line-height: 1.4;
}

/* 中间图片稍微大一点 */
:deep(.swiper-slide-active .carousel-image) {
  transform: scale(1);
  height: 450px;
}

/* 确保中间图片（第2张）是大的 */
:deep(.swiper-slide:nth-child(2) .carousel-image) {
  transform: scale(1);
  height: 450px;
}

:deep(.swiper-slide:nth-child(1) .carousel-image),
:deep(.swiper-slide:nth-child(3) .carousel-image) {
  transform: scale(0.9);
  height: 400px;
}

.carousel-image:hover {
  transform: scale(0.95);
}

:deep(.swiper-slide-active .carousel-image:hover),
:deep(.swiper-slide:nth-child(2) .carousel-image:hover) {
  transform: scale(1.05);
}

/* 自定义分页器样式 */
.custom-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
}

.pagination-bullet {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-bullet:hover {
  background: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
}

.pagination-bullet.active {
  background: #4CAF50;
  transform: scale(1.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .my-swiper {
    height: 450px;
    padding: 15px 0;
  }
  
  .swiper-wrapper {
    margin-bottom: 25px;
  }
  
  .carousel-image {
    height: 350px;
  }
  
  :deep(.swiper-slide-active .carousel-image) {
    height: 380px;
  }
  
  :deep(.swiper-slide:nth-child(2) .carousel-image) {
    height: 380px;
  }
  
  .image-caption {
    font-size: 13px;
    margin-top: 12px;
  }
  
  .carousel-container {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .my-swiper {
    height: 400px;
    padding: 10px 0;
  }
  
  .swiper-wrapper {
    margin-bottom: 20px;
  }
  
  .carousel-image {
    height: 300px;
    transform: scale(1);
  }
  
  :deep(.swiper-slide-active .carousel-image) {
    height: 320px;
    transform: scale(1);
  }
  
  :deep(.swiper-slide:nth-child(2) .carousel-image) {
    height: 320px;
    transform: scale(1);
  }
  
  .image-caption {
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
