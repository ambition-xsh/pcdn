import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // publicDir: '/pcdn',
  base:'pcdn/iot/android',
  plugins: [react()],
  css: {
    // css模块化配置项
    modules: {
      // ....
    },
    // 预处理器配置项
    preprocessorOptions: {
      // scss: {
      //   // 一些配置项
      // },
      less: {
        // 一些配置项
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www-test4.titannet.io',//测试服
        // target:'https://test4-network.titannet.io/api/network',//正式服
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
