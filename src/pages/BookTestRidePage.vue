<script setup lang="ts">
import { computed, ref } from 'vue'
import { z } from 'zod'
import { BIKE_MODELS } from '../data/models'
import { api, getValidationMessages } from '../lib/api'

const schema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  modelSlug: z.string().min(1, 'Select a model'),
  city: z.string().min(2, 'Enter your city'),
  preferredDate: z.string().min(1, 'Select a preferred date'),
  message: z.string().max(600, 'Message is too long').optional().or(z.literal('')),
})

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  modelSlug: '',
  city: '',
  preferredDate: '',
  message: '',
})

const models = computed(() => BIKE_MODELS)
const submitting = ref(false)
const success = ref<string | null>(null)
const fieldErrors = ref<Record<string, string>>({})

async function submit() {
  success.value = null
  fieldErrors.value = {}

  const parsed = schema.safeParse(form.value)
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors
    for (const [k, v] of Object.entries(flat)) {
      if (v?.[0]) fieldErrors.value[k] = v[0]
    }
    return
  }

  submitting.value = true
  try {
    await api.post('/api/test-rides', parsed.data)
    success.value = 'Request submitted — we’ll contact you shortly.'
    form.value = { fullName: '', email: '', phone: '', modelSlug: '', city: '', preferredDate: '', message: '' }
  } catch (e) {
    fieldErrors.value = getValidationMessages(e)
    if (Object.keys(fieldErrors.value).length === 0) {
      fieldErrors.value.form = 'Something went wrong. Try again.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="container-page py-10 sm:py-14">
    <div class="max-w-3xl">
      <h1 class="text-3xl font-black tracking-tight sm:text-5xl">Book a test ride</h1>
      <p class="mt-3 text-sm text-white/60">Validated form (front-end) and will be validated again in Laravel.</p>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-12">
      <div class="lg:col-span-7 card p-6">
        <form class="grid gap-4" @submit.prevent="submit">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="label" for="fullName">Full name</label>
              <input id="fullName" v-model="form.fullName" class="input mt-1" autocomplete="name" />
              <p v-if="fieldErrors.fullName" class="error mt-1">{{ fieldErrors.fullName }}</p>
            </div>
            <div>
              <label class="label" for="city">City</label>
              <input id="city" v-model="form.city" class="input mt-1" autocomplete="address-level2" />
              <p v-if="fieldErrors.city" class="error mt-1">{{ fieldErrors.city }}</p>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="label" for="email">Email</label>
              <input id="email" v-model="form.email" class="input mt-1" type="email" autocomplete="email" />
              <p v-if="fieldErrors.email" class="error mt-1">{{ fieldErrors.email }}</p>
            </div>
            <div>
              <label class="label" for="phone">Phone</label>
              <input id="phone" v-model="form.phone" class="input mt-1" type="tel" autocomplete="tel" />
              <p v-if="fieldErrors.phone" class="error mt-1">{{ fieldErrors.phone }}</p>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="label" for="modelSlug">Model</label>
              <select id="modelSlug" v-model="form.modelSlug" class="input mt-1">
                <option value="" disabled>Select a model…</option>
                <option v-for="m in models" :key="m.slug" :value="m.slug">{{ m.name }}</option>
              </select>
              <p v-if="fieldErrors.modelSlug" class="error mt-1">{{ fieldErrors.modelSlug }}</p>
            </div>
            <div>
              <label class="label" for="preferredDate">Preferred date</label>
              <input id="preferredDate" v-model="form.preferredDate" class="input mt-1" type="date" />
              <p v-if="fieldErrors.preferredDate" class="error mt-1">{{ fieldErrors.preferredDate }}</p>
            </div>
          </div>

          <div>
            <label class="label" for="message">Message (optional)</label>
            <textarea id="message" v-model="form.message" class="input mt-1 min-h-28 resize-y"></textarea>
            <p v-if="fieldErrors.message" class="error mt-1">{{ fieldErrors.message }}</p>
            <p v-else class="help mt-1">Tell us anything helpful (experience level, preferred time, etc.).</p>
          </div>

          <p v-if="fieldErrors.form" class="error">{{ fieldErrors.form }}</p>
          <p v-if="success" class="text-sm font-semibold text-emerald-200">{{ success }}</p>

          <div class="flex flex-wrap gap-3">
            <button class="btn-primary" type="submit" :disabled="submitting">{{ submitting ? 'Submitting…' : 'Submit request' }}</button>
            <RouterLink class="btn-ghost" to="/models">Browse models</RouterLink>
          </div>
        </form>
      </div>

      <div class="lg:col-span-5 card p-6">
        <p class="text-sm font-bold">What happens next?</p>
        <ul class="mt-4 grid gap-3 text-sm text-white/70">
          <li class="rounded-xl border border-white/10 bg-white/5 p-4">We validate your request and create a booking record.</li>
          <li class="rounded-xl border border-white/10 bg-white/5 p-4">A dealer/admin reviews it in the dashboard.</li>
          <li class="rounded-xl border border-white/10 bg-white/5 p-4">We contact you by email/phone to confirm.</li>
        </ul>
        <p class="mt-5 text-xs text-white/40">
          Demo note: once Laravel is running locally, this page will POST to `POST /api/test-rides` and show server-side validation errors too.
        </p>
      </div>
    </div>
  </section>
</template>

