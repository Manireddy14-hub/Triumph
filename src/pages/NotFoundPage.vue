<template>
  <section class="container-page py-16">
    <div class="card p-10">
      <p class="text-xs font-semibold tracking-[0.25em] text-white/50">404</p>
      <p class="mt-3 text-2xl font-black">Page not found</p>
      <p class="mt-2 text-sm text-white/60">The page you’re looking for doesn’t exist.</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/" class="btn-primary">Go home</RouterLink>
        <RouterLink to="/models" class="btn-ghost">Browse models</RouterLink>
      </div>
    </div>
  </section>
</template>

