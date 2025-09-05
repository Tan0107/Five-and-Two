<template>
  <div class="mg-page py-5 bg-light">
    <div class="container">

      <div class="mg-header text-center mb-4">
        <h1 class="mg-title display-5 fw-bold text-secondary mb-2">Design Gallery</h1>
        <p class="mg-subtitle lead text-secondary">
          Browse our collection and copy reference links for your favorite designs
        </p>
      </div>

      <div class="row mb-4 justify-content-center">
        <div class="col-12 col-md-8">
          <input 
            v-model="searchQuery"
            type="text"
            class="form-control form-control-lg mg-search-input"
            placeholder="Search by title or category..."
          />
        </div>
      </div>

      <div class="row g-4">
        <template v-if="filteredDesigns.length">
          <div 
            v-for="design in filteredDesigns" 
            :key="design.id" 
            class="col-12 col-md-6 col-lg-4"
          >
            <div class="mg-card card shadow-sm border-0 overflow-hidden h-100">
              <div class="mg-card-img position-relative overflow-hidden" @click="openModal(design)">
                <img 
                  :src="design.image" 
                  :alt="design.title || 'Design preview'"
                  class="img-fluid mg-img-hover"
                />
                <div class="mg-card-overlay"></div>
              </div>

              <div class="card-body text-center">
                <h5 class="mg-card-title card-title mb-1">{{ design.title }}</h5>
                <p class="mg-card-category text-muted mb-3">{{ design.category }}</p>
                <div class="d-flex flex-column flex-sm-row gap-2">
                  <button 
                    @click="copyReferenceLink(design)"
                    class="btn btn-warning mg-btn-copy flex-fill"
                  >
                    Copy Link
                  </button>
                  <a
                    :href="design.image"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-outline-primary flex-fill"
                  >
                    View Image
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div v-else class="col-12 text-center py-5">
          <h4 class="text-danger fw-bold">Design not found</h4>
          <p class="text-muted">We couldn’t find any designs matching your search. Try a different keyword or explore the full gallery above.</p>
        </div>
      </div>

      <div 
        v-if="showToast" 
        class="position-fixed bottom-0 end-0 m-3 mg-toast alert alert-success d-flex align-items-center shadow"
        role="alert"
      >
        <div>Image link copied to clipboard!</div>
      </div>

      <div v-if="isModalOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content-vue">
          <img :src="modalImage" :alt="modalTitle || 'Design preview'" class="img-fluid w-100" />
          <h5 class="mt-3 text-primary">{{ modalTitle }}</h5>
          <button class="btn btn-secondary mt-3" @click="closeModal">Close</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Import all your images. This is the fix.
// Using relative paths works because this is a JS file.
import ace1 from '../assets/ace1.png'
import boa1 from '../assets/boa1.png'
import gojo1 from '../assets/gojo1.png'
import bible1 from '../assets/bible1.png'
import bible2 from '../assets/bible2.png'
import bible3 from '../assets/bible3.png'
import bible4 from '../assets/bible4.png'
import bible5 from '../assets/bible5.png'
import bible6 from '../assets/bible6.png'
import luffy1 from '../assets/luffy1.png'
import luffy2 from '../assets/luffy2.png'
import luffy3 from '../assets/luffy3.png'
import luffy4 from '../assets/luffy4.png'
import zoro1 from '../assets/zoro1.png'

// Reactive State
const showToast = ref(false)
const modalImage = ref('')
const modalTitle = ref('')
const isModalOpen = ref(false)
const searchQuery = ref('')

// Static image paths
const designs = ref([
  { id: 1, title: 'Ace Flame', category: 'Anime', image: ace1 },
  { id: 2, title: 'Boa Charm', category: 'Anime', image: boa1 },
  { id: 3, title: 'Gojo Infinity', category: 'Anime', image: gojo1 },
  { id: 4, title: 'Psalms 32:8', category: 'Faith', image: bible1 },
  { id: 5, title: 'Isaiah 41:10', category: 'Faith', image: bible2 },
  { id: 6, title: 'Psalms 147:3', category: 'Faith', image: bible3 },
  { id: 7, title: '1 Corithians 2:9', category: 'Faith', image: bible4 },
  { id: 8, title: 'Matthew 28:20', category: 'Faith', image: bible5 },
  { id: 9, title: 'Philippians 2:10-11', category: 'Faith', image: bible6 },
  { id: 11, title: 'Luffy Face 2', category: 'Anime', image: luffy1 },
  { id: 12, title: 'Luffy Natural 3', category: 'Anime', image: luffy2 },
  { id: 13, title: 'Luffy Gear 5', category: 'Anime', image: luffy3 },
  { id: 14, title: 'Luffy Gear 2', category: 'Anime', image: luffy4 },
  { id: 15, title: 'Zoro', category: 'Anime', image: zoro1 }
])

// Filtered Designs
const filteredDesigns = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return designs.value.filter(design =>
    design.title.toLowerCase().includes(query) ||
    design.category.toLowerCase().includes(query)
  )
})

// Copy Link
const copyReferenceLink = async (design) => {
  // Use the image variable directly
  const imageURL = design.image; 
  try {
    await navigator.clipboard.writeText(imageURL);
    showToast.value = true;
    setTimeout(() => showToast.value = false, 3000);
  } catch (err) {
    console.error('Failed to copy image URL:', err);
  }
}

// Modal Logic
const openModal = (design) => {
  modalImage.value = design.image
  modalTitle.value = design.title
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}
const handleKey = (e) => {
  if (e.key === 'Escape') closeModal()
}
onMounted(() => window.addEventListener('keydown', handleKey))
onUnmounted(() => window.removeEventListener('keydown', handleKey))
</script>