import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import registerRouter from './backend/router'
const express = require('express')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    base: env.NODE_ENV === 'production' ? '/music-next/' : '/',
    // 测试
    build: {
      sourcemap: env.NODE_ENV === 'production' ? false : true
    },
    plugins: [
      vue(),
      legacy({
        // 尝试兼容低版本浏览器（不包括ie11）
        targets: ['chrome 80'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'] //配置了对ie11也没用
      }),
      {
        name: 'configure-server',
        configureServer(server) {
          const app = express()
          // 注册自定义路由
          registerRouter(app)
          server.middlewares.use(app)
        }
      },
      {
        configureWebpack: (config) => {
          if (process.env.npm_config_report) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            config.plugins.push(new BundleAnalyzerPlugin())
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // server: {
    //   host: '192.168.0.106'
    // }
    server: {
      host: '0.0.0.0'
    }
  }
})

/* "deploy": "npm run build && pm2 start backend/prod.server.js --watch &" */