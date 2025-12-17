## TAP — True American Pets

Senior-ready reference implementation of a Next.js App Router storefront wired to Shopify, MDX stories, Hall of Heroes UGC, and prelaunch tooling.

### Brand Assets

- Official logos from the TAP delivery kit live in `public/brand/` (e.g., `logo-main.svg`). Swap variants per background (white for dark, full-color for light) without editing the component tree.
- Brand fonts are bundled via `next/font/local`:
  - `public/fonts/Montserrat-VariableFont_wght.ttf` (+ italic) for body copy.
  - `public/fonts/MuseoModerno-VariableFont_wght.ttf` (+ italic) for headings and mission accents.
  These are wired in `app/layout.tsx` and surfaced through CSS variables in `app/globals.css`.

### Shopify Storefront Setup

1. Create a Storefront API app inside Shopify admin and copy the domain + Storefront access token.
2. Configure the variables listed in `.env.example`:
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `SHOPIFY_API_VERSION`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_PRELAUNCH`
   - `NEXT_PUBLIC_GA4_ID`
   - `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
3. The app falls back to mock data if the Shopify env vars are missing so local dev still works.

### Metafields Namespace

All filters and PDP logic assume the `tap` namespace with these keys:

| Key         | Purpose                              |
| ----------- | ------------------------------------- |
| `material`  | Display material (e.g., CORDURA)      |
| `use_case`  | Mission type / category               |
| `durability`| Testing status                        |
| `reflective`| Boolean flag for reflective gear      |
| `made_in`   | Origin country                        |
| `cause`     | Impact cause or campaign name         |
| `preorder`  | `true` to enable preorder messaging   |

### Prelaunch Mode

Set `NEXT_PUBLIC_PRELAUNCH=true` to enable:

- Global banner "Drops April 10 — Join Hero Alerts…"
- PDP "Notify Me" lead form replacement for Add-to-Cart
- Preorder badges sourced from metafields

Switch back to `false` for normal behavior.

### Running Locally

```bash
npm install
npm run dev
```

Quality gate commands:

```bash
npm run lint
npm run typecheck
npm run build
```

### Content & CMS

- Stories live in `/content/stories/*.mdx` using the default flow. Add more files with frontmatter to expand the blog.
- Hall of Heroes uses `/content/heroes.json` for seed data plus an in-memory API route. Swap in a database when ready without breaking local dev.

### Deployment

1. Push to GitHub and connect the repo to Vercel.
2. Set the env vars from `.env.example` in the Vercel dashboard.
3. Deploy; the `app/robots.ts` and `app/sitemap.ts` endpoints automatically include the configured `NEXT_PUBLIC_SITE_URL`.
