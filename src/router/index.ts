import { createRouter, createWebHashHistory, type Router } from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import SettingsComponent from '../components/SettingsComponent.vue'
import DownloadComponent from '../components/DownloadComponent.vue'

export default (): Router => {
  return createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: HomeComponent
      },
      {
        path: '/settings',
        name: 'Settings',
        component: SettingsComponent
      },
      {
        path: '/download',
        name: 'Download',
        component: DownloadComponent
      }
    ]
  })
}
