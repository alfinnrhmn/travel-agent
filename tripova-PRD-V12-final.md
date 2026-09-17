# Product Requirements Document (PRD)

## Tripova — Travel Discovery & Package Planning Website

**Version:** 1.2 Final — As-Built Update  
**Updated:** September 17, 2026  
**Product stage:** Frontend prototype / static website  
**Primary stack:** Astro 7, Tailwind CSS 4, TypeScript, Swiper.js

> Dokumen ini menggambarkan kondisi project yang benar-benar sudah diimplementasikan. Fitur yang membutuhkan backend, database, pembayaran, atau layanan AI eksternal ditandai sebagai pengembangan lanjutan.

---

## 1. Product Summary

Tripova adalah website tour & travel bertema editorial-premium yang membantu pengguna menemukan inspirasi destinasi, menyaring paket perjalanan, melihat travel plan secara detail, dan mengirimkan permintaan konsultasi.

Website saat ini dibangun sebagai static frontend dengan data paket lokal berbasis JSON. Fokus versi ini adalah:

1. Menampilkan brand dan layanan Tripova secara konsisten.
2. Membantu pengguna menemukan paket berdasarkan negara, kategori, dan harga.
3. Menjelaskan itinerary, biaya, fasilitas, serta inclusions/exclusions secara transparan.
4. Mengarahkan pengguna menuju form konsultasi atau permintaan paket.
5. Menyediakan prototype AI Trip Planner yang terintegrasi dengan data paket lokal.

### Brand

- **Display name/logo:** `TRIPOVA`
- **Tagline:** `Every Trip Has a Story.`
- Beberapa copy lama masih menggunakan “Tripovia”. Sebelum production, seluruh penyebutan brand harus dinormalisasi menjadi **Tripova** kecuali nama legal perusahaan memang berbeda.

---

## 2. Product Goals

### Primary goals

- Mempermudah eksplorasi paket wisata tanpa membuat user berpindah terlalu banyak halaman.
- Meningkatkan kepercayaan melalui visual perjalanan, testimonial, itinerary, rating, dan informasi biaya.
- Mendorong conversion melalui CTA konsultasi, AI Trip Planner, dan form request package.
- Menyediakan struktur frontend yang siap dihubungkan dengan API dan database.

### Non-goals pada versi frontend saat ini

- Pemrosesan pembayaran.
- Login, akun user, dan penyimpanan profil.
- Ketersediaan jadwal secara real-time.
- Booking confirmation otomatis.
- Admin dashboard atau CMS.
- AI generatif berbasis model/API eksternal.
- Pengiriman form ke CRM, email, atau database.

---

## 3. Target Users

| Persona | Kebutuhan utama | Motivasi |
|---|---|---|
| Solo traveler | Fleksibilitas, keamanan, itinerary jelas | Kebebasan dan eksplorasi |
| Couple | Quality time, privasi, destinasi romantis | Kedekatan dan pengalaman bersama |
| Group | Perencanaan praktis dan aktivitas bersama | Kebersamaan dan efisiensi |
| Honeymoon traveler | Pengalaman personal dan premium | Momen spesial yang berkesan |
| General leisure traveler | Perbandingan harga, tujuan, dan durasi | Kemudahan memilih paket |

---

## 4. Information Architecture & Routes

| Route | Halaman | Status | Fungsi |
|---|---|---|---|
| `/` | Homepage | Implemented | Brand discovery, destinations, featured packages, trust, testimonial, CTA |
| `/about` | About Us | Implemented | Cerita brand, value, statistik, diferensiasi, CTA |
| `/gallery` | Gallery | Implemented | Galeri Solo, Couple, Group, dan Honeymoon |
| `/package` | Package Catalogue | Implemented | Hero destinasi, filter, pagination, AI Trip Planner, daftar 13 paket |
| `/package/destination/[country]` | Destination Packages | Implemented | Daftar paket untuk Italy, Indonesia, atau Japan |
| `/package/[slug]` | Package Detail | Implemented | Travel plan, itinerary, inclusions, cost estimate, form, recommendations |
| `/contact` | Contact | Implemented | Informasi kontak dan form konsultasi |
| `/paket/[slug]` | Legacy Package Detail | Legacy / noindex | Route detail lama; tidak digunakan pada navigasi utama |

### Global navigation

- Home
- About us
- Package
- Gallery
- Contact

Navbar transparan ketika berada di area hero berfoto dan berubah menjadi solid setelah keluar dari hero. Halaman About menggunakan header solid sejak awal.

---

