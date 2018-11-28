import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
const path = require('path');


const plugins = [
  ['umi-plugin-react', {
    antd: true,
    dva: true,
    dynamicImport: false,
    title: 'umi',
    dll: false,
    routes: {
      exclude: [],
    },
    hardSource: false,
  }],
];

export default {
  plugins,
  targets: {
    ie: 11,
    IOS: 8,
    Android: 4
  },
  // 路由配置
  routes: pageRoutes,
  disableRedirectHoist: true,
  history: 'hash',
  externals: {
    // lodash: {
    //   commonjs: "lodash",
    //   amd: "lodash",
    //   root: "_" // indicates global variable
    // }
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  manifest: {
    basePath: '/',
  },
  disableCSSModules: true,
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  sass: {},
  proxy: {
    "/api": {
      target: "http://jsonplaceholder.typicode.com/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  },
  alias: {
    components: path.resolve(__dirname, '../src/components'),
    utils: path.resolve(__dirname, '../src/utils'),
    config: path.resolve(__dirname, '../src/utils/config'),
    services: path.resolve(__dirname, '../src/services'),
    models: path.resolve(__dirname, '../src/models'),
    assets: path.resolve(__dirname, '../src/assets'),
  },
  // browserslist: [
  //   "> 1%",
  //   "last 2 versions"
  // ],
  extraPostCSSPlugins: [
    require('postcss-px-to-viewport')({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750 
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置 
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除） 
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw 
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名 
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值 
      mediaQuery: false // 允许在媒体查询中转换`px`
    }),
    require('postcss-write-svg')({ /* options */ }),
    require('postcss-aspect-ratio-mini')({})
  ]
  // chainWebpack: webpackPlugin,
}
