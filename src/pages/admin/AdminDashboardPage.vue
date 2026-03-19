<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../../lib/api'

type Booking = {
  id: number
  fullName: string
  email: string
  phone: string
  modelSlug: string
  city: string
  preferredDate: string
  message?: string | null
  status: 'new' | 'contacted' | 'completed'
  createdAt: string
}

const loading = ref(true)
const bookings = ref<Booking[]>([])
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await api.get('/api/admin/test-rides')
    bookings.value = res.data?.data || []
  } catch {
    error.value = 'Unable to load bookings (backend not running yet).'
  } finally {
    loading.value = false
  }
}

load()
</script>

<template>
  <section class="container-page py-10 sm:py-14">
    <div class="flex items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold tracking-[0.25em] text-white/50">ADMIN</p>
        <h1 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Dashboard</h1>
        <p class="mt-3 text-sm text-white/60">Review test ride bookings, contact requests, and newsletter signups.</p>
      </div>
      <button class="btn-ghost" type="button" @click="load">Refresh</button>
    </div>

    <div class="mt-8 card p-6">
      <p v-if="loading" class="text-sm text-white/70">Loading…</p>
      <p v-else-if="error" class="text-sm text-red-300">{{ error }}</p>
      <div v-else>
        <p class="text-sm font-bold">Test ride requests</p>
        <div class="mt-4 overflow-x-auto">
          <table class="min-w-full text-left text-sm">
            <thead class="text-white/60">
              <tr>
                <th class="py-2 pr-4">Name</th>
                <th class="py-2 pr-4">Model</th>
                <th class="py-2 pr-4">City</th>
                <th class="py-2 pr-4">Date</th>
                <th class="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in bookings" :key="b.id" class="border-t border-white/10">
                <td class="py-3 pr-4 font-semibold">{{ b.fullName }}</td>
                <td class="py-3 pr-4 text-white/80">{{ b.modelSlug }}</td>
                <td class="py-3 pr-4 text-white/80">{{ b.city }}</td>
                <td class="py-3 pr-4 text-white/80">{{ b.preferredDate }}</td>
                <td class="py-3 pr-4">
                  <span class="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold">{{ b.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="bookings.length === 0" class="mt-4 text-sm text-white/60">No bookings yet.</p>
      </div>
    </div>
  </section>
</template>

