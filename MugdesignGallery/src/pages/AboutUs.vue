<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased">

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img
          src="../assets/5and2.jpg"
          alt="Five and Two background"
          class="hero-image"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">
          About Five and Two
        </h1>
        <p class="hero-subtitle">
          Inspired by a story of faith, we believe that with a little, God can do a lot.
        </p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <article>
          <h2 class="story-title">
            The Multiplied Story
          </h2>
          <p class="story-paragraph">
            The name <strong class="text-orange-600 font-semibold">Five and Two</strong> is inspired by the biblical story of five loaves and two fishes. It's a powerful reminder that even the smallest offering, when placed in God's hands, can be multiplied to become a great blessing.
          </p>
          <p class="story-paragraph">
            This business is more than just a company—it’s a personal journey of growth. I started this to overcome my fear of public speaking and to build my confidence in business. My deepest hope is that someday, God will use me to encourage many people through His Word, and that this company will be a testament to His faithfulness.
          </p>
        </article>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="values-title">
          Our Guiding Principles 
        </h2>
        <div class="values-grid">
          <div
            v-for="value in values"
            :key="value.title"
            class="c-value-card"
          >
            <div class="flex flex-col items-center">
              <div class="c-value-card__icon">
                <i :class="value.icon" aria-hidden="true"></i>
              </div>
              <h3 class="c-value-card__title">{{ value.title }}</h3>
              <p class="c-value-card__description">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import '../document.css'

const values = ref([
  {
    title: 'The Cornerstone of Faith',
    description: 'We are grounded in the belief that small acts of faith can lead to monumental blessings.',
    icon: 'fas fa-cross'
  },
  {
    title: 'Cultivating Courage',
    description: 'Every step we take is an opportunity to learn and grow, both as a business and as individuals.',
    icon: 'fas fa-seedling'
  },
  {
    title: 'Blessings Multiplied',
    description: 'Our ultimate purpose is to use what we learn to bless and encourage others in their own journeys.',
    icon: 'fas fa-hands-holding'
  }
])
</script>
