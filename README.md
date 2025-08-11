
# Rekaz Field PWA (Next.js + TypeScript)

**Single-user, offline-first** PWA for field records in two contexts: **Oman Oil (WO)** and **NAMA (WNSC)**.

## Features

- App Router (Next.js 14) + TypeScript
- **No seed/demo data**; forms are blank by default. No auto dates.
- Offline-first via **next-pwa** (Workbox). Fallback: `/offline`.
- IndexedDB via **Dexie** for records and photo assets.
- Charts: Recharts (handle empty data gracefully).
- Exports: CSV (header-only when empty), simple PDF monthly summary.
- iOS A2HS + manifest, icons, iOS meta tags.
- RTL Arabic default + English toggle.
- Theming: Oman Oil (blue) and NAMA (red).
- CI (GitHub Actions): lint + build only.
- Vercel-ready: `next.config.js`, `vercel.json`.

## Data Model

Unified type with two variants:

- **WO (Oman Oil)**: `refNumber!`, `date!`, `status: Open|WaitForApproval|Approved|Completed`, `description?`, `photosBefore/After?`
- **WNSC (NAMA)**: `refNumber!`, `startDate!`, `endDate?` → auto `durationDays` when both exist, `notes?`

Durations use **calendar days** in **Asia/Muscat**.

## Getting Started

```bash
npm i
npm run dev
```

Build and run:

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this folder to a GitHub repo (root-level Next.js project).
2. Import in Vercel → Project Settings (defaults).
3. First visit must be online to install the service worker. After that, works offline.

## A11y and Empty States

- Dashboard KPIs default to `0` or `—`.
- Charts show **"No data yet"** when empty.
- CSV export returns **header row only** when there are no records.
- PDF monthly summary shows a minimal page with headers + "No data".

## Assumptions

- Photos are stored as Blob assets in IndexedDB; basic UI hooks can be added later.
- PDF/PNG export are minimal and client-side only.
- No server routes are required (single-user, local storage only).

