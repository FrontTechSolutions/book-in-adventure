import HomeView from '../views/HomeView.vue'


export default [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  // {
  //   path: '/pro-dashboard',
  //   name: 'pro-dashboard',
  //   component: () => import('../views/ProDashboardView.vue')
  // },
  // {
  //   path: '/pro-activities',
  //   name: 'pro-activities',
  //   component: () => import('../views/ProActivitiesView.vue')
  // },
  // {
  //   path:'/pro-profile',
  //   name: 'pro-profile',
  //   component: () => import('../views/ProProfileView.vue')
  // },  
  // {
  //   path: '/pro-calendar',
  //   name: 'pro-calendar',
  //   component: () => import('../views/ProCalendarView.vue')
  // },
  // {
  //   path:'/client-dashboard',
  //   name: 'client-dashboard',
  //   component: () => import('../views/ClientDashboardView.vue')
  // },
  {
    path:'/client-profile',
    name: 'client-profile',
    component: () => import('../views/ProfileView.vue')
  },
  // {
  //   path:'/client-bookings',
  //   name: 'client-bookings',
  //   component: () => import('../views/ClientBookingsView.vue')
  // }
  // Ajoute ici d'autres routes si besoin
]
