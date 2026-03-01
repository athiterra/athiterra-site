# AthiTerra Website — Maintenance Guide

## Quick Reference

| What you want to do | Where to edit |
|---|---|
| Change phone, email, WhatsApp | `components.js` → `SITE` object |
| Add/remove nav links | `components.js` → `NAV_LINKS` array |
| Add a product to footer | `components.js` → `PRODUCT_LINKS` array |
| Change social media links | `components.js` → `SITE.facebook`, `SITE.instagram` |
| Change copyright year | `components.js` → `SITE.copyright` |
| Change logo | Replace `images/image_01.webp` (nav) and `images/image_09.webp` (footer) |
| Edit a page's content | Edit that page's HTML directly |
| Change colours/fonts/layout | `styles.css` |
| Change form behaviour | `script.js` |
| Add a new product page | See "How to Add a New Product" below |
| Add a new generic page | See "How to Add a New Page" below |

---

## File Structure

```
athiterra.com/
│
├── index.html                        ← Homepage
├── about.html                        ← About Us
├── products.html                     ← Products listing page
├── quality.html                      ← Quality Standards
├── contact.html                      ← Contact + form
│
├── product-whole-gherkins.html       ← Product detail page
├── product-sliced-gherkins.html      ← Product detail page
├── product-diced-gherkins.html       ← Product detail page
├── product-gherkin-relish.html       ← Product detail page
├── product-bulk-packs.html           ← Product detail page
├── product-custom-solutions.html     ← Product detail page
│
├── components.js        ⭐ SHARED — nav, footer, WhatsApp, QR (edit this!)
├── script.js               ← Page behaviour (scroll effects, contact form)
├── styles.css              ← All styling
│
├── sitemap.xml             ← For Google (update when adding pages)
├── robots.txt              ← Crawler rules
│
├── _templates/             ← Copy these to make new pages
│   ├── TEMPLATE-product-page.html
│   └── TEMPLATE-generic-page.html
│
└── images/
    ├── image_01.webp       ← Logo (nav)
    ├── image_02.webp       ← Hero image
    ├── image_03.webp       ← About (gherkin flower)
    ├── image_04.webp       ← Whole gherkins
    ├── image_05.webp       ← Sliced gherkins
    ├── image_06.webp       ← Gherkin relish
    ├── image_09.webp       ← Logo (footer)
    ├── diced-gherkins.webp
    ├── athiterra-bulk-packaging.webp
    └── custom-solutions.webp
```

---

## How the Shared Components Work

Every page has these 3 placeholder tags:

```html
<nav id="site-nav"></nav>           ← Nav gets injected here
<footer id="site-footer"></footer>  ← Footer gets injected here
<div id="site-whatsapp"></div>      ← WhatsApp button injected here
```

`components.js` fills them automatically on page load. So you **never edit nav or footer inside individual HTML files** — you only edit `components.js`.

---

## How to Add a New Product

### Step 1: Create the page
1. Copy `_templates/TEMPLATE-product-page.html`
2. Rename it: `product-your-product-name.html`
3. Find-and-replace all `{{PLACEHOLDERS}}` with your content
4. Add your product image to `/images` folder (use .webp format)

### Step 2: Register it in components.js
Open `components.js` and add a line to `PRODUCT_LINKS`:

```javascript
const PRODUCT_LINKS = [
  { label: "Whole Gherkins",  href: "product-whole-gherkins.html" },
  { label: "Sliced Gherkins", href: "product-sliced-gherkins.html" },
  // ... existing products ...
  { label: "Your New Product", href: "product-your-product-name.html" },  // ← ADD THIS
];
```

### Step 3: Add card on products.html
Open `products.html` and add a card inside `<div class="products-grid">`:

```html
<a href="product-your-product-name.html" class="product-card reveal" style="text-decoration:none;color:inherit;">
  <div class="product-img">
    <img src="images/your-image.webp" alt="Your Product — AthiTerra" width="400" height="200" loading="lazy"/>
  </div>
  <div class="product-body">
    <h3>Your New Product</h3>
    <p>Short description of the product for the card.</p>
    <span class="product-link">Learn More &#8594;</span>
  </div>
</a>
```

### Step 4: Add to sitemap.xml
Add this inside `<urlset>`:

```xml
<url>
  <loc>https://www.athiterra.com/product-your-product-name.html</loc>
  <lastmod>2025-03-01</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Step 5: Push to GitHub
Cloudflare deploys automatically.

---

## How to Add a New Page (non-product)

### Step 1: Create the page
1. Copy `_templates/TEMPLATE-generic-page.html`
2. Rename it: `your-page.html`
3. Replace all `{{PLACEHOLDERS}}` with your content
4. Uncomment the section blocks you need, delete the ones you don't

### Step 2: Add to nav (optional)
If you want it in the navigation, open `components.js` and add to `NAV_LINKS`:

```javascript
const NAV_LINKS = [
  { label: "Home",     href: "index.html",    id: "home" },
  // ... existing links ...
  { label: "Blog",     href: "blog.html",     id: "blog" },  // ← ADD THIS
  { label: "Contact",  href: "contact.html",  id: "contact", isButton: true }
];
```

Note: The last item with `isButton: true` always appears as the green button.

### Step 3: Add to sitemap.xml
Same as product pages — add a `<url>` entry.

---

## Editing components.js — Examples

### Change phone number
```javascript
const SITE = {
  phone: "+1 555 123 4567",        // ← displayed text
  phoneTel: "+15551234567",         // ← tel: link format
```

### Change email
```javascript
  email: "hello@athiterra.com",
```

### Change WhatsApp number
```javascript
  whatsapp: "14791234567",          // ← country code + number, no +
```

### Add LinkedIn to social
In the `renderFooter` function, find the social section and add:

```javascript
<a href="https://www.linkedin.com/company/athiterra" target="_blank" rel="noopener" title="LinkedIn">in</a>
```

---

## SEO Checklist for Every New Page

Before publishing any new page, confirm it has:

- [ ] Unique `<title>` tag (50-60 characters)
- [ ] Unique `<meta name="description">` (150-160 characters)
- [ ] `<link rel="canonical">` with full URL
- [ ] `<link rel="alternate" hreflang="en">` with full URL
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags
- [ ] Schema JSON-LD (Product, WebPage, etc.)
- [ ] Breadcrumb schema JSON-LD
- [ ] Exactly ONE `<h1>` tag
- [ ] `<meta name="robots" content="index, follow">`
- [ ] Images have descriptive `alt` text
- [ ] Image format is .webp
- [ ] Added to `sitemap.xml`
- [ ] If product: added to `PRODUCT_LINKS` in `components.js`
- [ ] If product: card added on `products.html`

---

## Image Guidelines

- **Format**: Always use `.webp` (smaller files, faster loading)
- **Naming**: Use descriptive names like `diced-gherkins.webp`, not `IMG_001.webp`
- **Size**: Keep under 200KB per image. Use https://squoosh.app to compress
- **Dimensions**: Product images work best at 800x400px or similar 2:1 ratio
- **Alt text**: Always descriptive — "Diced gherkins in glass jars — AthiTerra export"

---

## Deployment

1. Push changes to GitHub
2. Cloudflare Pages auto-deploys (usually within 1-2 minutes)
3. Verify at https://www.athiterra.com

---

## Support

Domain: www.athiterra.com
Hosting: Cloudflare Pages via GitHub
Form backend: Formspree (https://formspree.io)
