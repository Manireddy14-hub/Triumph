import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
    {
      path: '/models',
      name: 'models',
      component: () => import('../pages/ModelsPage.vue'),
    },
    {
      path: '/models/:slug',
      name: 'model',
      component: () => import('../pages/ModelDetailPage.vue'),
      props: true,
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('../pages/ComparePage.vue'),
    },
    {
      path: '/book-test-ride',
      name: 'bookTestRide',
      component: () => import('../pages/BookTestRidePage.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../pages/ContactPage.vue'),
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import('../pages/admin/AdminLoginPage.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/admin/AdminDashboardPage.vue'),
    },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import('../pages/NotFoundPage.vue') },
  ],
})

