<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">

    <!-- ─── Hero Section ─────────────────────────────── -->
    <section id="magic-hero" class="magic-hero relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <!-- Left Content -->
        <div class="flex flex-col justify-center">
          <h1 class="magic-hero-title text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Why <span class="text-amber-600"> a Mug Matters</span>
          </h1>
          <p class="magic-hero-subtitle text-xl text-gray-600 mb-8 max-w-xl">
            More than coffee, more than tea, your mug reflects you. Pick your vibe with Magic Mugs and let the colors appear with every sip.
          </p>
        </div>

        <!-- Right Content (Image) -->
        <div class="flex justify-center md:justify-end items-center gap-4">
          <img :src="heroMug" alt="Magic Mug" id="hero-mug-image" class="max-w-xs w-full rounded-lg shadow-md" />
          <img :src="heroMug1" alt="Magic Mug" id="hero1-mug-image" class="max-w-xs w-full rounded-lg shadow-md" />
        </div>
      </div>
    </section>

    <!-- ─── Features Section ─────────────────────────── -->
    <section id="magic-features" class="magic-features py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="magic-features-title text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Magic Mugs?
        </h2>
        <div class="magic-feature-grid grid md:grid-cols-3 gap-8">
          <div
            v-for="feature in magicFeatures"
            :key="feature.key"
            class="magic-feature-card text-center"
          >
            <div class="magic-feature-icon-wrapper w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="feature.icon" class="magic-feature-icon w-8 h-8 text-amber-600" />
            </div>
            <h3 class="magic-feature-title text-xl font-semibold text-gray-900 mb-2">
              {{ feature.title }}
            </h3>
            <p class="magic-feature-description text-gray-600">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

  <section id="magic-gallery" class="magic-gallery py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-7xl mx-auto text-center">
    <h2 class="magic-gallery-title text-4xl font-bold text-gray-900 mb-16">
      Mug Sample Designs
    </h2>
    <div class="magic-gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
      <div
        v-for="(img, index) in galleryImages"
        :key="index"
        class="magic-gallery-card bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300 ease-in-out"
      >
        <div class="magic-gallery-image aspect-[4/3] bg-gray-50 rounded-lg mb-6 overflow-hidden flex items-center justify-center">
          <img 
            :src="img" 
            :alt="`A vibrant custom mug design, Mug ${index + 1}`" 
            class="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105 rounded-md"
          />
        </div>
       <div class="magic-gallery-actions">
  <a
    :href="img"
    target="_blank"
    rel="noopener noreferrer"
    class="magic-gallery-btn view-image"
  >
    View Image
  </a>
  <button
    @click="copyToClipboard(img)"
    class="magic-gallery-btn copy-link"
  >
    Copy Link
  </button>
</div>
      </div>
    </div>
  </div>
</section>

    <!-- ─── Final Call To Action ─────────────────────── -->
<footer id="magic-footer" class="magic-footer">
  <div class="magic-footer-container">
    <div class="magic-footer-left">
      <h2>Let’s Stay Connected</h2>
      <p>Share your mug moments, ask questions, or just say hi, we’d love to hear from you.</p>
      <p class="copyright">© Five & Two. Crafted with warmth and wonder.</p>
    </div>
    <div class="magic-footer-right">
      <h3>Follow Us</h3>
      <div class="social-links">
        <a href="https://www.facebook.com/jtahndlrsuntln0107" target="_blank" rel="noopener noreferrer">
          <Facebook class="w-6 h-6" />
        </a>
        <a href="https://www.instagram.com/five.and2?igsh=MWFqaWlvcjNud3RkYg==  " target="_blank" rel="noopener noreferrer">
          <Instagram class="w-6 h-6" />
        </a>
        <a href="mailto:jthandelosreyesuntalan@gmail.com">
          <Mail class="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</footer>


  </div>
</template>

<script setup>
import heroMug from "../assets/heromug.png"
import heroMug1 from "../assets/heromug1.png"
import { Sparkles, Palette, Coffee } from "lucide-vue-next"
import { Facebook, Instagram, Mail } from "lucide-vue-next"

const galleryImages = [
  new URL("../assets/1.jpg", import.meta.url).href,
  new URL("../assets/2.jpg", import.meta.url).href,
  new URL("../assets/3.jpg", import.meta.url).href,
  new URL("../assets/4.jpg", import.meta.url).href,
  new URL("../assets/5.jpg", import.meta.url).href,
  new URL("../assets/6.jpg", import.meta.url).href,
  new URL("../assets/7.jpg", import.meta.url).href,
  new URL("../assets/8.jpg", import.meta.url).href,
  new URL("../assets/9.jpg", import.meta.url).href,
]

const magicFeatures = [
 {
  key: "unique",
  title: "Unique Designs",
  description: "Discover a handpicked collection of artistic styles that magically come alive with heat.",
  icon: Sparkles,
},
{
  key: "custom",
  title: "Personalized Touch",
  description: "Add your name, favorite quote, or photo — creating a mug as unique as you are.",
  icon: Palette,
},
{
  key: "quality",
  title: "Premium Quality",
  description: "Crafted from durable, high-grade ceramic built to last through every sip and smile.",
  icon: Coffee,
},

]

function copyToClipboard(link) {
  navigator.clipboard.writeText(link).then(() => {
    alert("✅ Image link copied! You can now send it to us for inquiries.");
  }).catch(() => {
    alert("⚠️ Failed to copy link. Please try again.");
  });
}

</script>
