<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BIKE_MODELS } from '../data/models'
import { useCompareStore } from '../stores/compare'

const route = useRoute()
const compare = useCompareStore()

const slug = computed(() => String(route.params.slug || ''))
const model = computed(() => BIKE_MODELS.find((m) => m.slug === slug.value) || null)
</script>

<template>
  <section v-if="model" class="border-b border-white/10">
    <div class="container-page py-10 sm:py-14">
      <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="text-xs font-semibold tracking-[0.25em] text-white/50">{{ model.category }}</p>
          <h1 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{{ model.name }}</h1>
          <p class="mt-4 text-sm text-white/70">{{ model.description }}</p>

          <div class="mt-6 flex flex-wrap gap-3">
            <RouterLink to="/book-test-ride" class="btn-primary">Book a test ride</RouterLink>
            <button class="btn-ghost" type="button" @click="compare.toggle(model.slug)" :disabled="!compare.has(model.slug) && compare.count >= 3">
              {{ compare.has(model.slug) ? 'Remove from compare' : 'Add to compare' }}
            </button>
            <RouterLink to="/compare" class="btn-ghost">Go to compare</RouterLink>
          </div>

          <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div class="card p-4">
              <p class="text-xs font-semibold text-white/60">From</p>
              <p class="mt-1 text-lg font-black">${{ model.priceFromUsd.toLocaleString() }}</p>
            </div>
            <div class="card p-4">
              <p class="text-xs font-semibold text-white/60">Engine</p>
              <p class="mt-1 text-lg font-black">{{ model.engineCc }} cc</p>
            </div>
            <div class="card p-4">
              <p class="text-xs font-semibold text-white/60">Power</p>
              <p class="mt-1 text-lg font-black">{{ model.powerHp }} hp</p>
            </div>
            <div class="card p-4">
              <p class="text-xs font-semibold text-white/60">Torque</p>
              <p class="mt-1 text-lg font-black">{{ model.torqueNm }} Nm</p>
            </div>
            <div class="card p-4">
              <p class="text-xs font-semibold text-white/60">Wet weight</p>
              <p class="mt-1 text-lg font-black">{{ model.wetWeightKg }} kg</p>
            </div>
            <div class="card p-4">
              <p class="text-xs font-semibold text-white/60">Seat height</p>
              <p class="mt-1 text-lg font-black">{{ model.seatHeightMm }} mm</p>
            </div>
          </div>

          <div class="mt-8">
            <h2 class="text-xl font-black">Highlights</h2>
            <ul class="mt-3 grid gap-2 sm:grid-cols-2">
              <li v-for="h in model.highlights" :key="h" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                {{ h }}
              </li>
            </ul>
          </div>
        </div>

        <div class="card overflow-hidden">
          <div class="aspect-[16/9] bg-black/30">
            <img :src="model.heroImageUrl" :alt="model.name" class="h-full w-full object-cover" />
          </div>
          <div class="border-t border-white/10 p-5">
            <p class="text-sm font-semibold text-white/70">Gallery</p>
            <div class="mt-3 grid grid-cols-3 gap-3">
              <img v-for="src in model.gallery" :key="src" :src="src" :alt="model.name" class="aspect-[4/3] rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="container-page py-16">
    <div class="card p-8">
      <p class="text-lg font-black">Model not found</p>
      <p class="mt-2 text-sm text-white/60">The model you requested doesn’t exist in this demo catalog.</p>
      <div class="mt-6">
        <RouterLink to="/models" class="btn-primary">Back to models</RouterLink>
      </div>
    </div>
  </section>
</template>

