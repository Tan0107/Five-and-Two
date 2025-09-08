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
import kakashi from '../assets/kakashi.png'
import naruto1 from '../assets/naruto1.png'
import naruto2 from '../assets/naruto2.png'
import naruto from '../assets/naruto.png'
import panda from '../assets/panda.png'
import panda1 from '../assets/panda1.png'
import panda2 from '../assets/panda2.png'
import minions from '../assets/minions.png'
import teachers1 from '../assets/teachers1.png'
import teachers2 from '../assets/teachers2.png'
import teachers3 from '../assets/teachers3.png'
import teachers4 from '../assets/teachers4.png'
import joyLord from '../assets/joyLord.png'
import flower1 from '../assets/flower1.png'
import flower2 from '../assets/flower2.png'
import flower3 from '../assets/flower3.png'
import flower4 from '../assets/flower4.png'
import silhouette1 from '../assets/silhouette1.png'
import silhouette2 from '../assets/silhouette2.png'
import silhouette3 from '../assets/silhouette3.png'
import silhouette4 from '../assets/silhouette4.png'
import silhouette5 from '../assets/silhouette5.png'
import weddingcar1 from '../assets/weddingcar1.png'
import weddingcar2 from '../assets/weddingcar2.png'
import weddingcar3 from '../assets/weddingcar3.png'
import weddingcar4 from '../assets/weddingcar4.png'
import weddingcar5 from '../assets/weddingcar5.png'
import weddingcar6 from '../assets/weddingcar6.png'
import weddingcar7 from '../assets/weddingcar7.png'
import weddingcar8 from '../assets/weddingcar8.png'
import cat1 from '../assets/cat1.png'
import cat2 from '../assets/cat2.png'
import cat3 from '../assets/cat3.png'
import cat4 from '../assets/cat4.png'
import cat5 from '../assets/cat5.png'
import cat6 from '../assets/cat6.png'
import cat7 from '../assets/cat7.png'
import cat8 from '../assets/cat8.png'
import cat9 from '../assets/cat9.png'





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
  { id: 15, title: 'Zoro', category: 'Anime', image: zoro1 },
  { id: 16, title: 'Kakashi', category: 'Anime', image: kakashi },
  { id: 17, title: 'Naruto 1', category: 'Anime', image: naruto1 },
  { id: 18, title: 'Naruto 2', category: 'Anime', image: naruto2 },
  { id: 19, title: 'Naruto', category: 'Anime', image: naruto },
  { id: 20, title: 'Panda', category: 'Animals', image: panda },
  { id: 21, title: 'Panda 1', category: 'Animals', image: panda1 },
  { id: 22, title: 'Panda 2', category: 'Animals', image: panda2 },
  { id: 23, title: 'Minions', category: 'Characters', image: minions },
  { id: 24, title: 'Teachers Day', category: 'Education', image: teachers1 },
  { id: 25, title: 'Teachers Day 2', category: 'Education', image: teachers2 },
  { id: 26, title: 'Teachers Day 3', category: 'Education', image: teachers3 },
  { id: 27, title: 'Teachers Day 4', category: 'Education', image: teachers4 },
  { id: 28, title: 'The Joy of the Lord', category: 'Faith', image: joyLord },
  { id: 29, title: 'Flower 1', category: 'Nature', image: flower1 },
  { id: 30, title: 'Flower 2', category: 'Nature', image: flower2 },
  { id: 31, title: 'Flower 3', category: 'Nature', image: flower3 },
  { id: 32, title: 'Flower 4', category: 'Nature', image: flower4 },
  { id: 33, title: 'Silhouette 1', category: 'Silhouette', image: silhouette1 },
  { id: 34, title: 'Silhouette 2', category: 'Silhouette', image: silhouette2 },
  { id: 35, title: 'Silhouette 3', category: 'Silhouette', image: silhouette3 },
  { id: 36, title: 'Silhouette 4', category: 'Silhouette', image: silhouette4 },
  { id: 37, title: 'Silhouette 5', category: 'Silhouette', image: silhouette5 },
  { id: 38, title: 'Wedding Car 1', category: 'Wedding', image: weddingcar1 },
  { id: 39, title: 'Wedding Car 2', category: 'Wedding', image: weddingcar2 },
  { id: 40, title: 'Wedding Car 3', category: 'Wedding', image: weddingcar3 },
  { id: 41, title: 'Wedding Car 4', category: 'Wedding', image: weddingcar4 },
  { id: 42, title: 'Wedding Car 5', category: 'Wedding', image: weddingcar5 },
  { id: 43, title: 'Wedding Car 6', category: 'Wedding', image: weddingcar6 },
  { id: 44, title: 'Wedding Car 7', category: 'Wedding', image: weddingcar7 },
  { id: 45, title: 'Wedding Car 8', category: 'Wedding', image: weddingcar8 },
  { id: 46, title: 'Cat 1', category: 'Animals', image: cat1 },
  { id: 47, title: 'Cat 2', category: 'Animals', image: cat2 },
  { id: 48, title: 'Cat 3', category: 'Animals', image: cat3 },
  { id: 49, title: 'Cat 4', category: 'Animals', image: cat4 },
  { id: 50, title: 'Cat 5', category: 'Animals', image: cat5 },
  { id: 51, title: 'Cat 6', category: 'Animals', image: cat6 },
  { id: 52, title: 'Cat 7', category: 'Animals', image: cat7 },
  { id: 53, title: 'Cat 8', category: 'Animals', image: cat8 },
  { id: 54, title: 'Cat 9', category: 'Animals', image: cat9 }

  


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