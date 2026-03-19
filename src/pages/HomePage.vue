<script setup lang="ts">
import { computed, ref } from 'vue'
import { z } from 'zod'
import { BIKE_MODELS } from '../data/models'
import { api, getValidationMessages } from '../lib/api'

const featured = computed(() => BIKE_MODELS.slice(0, 6))

const newsletterSchema = z.object({
  email: z.string().email('Enter a valid email'),
})

const email = ref('')
const submitting = ref(false)
const success = ref<string | null>(null)
const fieldErrors = ref<Record<string, string>>({})

async function submitNewsletter() {
  success.value = null
  fieldErrors.value = {}

  const parsed = newsletterSchema.safeParse({ email: email.value })
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors.email?.[0]
    fieldErrors.value.email = first || 'Invalid email'
    return
  }

  submitting.value = true
  try {
    await api.post('/api/newsletter', parsed.data)
    success.value = 'Thanks — you’re subscribed.'
    email.value = ''
  } catch (e) {
    fieldErrors.value = getValidationMessages(e)
    if (!fieldErrors.value.email) fieldErrors.value.email = 'Subscription failed. Try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="relative overflow-hidden border-b border-white/10">
    <div class="absolute inset-0">
      <img src="/hero/home-hero.png" alt="" class="h-full w-full object-cover opacity-80" />
      <div class="absolute inset-0 bg-gradient-to-b from-triumph-black/70 via-triumph-black/70 to-triumph-black"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,16,46,0.25),transparent_40%)]"></div>
    </div>
    <div class="container-page py-14 sm:py-20">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="text-xs font-semibold tracking-[0.25em] text-white/60">TRIUMPH</p>
          <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Discover the ride that fits your story.</h1>
          <p class="mt-5 max-w-xl text-base text-white/70">
            Explore models, compare specs, and book a test ride — with validation and flows designed like a real motorcycle website.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink to="/models" class="btn-primary">Explore models</RouterLink>
            <RouterLink to="/compare" class="btn-ghost">Compare</RouterLink>
          </div>
        </div>

        <div class="card p-4 sm:p-6">
          <div class="rounded-xl bg-gradient-to-br from-triumph-red/25 via-white/10 to-white/5 p-6">
            <p class="text-sm font-semibold text-white/80">Featured</p>
            <p class="mt-1 text-2xl font-black">Top picks</p>
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <RouterLink
                v-for="m in featured"
                :key="m.slug"
                :to="`/models/${m.slug}`"
                class="group rounded-xl border border-white/10 bg-black/20 p-3 hover:bg-white/5"
              >
                <div class="flex items-center gap-3">
                  <img :src="m.heroImageUrl" :alt="m.name" class="h-12 w-20 rounded-lg object-cover" />
                  <div class="min-w-0">
                    <p class="truncate text-sm font-bold">{{ m.name }}</p>
                    <p class="text-xs text-white/60">{{ m.category }}</p>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>

          <div class="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
            <p class="text-sm font-bold">Get updates</p>
            <p class="mt-1 text-sm text-white/60">News, launches, and test ride availability.</p>
            <form class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start" @submit.prevent="submitNewsletter">
              <div class="flex-1">
                <label class="label" for="newsletter-email">Email</label>
                <input id="newsletter-email" v-model="email" class="input mt-1" type="email" autocomplete="email" placeholder="you@example.com" />
                <p v-if="fieldErrors.email" class="error mt-1">{{ fieldErrors.email }}</p>
                <p v-else class="help mt-1">We’ll never share your email.</p>
              </div>
              <button class="btn-primary sm:mt-6" type="submit" :disabled="submitting">
                {{ submitting ? 'Subscribing…' : 'Subscribe' }}
              </button>
            </form>
            <p v-if="success" class="mt-3 text-sm font-semibold text-emerald-200">{{ success }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container-page py-12 sm:py-16">
    <div class="flex items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-black">Models</h2>
        <p class="mt-1 text-sm text-white/60">Browse all bikes and compare key specs.</p>
      </div>
      <RouterLink to="/models" class="btn-ghost">View all</RouterLink>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink v-for="m in featured" :key="m.slug" :to="`/models/${m.slug}`" class="card group overflow-hidden">
        <div class="aspect-[16/9] bg-black/30">
          <img :src="m.heroImageUrl" :alt="m.name" class="h-full w-full object-cover opacity-95 transition group-hover:scale-[1.02]" />
        </div>
        <div class="p-5">
          <p class="text-xs font-semibold tracking-[0.2em] text-white/50">{{ m.category }}</p>
          <p class="mt-2 text-lg font-black">{{ m.name }}</p>
          <p class="mt-2 text-sm text-white/60">From ${{ m.priceFromUsd.toLocaleString() }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

