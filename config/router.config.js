export default [
  {
    path: '/',
    component: '/_layout.js',
    routes: [
      {
        path: '/home/index',
        component: '/Home/Index/index',
        title: '前台首页'
      },
      {
        path: '/index',
        component: '/index',
        title: '首页'
      },
      {
        path: '/index/9',
        component: '/404',
        title: '首页内页'
      },
      {
        path: '/user',
        redirect: '/index',
        title: '用户中心'
      },
      {
        component: '404',
      }
    ]
  }
];