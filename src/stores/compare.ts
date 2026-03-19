import { defineStore } from 'pinia'

export const useCompareStore = defineStore('compare', {
  state: () => ({
    slugs: [] as string[],
  }),
  getters: {
    count: (s) => s.slugs.length,
    has: (s) => (slug: string) => s.slugs.includes(slug),
  },
  actions: {
    toggle(slug: string) {
      if (this.slugs.includes(slug)) {
        this.slugs = this.slugs.filter((s) => s !== slug)
        return
      }
      if (this.slugs.length >= 3) return
      this.slugs.push(slug)
    },
    remove(slug: string) {
      this.slugs = this.slugs.filter((s) => s !== slug)
    },
    clear() {
      this.slugs = []
    },
  },
})

