import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/playground',
      name: 'playground',
      component: () => import('../views/PlayGround.vue'),
    },
    {
      path: '/userhome',
      name: 'userhome',
      component: () => import('../views/UserHome.vue'),
      children: [
        {
          path: 'main',
          components: {
            main: () => import('../components/UserHome/MainPage.vue'),
            right: () => import('../components/UserHome/SideContent.vue'),
          }
        },
        {
          path: 'show',
          components: {
            main: () => import('../components/UserHome/DisplayCounter.vue'),
          }
        },
        {
          path: 'contribute',
          components: {
            main: () => import('../components/UserHome/ContributePage.vue'),
          },
          children: [
            {
              path: 'video',
              component: () => import('../components/UserHome/VideoList.vue'),
            },
            {
              path: 'article',
              component: () => import('../components/UserHome/ArticleList.vue'),
            }
          ]
        },
        {
          path: 'setting',
          components: {
            main: () => import('../components/UserHome/SettingPage.vue')
          }
          // TODO: 在一个页面中同时使用多个路由组件需要为components，注意s
        },
        {
          path: 'user_list',
          components: {
            main: () => import('../components/UserHome/UserList.vue'),
            right: () => import('../components/UserHome/SideContent.vue')
          }
        }
      ]
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component : () => import('../views/ChatRoom.vue'),
    },
    { 
      path: '/userhome', 
      redirect: '/userhome/main',
    },
    {
      path: '/',
      redirect: '/playground',
    }
  ]
})
export default router