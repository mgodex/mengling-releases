<template>
  <div class="download-section">
    <div class="download-grid">
      <div class="download-item" v-for="platform in platforms" :key="platform.name">
        <div class="platform-header">
          <img :src="platform.icon" :alt="platform.name" class="platform-icon" />
          <span class="platform-name">{{ platform.name }}</span>
        </div>
        <div class="download-actions">
          <!-- 自定义下载方式 -->
          <div v-if="platform.downloadUrl && Array.isArray(platform.downloadUrl) && platform.downloadUrl.length > 0" class="custom-downloads">
            <div v-for="download in platform.downloadUrl" :key="download.name" class="download-item-custom">
              <a 
                v-if="download.url && download.url !== '#'"
                :href="download.url" 
                class="download-btn custom"
                :style="{ '--btn-color': download.color || '#007bff' }"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  :src="getDownloadIcon(download.name)" 
                  :alt="getDownloadAlt(download.name)" 
                  class="btn-icon" 
                />
                <span class="btn-text">{{ download.name }}</span>
              </a>
            </div>
          </div>
          
          <!-- 无可用下载 -->
          <div v-if="!hasValidDownload(platform)" class="coming-soon">
            <span class="coming-soon-text">暂无下载链接，请等待更新</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 检查是否有有效下载链接
const hasValidDownload = (platform) => {
  // 检查自定义下载方式
  if (platform.downloadUrl && Array.isArray(platform.downloadUrl) && platform.downloadUrl.length > 0) {
    return platform.downloadUrl.some(download => download.url && download.url !== '#')
  }
  
  return false
}

// 获取下载图标
const getDownloadIcon = (name) => {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('github')) {
    return '/images/github-download.png'
  } else if (lowerName.includes('pan')) {
    return '/images/pan-download.png'
  } else {
    return '/images/download.png'
  }
}

// 获取下载图标alt文本
const getDownloadAlt = (name) => {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('github')) {
    return 'GitHub下载'
  } else if (lowerName.includes('pan')) {
    return '网盘下载'
  } else {
    return '下载'
  }
}

// 平台下载信息
const platforms = ref([
  {
    name: 'iOS',
    icon: '/images/ios.png',
    description: 'iPhone 和 iPad 版本',
    downloadUrl: []
  },
  {
    name: 'Android',
    icon: '/images/Android.png',
    description: 'Android 手机和平板',
    downloadUrl: []
  },
  {
    name: 'Windows',
    icon: '/images/windows.png',
    description: 'Windows 10/11 桌面版',
    downloadUrl: [
    { name: 'github', url: 'https://github.com/mengDot/mengling-releases/releases/download/v1.0.0/mengling-1.0.0-Windows-x64.exe', color: '#4CAF50' },
    ]
  },
  {
    name: 'macOS',
    icon: '/images/Mac.png',
    description: 'Mac 桌面版',
    downloadUrl: [
        { name: 'github-arm', url: 'https://github.com/mengDot/mengling-releases/releases/download/v1.0.0/mengling-1.0.0-macOS-arm64.dmg', color: '#4CAF50' },
        { name: 'github-intel', url: 'https://github.com/mengDot/mengling-releases/releases/download/v1.0.0/mengling-1.0.0-macOS-x64.dmg', color: '#4CAF50' },
    ]
  },
  {
    name: 'Linux',
    icon: '/images/linux.png',
    description: 'Linux 桌面版',
    downloadUrl: [
        { name: 'github-deb', url: 'https://github.com/mengDot/mengling-releases/releases/download/v1.0.0/mengling-1.0.0-Linux-x64.deb', color: '#4CAF50' },
        { name: 'github-AppImage', url: 'https://github.com/mengDot/mengling-releases/releases/download/v1.0.0/mengling-1.0.0-Linux-x64.AppImage', color: '#4CAF50' },
    ]
  }
])
</script>

<style scoped>
.download-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.download-item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-align: center;
}

.download-item:hover {
  background: #f8f9fa;
}

.platform-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}

.platform-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.platform-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.download-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.custom-downloads {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.download-item-custom {
  width: 100%;
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  width: 100%;
}

.download-btn.primary {
  background: #4CAF50;
  color: white;
}

.download-btn.primary:hover {
  background: #45a049;
}

.download-btn.secondary {
  background: white;
  color: #4CAF50;
  border-color: #4CAF50;
}

.download-btn.secondary:hover {
  background: #4CAF50;
  color: white;
}

.download-btn.fallback {
  background: #fff3cd;
  color: #856404;
  border-color: #ffeaa7;
}

.download-btn.fallback:hover {
  background: #ffeaa7;
  color: #6c5ce7;
}

.download-btn.custom {
  background: var(--btn-color, #007bff);
  color: white;
  border-color: var(--btn-color, #007bff);
}

.download-btn.custom:hover {
  background: var(--btn-color, #0056b3);
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-icon {
  width: 25px;
  height: 25px;
}

.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #dee2e6;
  width: 100%;
}

.coming-soon-text {
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
}


/* 响应式设计 */
@media (max-width: 900px) {
  .download-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .download-section {
    padding: 15px;
  }
  
  .download-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    max-width: 500px;
  }
  
  .download-item {
    padding: 15px;
  }
  
  .platform-name {
    font-size: 16px;
  }
  
  .platform-icon {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .download-section {
    padding: 10px;
  }
  
  .download-item {
    padding: 15px;
  }
  
  .platform-header {
    margin-bottom: 12px;
  }
  
  .platform-name {
    font-size: 16px;
  }
  
  .platform-icon {
    width: 36px;
    height: 36px;
  }
  
  .download-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
}
</style>
