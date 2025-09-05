// ─── Core Imports ───────────────────────────────────────────────
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'





// ─── Root Component ─────────────────────────────────────────────
import App from './App.vue'

// ─── Page Components ────────────────────────────────────────────
import Homepage from './pages/Homepage.vue'
import AboutUs from './pages/AboutUs.vue'
import ContactUs from './pages/ContactUs.vue'
import GalleryDesign from './pages/GalleryDesign.vue'

import './mug.css'


// ─── Router Configuration ───────────────────────────────────────
const routes = [
  { path: '/', name: 'Home', component: Homepage },
  { path: '/about', name: 'About', component: AboutUs },
  { path: '/contact', name: 'Contact', component: ContactUs },
  { path: '/gallery', name: 'Gallery', component: GalleryDesign }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ─── App Initialization ─────────────────────────────────────────
createApp(App)
  .use(router)
  .mount('#app')
