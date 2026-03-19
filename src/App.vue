<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const mobileOpen = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)
</script>

<template>
  <div class="min-h-dvh">
    <header class="sticky top-0 z-40 border-b border-white/10 bg-triumph-black/80 backdrop-blur">
      <div class="container-page flex h-16 items-center justify-between gap-4">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/brand/triumph-mark.svg" alt="Triumph" class="h-9 w-auto" />
          <span class="sr-only">Triumph</span>
        </RouterLink>

        <nav class="hidden items-center gap-6 md:flex">
          <RouterLink to="/models" class="text-sm font-semibold text-white/80 hover:text-white">Models</RouterLink>
          <RouterLink to="/compare" class="text-sm font-semibold text-white/80 hover:text-white">Compare</RouterLink>
          <RouterLink to="/book-test-ride" class="text-sm font-semibold text-white/80 hover:text-white"
            >Book a test ride</RouterLink
          >
          <RouterLink to="/contact" class="text-sm font-semibold text-white/80 hover:text-white">Contact</RouterLink>
        </nav>

        <div class="flex items-center gap-3">
          <button class="btn-ghost md:hidden !px-3" type="button" @click="mobileOpen = !mobileOpen" aria-label="Menu">
            <span class="text-sm font-black">{{ mobileOpen ? 'Close' : 'Menu' }}</span>
          </button>
          <RouterLink to="/models" class="btn-ghost hidden sm:inline-flex">Explore</RouterLink>
          <RouterLink to="/book-test-ride" class="btn-primary">Test ride</RouterLink>
        </div>
      </div>

      <div v-if="mobileOpen" class="border-t border-white/10 md:hidden">
        <div class="container-page py-4 grid gap-2">
          <RouterLink to="/models" class="btn-ghost justify-start">Models</RouterLink>
          <RouterLink to="/compare" class="btn-ghost justify-start">Compare</RouterLink>
          <RouterLink to="/book-test-ride" class="btn-ghost justify-start">Book a test ride</RouterLink>
          <RouterLink to="/contact" class="btn-ghost justify-start">Contact</RouterLink>
          <RouterLink to="/admin/login" class="btn-ghost justify-start">Admin</RouterLink>
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="border-t border-white/10">
      <div class="container-page py-10">
        <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-3">
            <img src="/brand/triumph-mark.svg" alt="Triumph" class="h-8 w-auto opacity-90" />
            <span class="text-sm text-white/60">© {{ new Date().getFullYear() }} Triumph (demo)</span>
          </div>
          <div class="flex flex-wrap gap-4 text-sm text-white/60">
            <RouterLink to="/models" class="hover:text-white">Models</RouterLink>
            <RouterLink to="/contact" class="hover:text-white">Support</RouterLink>
            <RouterLink to="/admin/login" class="hover:text-white">Admin</RouterLink>
          </div>
        </div>
        <p class="mt-6 text-xs text-white/40">
          Brand assets and official bike imagery are not included in this scaffold. Replace the placeholder logo and images with your licensed Triumph assets.
        </p>
      </div>
    </footer>
  </div>
</template>
