<script setup lang="ts">
import { computed, ref } from 'vue'
import { BIKE_MODELS, type BikeModel } from '../data/models'
import { useCompareStore } from '../stores/compare'

const compare = useCompareStore()

const q = ref('')
const category = ref<'All' | BikeModel['category']>('All')
const sort = ref<'popular' | 'priceAsc' | 'priceDesc'>('popular')

const categories = computed(() => ['All', ...Array.from(new Set(BIKE_MODELS.map((m) => m.category)))])

const filtered = computed(() => {
  const query = q.value.trim().toLowerCase()
  let list = BIKE_MODELS.filter((m) => {
    const matchesQuery =
      !query ||
      m.name.toLowerCase().includes(query) ||
      m.category.toLowerCase().includes(query) ||
      m.engineCc.toString().includes(query)
    const matchesCategory = category.value === 'All' || m.category === category.value
    return matchesQuery && matchesCategory
  })

  if (sort.value === 'priceAsc') list = [...list].sort((a, b) => a.priceFromUsd - b.priceFromUsd)
  if (sort.value === 'priceDesc') list = [...list].sort((a, b) => b.priceFromUsd - a.priceFromUsd)
  return list
})
</script>

<template>
  <section class="container-page py-10 sm:py-14">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 class="text-3xl font-black tracking-tight sm:text-5xl">Models</h1>
        <p class="mt-3 max-w-2xl text-sm text-white/60">
          Search, filter, and compare up to 3 bikes. (Images are 4K placeholders; swap them with your licensed Triumph images.)
        </p>
      </div>
      <RouterLink to="/compare" class="btn-ghost">
        Compare ({{ compare.count }})
      </RouterLink>
    </div>

    <div class="mt-8 grid gap-3 md:grid-cols-12">
      <div class="md:col-span-6">
        <label class="label" for="q">Search</label>
        <input id="q" v-model="q" class="input mt-1" placeholder="Street, Tiger, 1200, Adventure…" />
      </div>
      <div class="md:col-span-3">
        <label class="label" for="category">Category</label>
        <select id="category" v-model="category" class="input mt-1">
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div class="md:col-span-3">
        <label class="label" for="sort">Sort</label>
        <select id="sort" v-model="sort" class="input mt-1">
          <option value="popular">Recommended</option>
          <option value="priceAsc">Price: low to high</option>
          <option value="priceDesc">Price: high to low</option>
        </select>
      </div>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="m in filtered" :key="m.slug" class="card overflow-hidden">
        <RouterLink :to="`/models/${m.slug}`" class="block">
          <div class="aspect-[16/9] bg-black/30">
            <img :src="m.heroImageUrl" :alt="m.name" class="h-full w-full object-cover" />
          </div>
          <div class="p-5">
            <p class="text-xs font-semibold tracking-[0.2em] text-white/50">{{ m.category }}</p>
            <p class="mt-2 text-lg font-black">{{ m.name }}</p>
            <p class="mt-2 text-sm text-white/60">From ${{ m.priceFromUsd.toLocaleString() }}</p>
          </div>
        </RouterLink>
        <div class="flex items-center justify-between border-t border-white/10 p-4">
          <RouterLink :to="`/models/${m.slug}`" class="btn-ghost">Details</RouterLink>
          <button class="btn-primary" type="button" @click="compare.toggle(m.slug)" :disabled="!compare.has(m.slug) && compare.count >= 3">
            {{ compare.has(m.slug) ? 'Remove' : 'Compare' }}
          </button>
        </div>
      </div>
    </div>

    <p v-if="filtered.length === 0" class="mt-10 text-sm text-white/60">No models match your filters.</p>
  </section>
</template>

