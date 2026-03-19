import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

type Json = Record<string, any>

function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function lsSet(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

function nowIso() {
  return new Date().toISOString()
}

function randId() {
  return Math.floor(Math.random() * 9_000_000) + 1_000_000
}

function mockOk<T>(config: InternalAxiosRequestConfig, data: T, status = 200): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: 'OK',
    headers: { 'content-type': 'application/json' },
    config,
  }
}

function mockValidation(config: InternalAxiosRequestConfig, errors: Record<string, string[]>): AxiosResponse<Json> {
  return mockOk(config, { message: 'The given data was invalid.', errors }, 422)
}

function parseBody(config: InternalAxiosRequestConfig): any {
  const d: any = (config as any).data
  if (d == null) return {}
  if (typeof d === 'string') {
    try {
      return JSON.parse(d)
    } catch {
      return {}
    }
  }
  return d
}

function mockHandler(config: InternalAxiosRequestConfig): AxiosResponse<any> | null {
  const method = String(config.method || 'get').toLowerCase()
  const url = String(config.url || '')

  // Admin auth (demo)
  if (method === 'post' && url === '/api/admin/login') {
    const body = parseBody(config)
    const email = String(body.email || '').trim().toLowerCase()
    const password = String(body.password || '')
    if (!email) return mockValidation(config, { email: ['Email is required.'] })
    if (password.length < 6) return mockValidation(config, { password: ['Password must be at least 6 characters.'] })
    const ok = email === 'admin@triumph.local' && password === 'password'
    if (!ok) return mockOk(config, { message: 'Invalid credentials.' }, 401)
    lsSet('triumph_admin_token', 'demo-token')
    return mockOk(config, { token: 'demo-token' }, 200)
  }

  // Newsletter
  if (method === 'post' && url === '/api/newsletter') {
    const body = parseBody(config)
    const email = String(body.email || '').trim().toLowerCase()
    if (!email || !email.includes('@')) return mockValidation(config, { email: ['Enter a valid email.'] })
    const list = lsGet<{ id: number; email: string; createdAt: string }[]>('triumph_newsletter', [])
    if (!list.some((x) => x.email === email)) {
      list.unshift({ id: randId(), email, createdAt: nowIso() })
      lsSet('triumph_newsletter', list)
    }
    return mockOk(config, { ok: true }, 201)
  }

  // Contact
  if (method === 'post' && url === '/api/contact') {
    const body = parseBody(config)
    const fullName = String(body.fullName || '').trim()
    const email = String(body.email || '').trim()
    const subject = String(body.subject || '').trim()
    const message = String(body.message || '').trim()
    const errors: Record<string, string[]> = {}
    if (fullName.length < 2) errors.fullName = ['Enter your name.']
    if (!email.includes('@')) errors.email = ['Enter a valid email.']
    if (subject.length < 3) errors.subject = ['Enter a subject.']
    if (message.length < 10) errors.message = ['Message must be at least 10 characters.']
    if (Object.keys(errors).length) return mockValidation(config, errors)
    const list = lsGet<any[]>('triumph_contacts', [])
    list.unshift({ id: randId(), fullName, email, subject, message, createdAt: nowIso() })
    lsSet('triumph_contacts', list)
    return mockOk(config, { ok: true }, 201)
  }

  // Test rides
  if (method === 'post' && url === '/api/test-rides') {
    const body = parseBody(config)
    const fullName = String(body.fullName || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()
    const modelSlug = String(body.modelSlug || '').trim()
    const city = String(body.city || '').trim()
    const preferredDate = String(body.preferredDate || '').trim()
    const message = String(body.message || '').trim()
    const errors: Record<string, string[]> = {}
    if (fullName.length < 2) errors.fullName = ['Enter your full name.']
    if (!email.includes('@')) errors.email = ['Enter a valid email.']
    if (phone.length < 7) errors.phone = ['Enter a valid phone number.']
    if (!modelSlug) errors.modelSlug = ['Select a model.']
    if (city.length < 2) errors.city = ['Enter your city.']
    if (!preferredDate) errors.preferredDate = ['Select a preferred date.']
    if (message.length > 600) errors.message = ['Message is too long.']
    if (Object.keys(errors).length) return mockValidation(config, errors)
    const list = lsGet<any[]>('triumph_test_rides', [])
    list.unshift({
      id: randId(),
      fullName,
      email,
      phone,
      modelSlug,
      city,
      preferredDate,
      message: message || null,
      status: 'new',
      createdAt: nowIso(),
    })
    lsSet('triumph_test_rides', list)
    return mockOk(config, { ok: true }, 201)
  }

  // Admin list test rides
  if (method === 'get' && url === '/api/admin/test-rides') {
    const token = lsGet<string | null>('triumph_admin_token', null)
    if (!token) return mockOk(config, { message: 'Unauthenticated.' }, 401)
    const list = lsGet<any[]>('triumph_test_rides', [])
    return mockOk(config, { data: list }, 200)
  }

  return null
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
  },
})

export type ApiErrorPayload =
  | {
      message?: string
      errors?: Record<string, string[]>
    }
  | undefined

export function getValidationMessages(err: unknown): Record<string, string> {
  if (!axios.isAxiosError(err)) return {}
  const data = err.response?.data as ApiErrorPayload
  const errors = data?.errors || {}
  const out: Record<string, string> = {}
  for (const [field, messages] of Object.entries(errors)) {
    out[field] = (messages || []).filter(Boolean).join(' ')
  }
  return out
}

// If backend isn’t running, seamlessly fall back to a local mock API so the site stays functional.
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (!axios.isAxiosError(error)) throw error
    const cfg = error.config
    const status = error.response?.status
    const isNetwork = !error.response
    const shouldMock = cfg && String(cfg.url || '').startsWith('/api/')
    if (!shouldMock) throw error
    if (!isNetwork && status !== 404) throw error
    const mocked = mockHandler(cfg)
    if (!mocked) throw error
    return mocked
  },
)

