<template>
  <nav class="navbar navbar-expand-md navbar-light  shadow sticky-top">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand text-amber-600 fw-bold fs-4" to="/">
        Five & Two
      </router-link>

      <!-- Mobile Menu Toggle -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMobileMenu"
        :aria-expanded="mobileMenuOpen.toString()"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div
        class="collapse navbar-collapse"
        :class="{ show: mobileMenuOpen }"
      >
        <ul class="navbar-nav ms-auto mb-2 mb-md-0">
          <li
            v-for="item in navItems"
            :key="item.name"
            class="nav-item"
          >
            <router-link
              :to="item.to"
              class="nav-link"
              
              @click="closeMobileMenu"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Contact Us', to: '/contact' },
  
  
]

const isActive = (path) => route.path.startsWith(path)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Lock scroll when mobile menu is open
watch(mobileMenuOpen, (open) => {
  document.body.classList.toggle('overflow-hidden', open)
})
</script>