## 5. Primary User Flows

### 5.1 Browse and filter packages

```text
Homepage or Navbar
  → Package Page
  → Select destination card / set sidebar filters
  → Browse paginated results
  → View Details
  → Package Detail
  → Request This Package
```

### 5.2 Destination shortcut

```text
Package Hero
  → Click Indonesia / Italy / Japan card
  → Scroll to Tour Packages
  → Reset category and price range
  → Display packages from the selected country only
```

### 5.3 AI-assisted discovery

```text
Package Sidebar
  → Open AI Trip Planner
  → Enter destination, budget, duration, or travel style
  → Local frontend matching reads package catalogue
  → Display suggested plan and related package cards
  → Open selected package detail
```

### 5.4 Consultation

```text
Homepage CTA / Contact Page / Package Detail
  → Fill form
  → Frontend validation
  → Future: submit to backend/CRM/email
```

---

## 6. Functional Requirements by Page

### 6.1 Homepage

Urutan section yang sudah diimplementasikan:

1. **Hero**
   - Full-screen destination image.
   - Headline: `Every Trip Has a Story. What's Yours?`
   - Supporting copy untuk solo, couple, family, group, dan honeymoon.
   - CTA `Find Your Package`.

2. **Popular Destination**
   - Tiga card: Italy, Indonesia, Japan.
   - Tampilan awal portrait.
   - Hover memperbesar card mendekati rasio 1:1 dan menampilkan overlay detail.
   - Menampilkan nama negara, jumlah package, deskripsi, `Book Now`, dan `Consultation`.
   - Radius card 20px; radius tombol 6px.

3. **Best Travel Package**
   - Empat featured package dari `packages.json`.
   - Filter: All, City, Beach, Mountain, Adventure.
   - Card: image, name, location, divider, duration/rating, divider, price/per person, full-width `View Details`.

4. **Every Detail, Planned Around Your Story**
   - Foto portrait `People.jpg` dan foto landscape `Team.jpg` dengan play overlay.
   - Timeline untuk Custom Travel Plans, Trusted Local Guides, dan Easy Booking.
   - Heading dua warna dan responsive layout.

5. **What Traveller Say**
   - Focus carousel berbasis Swiper.
   - Lima slide; sebagian merupakan duplikasi untuk menjaga loop.
   - Active card lebih besar; card lain lebih kecil/redup.
   - Mendukung drag, swipe, pagination, dan loop tanpa slide terpotong.

6. **Consultation CTA**
   - Background image dengan overlay.
   - Heading, supporting copy, rating 4.9/5, dan form.
   - CTA tersambung secara visual ke footer melalui gradasi hijau.

7. **Footer**
   - Brand, address, Explore links, Support links, dan social icons.
   - Background primary `#50635F` dan watermark `TRIPOVA`.

### 6.2 Package Catalogue

#### Hero

- Background hero berubah mengikuti active destination.
- Tiga hero cards: **Indonesia, Italy, Japan**.
- UAE tetap tersedia pada katalog/filter, tetapi tidak menjadi hero card.
- Prev/next hanya mengubah featured destination.
- Klik card mengaktifkan country filter dan scroll ke katalog.

#### Catalogue and filtering

- Total data saat ini: **13 packages**.
- Maksimal **8 products per page**.
- Pagination rata tengah dengan previous/next arrows.
- Filter sidebar:
  - Price range.
  - Destination: Indonesia, Italy, Japan, UAE.
  - Reset filters.
- Filter di atas products: All, City, Beach, Mountain, Adventure.
- Seluruh filter dan pagination bekerja bersama di browser.
- Empty state muncul jika tidak ada package yang cocok.

#### AI Trip Planner

- Dibuka dari sidebar.
- Dialog sekitar setengah viewport desktop.
- Dapat dipindahkan dan di-resize.
- Backdrop memakai blur ringan; chat box tidak memakai green shadow.
- Memahami keyword frontend untuk:
  - Country: Indonesia/Bali, Italy/Rome, Japan/Tokyo, UAE/Dubai.
  - Category: City, Beach, Mountain, Adventure.
  - Budget dan requested duration.
- Menghasilkan draft itinerary dan maksimal tiga related packages.
- Related card membuka `/package/[slug]`.

> **Batasan:** AI saat ini bukan model generatif. Matching dilakukan di frontend terhadap JSON lokal. Event `tripova:ai-plan-request` tersedia sebagai integration hook untuk backend/API berikutnya.

### 6.3 Package Detail

Package detail mengikuti format travel plan presentation, bukan layout booking-sidebar lama.

