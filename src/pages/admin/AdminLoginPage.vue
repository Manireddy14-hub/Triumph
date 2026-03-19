<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { api, getValidationMessages } from '../../lib/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const email = ref('admin@triumph.local')
const password = ref('password')
const submitting = ref(false)
const fieldErrors = ref<Record<string, string>>({})

async function login() {
  fieldErrors.value = {}
  const parsed = schema.safeParse({ email: email.value, password: password.value })
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors
    if (flat.email?.[0]) fieldErrors.value.email = flat.email[0]
    if (flat.password?.[0]) fieldErrors.value.password = flat.password[0]
    return
  }

  submitting.value = true
  try {
    await api.post('/api/admin/login', parsed.data)
    await router.push('/admin')
  } catch (e) {
    fieldErrors.value = getValidationMessages(e)
    if (Object.keys(fieldErrors.value).length === 0) fieldErrors.value.form = 'Login failed.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="container-page py-14">
    <div class="mx-auto max-w-md card p-6">
      <p class="text-xs font-semibold tracking-[0.25em] text-white/50">ADMIN</p>
      <h1 class="mt-3 text-2xl font-black">Sign in</h1>
      <p class="mt-2 text-sm text-white/60">This will be powered by Laravel Sanctum once the backend is generated.</p>

      <form class="mt-6 grid gap-4" @submit.prevent="login">
        <div>
          <label class="label" for="email">Email</label>
          <input id="email" v-model="email" class="input mt-1" type="email" autocomplete="username" />
          <p v-if="fieldErrors.email" class="error mt-1">{{ fieldErrors.email }}</p>
        </div>
        <div>
          <label class="label" for="password">Password</label>
          <input id="password" v-model="password" class="input mt-1" type="password" autocomplete="current-password" />
          <p v-if="fieldErrors.password" class="error mt-1">{{ fieldErrors.password }}</p>
        </div>
        <p v-if="fieldErrors.form" class="error">{{ fieldErrors.form }}</p>
        <button class="btn-primary" type="submit" :disabled="submitting">{{ submitting ? 'Signing in…' : 'Sign in' }}</button>
      </form>
    </div>
  </section>
</template>

