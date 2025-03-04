import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import AppPage from '@/pages/AppPage.vue'
import Cam from '@/pages/CameraPage.vue'

import Dashboard from '@/components/DashboardComponent.vue'
import Employees from '@/components/EmployeesComponent.vue'
import Inventory from '@/components/InventoryComponent.vue'
import Produce from '@/components/ProduceComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/app',
      name: 'app',
      component: AppPage,
      children: [
        { path: '', redirect: '/app/dashboard' },
        { path: 'dashboard', component: Dashboard }, // ✅ FIXED
        { path: 'employees', component: Employees },
        { path: 'inventory', component: Inventory },
        { path: 'produce', component: Produce },
        { path: 'camera', component: Cam },
      ],
    },
  ],
})

export default router