Section:

1. Full-width package hero.
2. Intro dan package description.
3. `Trip at a Glance`.
4. `Package Information`.
5. `Schedule Table` berdasarkan itinerary.
6. `Stay & Experience` dengan gallery.
7. Included list memakai checklist hijau.
8. Not Included list memakai icon X merah.
9. `Estimated Travel Costs`.
10. Request package form.
11. `You May Also Like` dengan tiga cards.

Form request package hanya menyediakan UI dan native frontend validation. Submission endpoint belum tersedia.

### 6.4 Gallery

- Hero editorial dengan CTA menuju section pertama.
- Sticky category navigation.
- Empat section: Solo, Couple, Group, dan Honeymoon.
- Grid menggabungkan landscape, portrait, dan square images.
- Semua cards memakai rounded corners sesuai tema.
- Sebagian image memiliki video play indicator.
- Standalone testimonial dihapus; traveller quote tetap berada di dalam image composition.

### 6.5 About Us

- Header solid putih.
- Hero minimalis dengan main image dan title di sampingnya.
- Section Meet Tripova, Our Story, stats, values, dan differentiators.
- CTA menggunakan bentuk container yang konsisten dengan Homepage.
- CTA lebih pendek dan memakai transisi gradasi hijau menuju footer.

### 6.6 Contact

- Hero image dengan heading dan supporting copy.
- Address, phone, dan email.
- Contact form konsisten dengan tema Homepage.
- Form masih frontend-only.

---

## 7. Package Data Model

Data berada di:

- `src/data/packages.json`: empat featured packages yang dapat muncul di Homepage.
- `src/data/package-page-products.json`: sembilan package tambahan khusus katalog.
- `src/data/destinations.ts`: metadata destination pages.

| Field | Type | Required | Purpose |
|---|---|---:|---|
| `slug` | string | Yes | URL identifier |
| `name` | string | Yes | Package name |
| `location` | string | Yes | Destination label |
| `category` | enum | Yes | City / Beach / Mountain / Adventure |
| `rating` | number | Yes | Rating value |
| `reviewCount` | number | Yes | Total reviews |
| `duration` | string | Yes | Example: `5 Days / 4 Nights` |
| `price` | number | Yes | Price per person in USD |
| `badge` | string | No | Example: Best Seller |
| `image` | string | Yes | Main asset filename |
| `gallery` | string[] | Yes | Detail image filenames |
| `description` | string | Yes | Package summary |
| `itinerary` | object[] | Yes | Day and activities |
| `included` | string[] | Yes | Included services |
| `notIncluded` | string[] | Yes | Excluded services |

Current countries: Indonesia, Italy, Japan, UAE.

---

## 8. Design System

### Typography

| Role | Font |
|---|---|
| Heading, section title, brand | Caudex, serif |
| Body, navigation, form, button | Open Sans, sans-serif |

### Core colors

| Role | Value |
|---|---|
| Primary | `#50635F` |
| Primary dark | `#334541` |
| Heading text | `#2C2C2A` |
| Muted heading | `#919191` |
| Secondary text | `#7D7D7D` / `#929292` |
| Background | `#FFFFFF` |
| Soft surface | `#F1F5F9` |
| Rating star | `#FC9E1B` |
| Included | Green |
| Excluded | Red |

### Shape and layout

- Large media radius: 20–43px tergantung konteks.
- Package cards: 20px.
- Small buttons: 6–8px.
- Photography menjadi focal point dengan aspect ratio yang sengaja bervariasi.
- Homepage section spacing sekitar 144px pada desktop, kecuali transisi CTA-footer.

---

## 9. Shared Components

| Component | Responsibility |
|---|---|
| `Layout.astro` | Global head, SEO metadata, fonts, global styles |
| `Navbar.astro` | Transparent/solid states dan mobile navigation |
| `HeroSection.astro` | Homepage hero |
| `PopularDestination.astro` | Destination hover cards |
| `BestTravelPackage.astro` | Homepage filter dan featured cards |
| `PackageCard.astro` | Reusable compact product card |
| `EveryDetailSection.astro` | Service value/timeline |
| `Testimonial.astro` | Swiper focus carousel |
| `ContactForm.astro` | Homepage CTA dan form |
| `PackageListingHero.astro` | Interactive Package hero |
| `Footer.astro` | Shared footer |

---

## 10. Responsive & Interaction Requirements

