# Pro Devs Ltd. – React SPA

A **React + Vite** single-page application that consumes the **Laravel** backend via JSON APIs.

---

## Project Structure

```
prodevsltd.com/
├── frontEnd/               # Original Blade templates (preserved for reference)
├── public/
│   └── assets/             # CSS, JS and image assets served statically
├── src/
│   ├── api/
│   │   └── client.js       # API client (uses VITE_API_BASE_URL)
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx      # Includes newsletter subscription form
│   │   ├── Hero.jsx
│   │   └── SocialButton.jsx
│   ├── layouts/
│   │   └── AppLayout.jsx   # Shared layout (Header + Footer + SocialButton)
│   ├── pages/              # One file per route
│   │   ├── Home.jsx
│   │   ├── AboutUs.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogDetails.jsx
│   │   ├── Career.jsx
│   │   ├── CareerDetails.jsx
│   │   ├── Checkout.jsx
│   │   ├── ContactUs.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderConfirm.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── Projects.jsx
│   │   ├── ServiceDetails.jsx
│   │   ├── Team.jsx
│   │   └── TermsAndConditions.jsx
│   ├── App.jsx             # Route definitions (react-router-dom v7)
│   ├── App.css             # React-specific styles
│   └── main.jsx            # Entry point
├── index.html              # SPA shell
├── vite.config.js
├── .env.example
└── package.json
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set `VITE_API_BASE_URL` to point to your Laravel backend:

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `/api/v1` | Laravel API base path. Use a full URL (e.g. `http://localhost:8000/api/v1`) when the backend runs on a different port/host. |
| `VITE_RECAPTCHA_SITE_KEY` | *(empty)* | Google reCAPTCHA v3 site key for forms. |
| `VITE_GA_ID` | `G-LLVF13CFL1` | Google Analytics measurement ID. |

### 3. Run the development server

```bash
npm run dev
```

The SPA is served at `http://localhost:5173` by default.

> **Tip:** make sure the Laravel backend is also running and that `VITE_API_BASE_URL` points to it. If you run both on the same host with Laravel's `php artisan serve` (port 8000), set:
> ```
> VITE_API_BASE_URL=http://localhost:8000/api/v1
> ```

### 4. Build for production

```bash
npm run build
```

Output goes to `dist/`. Serve the `dist/index.html` as the SPA entry point from your web server or Laravel's `public/` folder.

### 5. Preview the production build

```bash
npm run preview
```

---

## Laravel Integration

### API routes
All API endpoints must be registered under `/api/*` in `routes/api.php`. Example endpoints expected by the SPA:

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/setting` | Site settings |
| GET | `/api/v1/slider` | Hero sliders |
| GET | `/api/v1/services` | Services list |
| GET | `/api/v1/service/{slug}` | Service details |
| GET | `/api/v1/projects` | Projects (supports `?page=N`) |
| GET | `/api/v1/testimonials` | Testimonials |
| GET | `/api/v1/clients` | Clients |
| GET | `/api/v1/team` | Team members |
| GET | `/api/v1/blogs` | Blog list |
| GET | `/api/v1/blog/{slug}` | Blog details |
| GET | `/api/v1/careers` | Career listings |
| GET | `/api/v1/career/{slug}` | Career details |
| GET | `/api/v1/categories` | Product categories |
| GET | `/api/v1/products/{categorySlug}` | Products by category |
| GET | `/api/v1/product/{slug}` | Product details |
| GET | `/api/v1/page-settings` | About / Privacy / T&C content |
| GET | `/api/v1/checkout/{planSlug}` | Checkout plan |
| POST | `/api/v1/contact` | Contact form |
| POST | `/api/v1/newsletter` | Newsletter subscription |
| POST | `/api/v1/order` | Place order |

### Catch-all route for client-side routing

Add this **after** all API routes in `routes/web.php` so Laravel serves the SPA shell for every non-API URL:

```php
// routes/web.php
Route::get('/{any}', function () {
    return view('spa'); // or return the index.html content
})->where('any', '^(?!api).*$');
```

Or if you copy `dist/index.html` into `public/index.html`, configure your web server (Nginx/Apache) to fall back to `index.html` for all non-API paths.

---

## Linting

```bash
npm run lint
```

