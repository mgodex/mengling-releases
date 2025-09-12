<template>
  <div class="pc-carousel-container">
    <div class="swiper-wrapper">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="30"
        :loop="true"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
        }"
        :pagination="false"
        :navigation="false"
        class="pc-swiper"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <swiper-slide v-for="(image, index) in images" :key="index">
          <div class="pc-slide-content">
            <img :src="image.src" :alt="image.alt" class="pc-carousel-image" />
            <div class="pc-image-caption">{{ image.alt }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    
    <!-- 自定义分页器 -->
    <div class="pc-custom-pagination">
      <span 
        v-for="(image, index) in images" 
        :key="index"
        class="pc-pagination-bullet"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

// 导入Swiper样式
import 'swiper/css'

// PC端轮播图片数据
const images = ref([
  {
    src: '/screenshots/pc/mc_server.png',
    alt: 'MC我的世界服务端管理'
  },
  {
    src: '/screenshots/pc/video_play.png',
    alt: '多功能视频播放器'
  },
  {
    src: '/screenshots/pc/tcp_or_udp.png',
    alt: 'TCP或UDP端口测试'
  },
  {
    src: '/screenshots/pc/mqtt_test.png',
    alt: 'mqtt测试'
  },
  {
    src: '/screenshots/pc/file_nginx.png',
    alt: '文件服务器'
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
.pc-carousel-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.pc-swiper-wrapper {
  margin-bottom: 30px;
}

.pc-swiper {
  height: 600px;
  padding: 20px 0;
}

.pc-slide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.pc-carousel-image {
  width: 100%;
  height: 500px;
  object-fit: contain;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.pc-image-caption {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  text-align: center;
  font-weight: 600;
  line-height: 1.5;
}

/* 自定义分页器样式 */
.pc-custom-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 30px;
}

.pc-pagination-bullet {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.pc-pagination-bullet:hover {
  background: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
}

.pc-pagination-bullet.active {
  background: #4CAF50;
  transform: scale(1.3);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .pc-carousel-container {
    max-width: 1000px;
  }
  
  .pc-swiper {
    height: 500px;
  }
  
  .pc-carousel-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .pc-carousel-container {
    max-width: 100%;
    padding: 15px;
  }
  
  .pc-swiper {
    height: 400px;
    padding: 15px 0;
  }
  
  .pc-carousel-image {
    height: 300px;
  }
  
  .pc-image-caption {
    font-size: 14px;
    margin-top: 15px;
  }
  
  .pc-custom-pagination {
    margin-top: 25px;
    gap: 10px;
  }
  
  .pc-pagination-bullet {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 480px) {
  .pc-swiper {
    height: 350px;
    padding: 10px 0;
  }
  
  .pc-carousel-image {
    height: 250px;
  }
  
  .pc-image-caption {
    font-size: 13px;
    margin-top: 12px;
  }
  
  .pc-custom-pagination {
    margin-top: 20px;
    gap: 8px;
  }
  
  .pc-pagination-bullet {
    width: 10px;
    height: 10px;
  }
}
</style>