- Desktop, tablet, dan mobile tidak boleh menghasilkan horizontal overflow.
- Product card tidak boleh tertarik melebar ketika hasil filter sedikit.
- Hero images memakai `object-fit: cover` dengan overlay yang tetap terbaca.
- Hover content tetap dapat diakses melalui keyboard focus jika relevan.
- Carousel mendukung drag, swipe, pagination, dan reduced motion.
- AI dialog tetap berada dalam viewport setelah drag/resize.
- Navigation tetap terbaca di atas hero maupun di area solid.

---

## 11. Accessibility Requirements

Current implementation includes:

- Semantic landmarks dan heading hierarchy.
- Alt text untuk meaningful images.
- ARIA labels untuk controls, pagination, ratings, dan navigation groups.
- Labels dan required attributes pada form.
- Keyboard-focusable links dan buttons.
- Semantic red/green distinction untuk excluded/included items.
- Reduced-motion handling pada animated sections tertentu.

Sebelum production, jalankan Lighthouse dan keyboard-only testing pada setiap primary route.

---

## 12. SEO Requirements

Implemented melalui `Layout.astro`:

- Unique page titles.
- Meta descriptions.
- Robots directives.
- Open Graph dan Twitter metadata.
- Theme color dan author.
- JSON-LD `WebPage`.
- English document language.
- Legacy `/paket/*` pages menggunakan `noindex`.

Current build menghasilkan 25 HTML pages dan tidak ada halaman yang kehilangan meta description.

### Production action item

Set final production `site` URL pada Astro configuration ketika domain Cloudflare/custom domain sudah tetap. Ini diperlukan untuk absolute canonical URL dan absolute social preview image URL.

---

## 13. Technical Architecture

- **Framework:** Astro 7.
- **Rendering:** Static site generation.
- **Styling:** Tailwind CSS 4 dan scoped Astro CSS.
- **Interactivity:** Browser TypeScript/JavaScript.
- **Carousel:** Swiper.js.
- **Images:** Astro Assets optimization.
- **Content:** Local JSON dan TypeScript.
- **Deployment:** Static hosting seperti Cloudflare Pages.

```bash
npm install
npm run dev
npm run build
npm run preview
```

Production output berada di `dist/` dan tidak di-commit ke Git.

---

## 14. Backend Integration Plan

Recommended next phase:

1. Pindahkan package data ke CMS/database.
2. Buat catalogue API untuk filter country/category/price.
3. Hubungkan AI Trip Planner ke server endpoint yang aman.
4. Ground AI responses pada availability dan live pricing.
5. Hubungkan contact/booking forms ke CRM, email, atau database.
6. Tambahkan spam protection, server validation, rate limiting, dan consent.
7. Tambahkan availability, booking status, dan payment flow.
8. Tambahkan analytics events untuk filter, detail view, AI prompt, dan conversion.

Backend tidak boleh mengekspos AI provider key atau database credential pada client-side code.

---

## 15. Success Metrics

- Package catalogue → detail click-through rate.
- Destination card → filtered catalogue engagement.
- Filter usage berdasarkan country, category, dan price.
- Pagination engagement.
- AI Planner open rate dan related-package click rate.
- Package detail → request form conversion.
- Homepage/contact form completion rate.
- Organic sessions per landing page.
- Lighthouse performance, accessibility, best-practices, dan SEO scores.

---

## 16. Release Acceptance Criteria

- `npm run build` selesai tanpa error.
- Semua primary navigation links valid.
- Semua 13 package cards menuju detail route yang valid.
- Combined filters tidak merusak grid.
- Pagination maksimal delapan products per page.
- Klik hero destination hanya menampilkan package negara tersebut.
- AI planner mengembalikan local plan dan related cards.
- Forms memberikan native validation yang benar.
- Tidak ada primary route tanpa title, meta description, atau H1.
- Tidak ada unintended horizontal overflow.
- Legacy routes tidak muncul di primary navigation dan tetap `noindex`.

---

## 17. Known Limitations

- Forms belum mengirim ke backend.
- AI planner masih local matching.
- Pricing dan availability masih statis.
- Footer policy links masih placeholder.
- Social links masih placeholder.
- Address dan contact details harus dikonfirmasi.
- Permanent domain belum dikonfigurasi untuk canonical/social image URL.

---

## 18. Source of Truth

Jika PRD dan implementasi berbeda, gunakan prioritas berikut:

1. Current approved product/design decision.
2. Current source code dan data di `src/`.
3. PRD ini.
4. Older Figma snippets atau archived mockups.

Perubahan fitur berikutnya harus memperbarui implementasi dan PRD dalam pull request yang sama.
