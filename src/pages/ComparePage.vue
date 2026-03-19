<script setup lang="ts">
import { computed } from 'vue'
import { BIKE_MODELS } from '../data/models'
import { useCompareStore } from '../stores/compare'

const compare = useCompareStore()
const models = computed(() => BIKE_MODELS.filter((m) => compare.slugs.includes(m.slug)))

const rows = [
  { label: 'Category', get: (m: any) => m.category },
  { label: 'From (USD)', get: (m: any) => `$${m.priceFromUsd.toLocaleString()}` },
  { label: 'Engine', get: (m: any) => `${m.engineCc} cc` },
  { label: 'Power', get: (m: any) => `${m.powerHp} hp` },
  { label: 'Torque', get: (m: any) => `${m.torqueNm} Nm` },
  { label: 'Wet weight', get: (m: any) => `${m.wetWeightKg} kg` },
  { label: 'Seat height', get: (m: any) => `${m.seatHeightMm} mm` },
]
</script>

<template>
  <section class="container-page py-10 sm:py-14">
    <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-black tracking-tight sm:text-5xl">Compare</h1>
        <p class="mt-3 text-sm text-white/60">Select up to 3 bikes on the Models page to compare key specs.</p>
      </div>
      <div class="flex gap-3">
        <button class="btn-ghost" type="button" @click="compare.clear" :disabled="compare.count === 0">Clear</button>
        <RouterLink to="/models" class="btn-primary">Add models</RouterLink>
      </div>
    </div>

    <div v-if="models.length === 0" class="mt-10 card p-8">
      <p class="text-lg font-black">No models selected</p>
      <p class="mt-2 text-sm text-white/60">Go to Models, tap Compare, then return here.</p>
      <div class="mt-6">
        <RouterLink to="/models" class="btn-primary">Browse models</RouterLink>
      </div>
    </div>

    <div v-else class="mt-8 overflow-hidden rounded-2xl border border-white/10">
      <div class="grid" :class="models.length === 1 ? 'grid-cols-1' : models.length === 2 ? 'grid-cols-2' : 'grid-cols-3'">
        <div v-for="m in models" :key="m.slug" class="border-white/10 bg-white/5 p-4" :class="models.length > 1 ? 'border-r last:border-r-0' : ''">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <RouterLink :to="`/models/${m.slug}`" class="block truncate text-sm font-black hover:underline">{{ m.name }}</RouterLink>
              <p class="mt-1 text-xs text-white/60">{{ m.category }}</p>
            </div>
            <button class="btn-ghost !px-3 !py-1.5" type="button" @click="compare.remove(m.slug)">Remove</button>
          </div>
          <img :src="m.heroImageUrl" :alt="m.name" class="mt-4 aspect-[16/9] w-full rounded-xl object-cover" />
        </div>
      </div>

      <div class="border-t border-white/10 bg-black/30 p-4 sm:p-6">
        <div class="grid gap-4">
          <div v-for="r in rows" :key="r.label" class="grid gap-3 sm:grid-cols-12 sm:items-center">
            <div class="sm:col-span-3">
              <p class="text-xs font-semibold text-white/60">{{ r.label }}</p>
            </div>
            <div class="sm:col-span-9">
              <div class="grid gap-3" :class="models.length === 1 ? 'grid-cols-1' : models.length === 2 ? 'grid-cols-2' : 'grid-cols-3'">
                <div v-for="m in models" :key="m.slug + r.label" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold">
                  {{ r.get(m) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

