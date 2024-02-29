import { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'
import fs from 'fs'
import glob from 'glob'
import { deleteFile } from './build/plugin'
import legacy from '@vitejs/plugin-legacy'
import checker from 'vite-plugin-checker'

const assetsPath = (path: string) => {
  return join('static', path)
}

export const getEntryPath = () => {
  const pageEntry: any = {}
  glob.sync('./src/pages/**/main.ts').forEach((entry: string) => {
    const pathArr: string[] = entry.split('/')
    const name: string = pathArr[pathArr.length - 2]
    const ctx = process.cwd()
    pageEntry[name] = join(ctx, `/src/pages/${name}/index.html`)
    fs.copyFileSync(ctx + '/index.html', pageEntry[name])
  })
  console.log(pageEntry)
  return pageEntry
}

// 指定 某个路径下的 公共模块 打包成 一个 chunk
const chunkPath = ['src/utils']

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'

  return {
    root: './src/pages',
    base: '/',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src')
        }
      ]
    },
    plugins: [
      vue(),
      // 会根据 浏览器环境 自动 引入垫片 兼容
      legacy({
        targets: [
          'defaults',
          'ie >= 11',
          'chrome 52',
          'iOS >= 9',
          'Android >= 5'
        ], //需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
        polyfills: [
          'es.symbol',
          'es.array.filter',
          'es.promise',
          'es.promise.finally',
          'es/map',
          'es/set',
          'es.array.for-each',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.keys',
          'es.object.to-string',
          'web.dom-collections.for-each',
          'esnext.global-this',
          'esnext.string.match-all'
        ]
      }),
      // 开启ts 检测不通过 显示到浏览器
      !isBuild &&
        checker({
          vueTsc: true
        }),
      deleteFile()
    ],
    build: {
      outDir: resolve(process.cwd(), 'dist'), // 指定输出路径（相对于 项目根目录)
      sourcemap: false, // 构建后是否生成 source map 文件
      chunkSizeWarningLimit: 1500, // 规定触发警告的 chunk(文件块) 大小
      assetsDir: 'static',
      reportCompressedSize: false, //禁用 gzip 压缩大小报告
      minify: 'esbuild',
      rollupOptions: {
        // 自定义底层的 Rollup 打包配置
        input: getEntryPath(),
        output: {
          entryFileNames: (chunkInfo) => {
            return `${chunkInfo.name}/js/[name]-[hash].js`
          },
          chunkFileNames: assetsPath('chunk/[name]-[hash].js'),
          assetFileNames: assetsPath('assets/[ext]/[name]-[hash].[ext]'),
          compact: true,
          // 多入口 打包 默认情况 在多个 入口 使用的公共模块(非第三方模块) 次数超过1 就会生成一个 chunk
          // 优化 chunk 过多 碎片 化 浪费请求资源
          /**
           * 1. 第三方模块 vue 系列 生成一个 chunk 其它 单独生成对应的 chunk
           * 2. 在代码中的公共模块 src 下的 可以 在 chunkPath 去设置 合成 chunk 路径
           *    src/utils 代表 这个文件夹 下 使用的 会在一个 chunk 下 命名 src-utils-[hash].js
           */
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              const temp = id.split('node_modules')[1]
              if (temp.includes('vue')) {
                // vue 系列 单独 抽离 一个 chunk
                return 'vue-vendor'
              }
              // 根据项目实际情况  去做选择
              // 默认 第三方 库 es module 规范 支持 tree-shaking 只会 将部分代码注入 业务代码中 尽量使用es 规范的库

              // 其它第三方库 生成 chunk
              return 'other-vendor'

              // 手动指定第三方库 是否单独生成 chunk

              // 其余 第三方共用模块 再 单独生成 chunk
              // return id
              //   .toString()
              //   .split("node_modules/")[1]
              //   .split("/")[0]
              //   .toString(); // 拆分多个vendors
            } else {
              const len = chunkPath.length
              for (let i = 0; i < len; ++i) {
                if (id.includes(chunkPath[i])) {
                  return chunkPath[i].replace(/\//, '-')
                }
              }
            }
          }
        }
      },
      emptyOutDir: true
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "${resolve(
            __dirname,
            'src/styles/variable.less'
          )}";`,
          javascriptEnabled: true
        }
      }
    }
  }
}
