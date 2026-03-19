<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { api, getValidationMessages } from '../lib/api'

const schema = z.object({
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(3, 'Enter a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
})

const form = ref({
  fullName: '',
  email: '',
  subject: '',
  message: '',
})

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
    await api.post('/api/contact', parsed.data)
    success.value = 'Message sent — thanks for reaching out.'
    form.value = { fullName: '', email: '', subject: '', message: '' }
  } catch (e) {
    fieldErrors.value = getValidationMessages(e)
    if (Object.keys(fieldErrors.value).length === 0) fieldErrors.value.form = 'Failed to send. Try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="container-page py-10 sm:py-14">
    <div class="grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <h1 class="text-3xl font-black tracking-tight sm:text-5xl">Contact</h1>
        <p class="mt-3 text-sm text-white/60">Send us a message. This form uses front-end + back-end validation.</p>
        <div class="mt-8 card p-6">
          <p class="text-sm font-bold">Support</p>
          <p class="mt-2 text-sm text-white/70">Hours: Mon–Fri, 9:00–18:00</p>
          <p class="mt-1 text-sm text-white/70">Email: support@example.com</p>
          <p class="mt-1 text-sm text-white/70">Phone: +1 (555) 010-2026</p>
        </div>
      </div>

      <div class="lg:col-span-7 card p-6">
        <form class="grid gap-4" @submit.prevent="submit">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="label" for="fullName">Full name</label>
              <input id="fullName" v-model="form.fullName" class="input mt-1" autocomplete="name" />
              <p v-if="fieldErrors.fullName" class="error mt-1">{{ fieldErrors.fullName }}</p>
            </div>
            <div>
              <label class="label" for="email">Email</label>
              <input id="email" v-model="form.email" class="input mt-1" type="email" autocomplete="email" />
              <p v-if="fieldErrors.email" class="error mt-1">{{ fieldErrors.email }}</p>
            </div>
          </div>

          <div>
            <label class="label" for="subject">Subject</label>
            <input id="subject" v-model="form.subject" class="input mt-1" />
            <p v-if="fieldErrors.subject" class="error mt-1">{{ fieldErrors.subject }}</p>
          </div>

          <div>
            <label class="label" for="message">Message</label>
            <textarea id="message" v-model="form.message" class="input mt-1 min-h-40 resize-y"></textarea>
            <p v-if="fieldErrors.message" class="error mt-1">{{ fieldErrors.message }}</p>
          </div>

          <p v-if="fieldErrors.form" class="error">{{ fieldErrors.form }}</p>
          <p v-if="success" class="text-sm font-semibold text-emerald-200">{{ success }}</p>

          <div class="flex flex-wrap gap-3">
            <button class="btn-primary" type="submit" :disabled="submitting">{{ submitting ? 'Sending…' : 'Send message' }}</button>
            <RouterLink class="btn-ghost" to="/models">Explore models</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

