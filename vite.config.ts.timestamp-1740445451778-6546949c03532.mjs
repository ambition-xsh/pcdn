// vite.config.ts
import { defineConfig } from "file:///C:/Users/layma/Desktop/titan-pcdn/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/layma/Desktop/titan-pcdn/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  // publicDir: '/pcdn',
  base: "pcdn/iot/android",
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
      "/api": {
        // target: 'https://www-test4.titannet.io',//测试服
        target: "https://test4-network.titannet.io/api/network",
        //正式服
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsYXltYVxcXFxEZXNrdG9wXFxcXHRpdGFuLXBjZG5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxheW1hXFxcXERlc2t0b3BcXFxcdGl0YW4tcGNkblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGF5bWEvRGVza3RvcC90aXRhbi1wY2RuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAvLyBwdWJsaWNEaXI6ICcvcGNkbicsXHJcbiAgYmFzZToncGNkbi9pb3QvYW5kcm9pZCcsXHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIGNzczoge1xyXG4gICAgLy8gY3NzXHU2QTIxXHU1NzU3XHU1MzE2XHU5MTREXHU3RjZFXHU5ODc5XHJcbiAgICBtb2R1bGVzOiB7XHJcbiAgICAgIC8vIC4uLi5cclxuICAgIH0sXHJcbiAgICAvLyBcdTk4ODRcdTU5MDRcdTc0MDZcdTU2NjhcdTkxNERcdTdGNkVcdTk4NzlcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgLy8gc2Nzczoge1xyXG4gICAgICAvLyAgIC8vIFx1NEUwMFx1NEU5Qlx1OTE0RFx1N0Y2RVx1OTg3OVxyXG4gICAgICAvLyB9LFxyXG4gICAgICBsZXNzOiB7XHJcbiAgICAgICAgLy8gXHU0RTAwXHU0RTlCXHU5MTREXHU3RjZFXHU5ODc5XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cHM6Ly93d3ctdGVzdDQudGl0YW5uZXQuaW8nLC8vXHU2RDRCXHU4QkQ1XHU2NzBEXHJcbiAgICAgICAgdGFyZ2V0OidodHRwczovL3Rlc3Q0LW5ldHdvcmsudGl0YW5uZXQuaW8vYXBpL25ldHdvcmsnLC8vXHU2QjYzXHU1RjBGXHU2NzBEXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIC8vIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUixTQUFTLG9CQUFvQjtBQUM1VCxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixNQUFLO0FBQUEsRUFDTCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsS0FBSztBQUFBO0FBQUEsSUFFSCxTQUFTO0FBQUE7QUFBQSxJQUVUO0FBQUE7QUFBQSxJQUVBLHFCQUFxQjtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSW5CLE1BQU07QUFBQTtBQUFBLE1BRU47QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBO0FBQUEsUUFFTixRQUFPO0FBQUE7QUFBQSxRQUNQLGNBQWM7QUFBQTtBQUFBLE1BRWhCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
