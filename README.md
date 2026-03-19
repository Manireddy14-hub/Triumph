A modern single-page Triumph motorcycles website built with Vue 3 (Vite).  
Browse 10 bike models, see details, compare specs, and submit test-ride / contact forms.

## Project Structure
- `frontend/`
  - `src/`
    - `App.vue` – Shell layout (navbar, footer, routing outlet)
    - `main.ts` – App bootstrap, router + Pinia
    - `router/` – Route definitions (`home`, `models`, `model detail`, `compare`, `book test ride`, `contact`, `admin`)
    - `data/models.ts` – Definitions for the 10 bike models and their specs
    - `pages/`
      - `HomePage.vue` – Hero, featured models, newsletter form
      - `ModelsPage.vue` – All models with search, filters, and compare toggles
      - `ModelDetailPage.vue` – Individual bike detail, specs, gallery, compare actions
      - `ComparePage.vue` – Side‑by‑side comparison for up to 3 bikes
      - `BookTestRidePage.vue` – Test‑ride booking form with validation
      - `ContactPage.vue` – Contact form with validation
      - `admin/` – Simple login and dashboard listing test‑ride requests (mocked)
    - `stores/compare.ts` – Compare list (add/remove up to 3 bikes)
    - `lib/api.ts` – Axios instance + mock API and validation helpers
    - `style.css` – Global Tailwind layers + custom component styles
  - `public/`
    - `brand/` – Logo + favicon (Triumph‑style placeholders)
    - `bikes/real/` – 10 bike images mapped to the 10 models
    - `hero/` – Home hero background image

## Features
- **Branding**
  - Triumph‑style logo in navbar and favicon
  - Dark, premium UI with accent color and gradients
- **Models & details**
  - 10 bike models with category, price, power, torque, weight, and seat height
  - Detail page with hero image, key specs, and highlights
- **Search & filtering**
  - Search by name, category, or engine size
  - Filter by category
  - Sort by recommended / price low–high / high–low
- **Compare**
  - Add/remove bikes to a compare list (max 3)
  - Compare core specs side‑by‑side
- **Forms with validation**
  - Newsletter signup (email validation)
  - Contact form (name, email, subject, message)
  - Test‑ride booking (name, email, phone, model, city, date, message)
  - All forms validated on the client with Zod and again by the mock API
- **Admin demo**
  - Admin login screen (email + password)
  - Dashboard listing test‑ride requests from the mock API
- **Mock backend**
  - Axios interceptor watches `/api/...` requests
  - If no real backend responds, it:
    - Validates data in JS
    - Stores records in `localStorage`
    - Returns responses that look like a real Laravel API
**Live Url
**https://your-site.vercel.app
