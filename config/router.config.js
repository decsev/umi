export default [
  {
    path: '/',
    component: '/_layout.js',
    routes: [
      {
        path: '/index',
        component: '/index',
      },
      {
        path: '/index/9',
        component: '/404',
      },
      {
        path: '/user',
        redirect: '/index'
      },
      {
        component: '404',
      }
    ]
  }
];