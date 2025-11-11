```
npm install
npm run dev
```

```
open http://localhost:3000
```
## 📁 `backend/README.md`

```md
# Royal Gibs Boutique — Backend

This is the backend API for Royal Gibs Boutique's POS and dashboard system, built with Hono.js and Prisma ORM. It powers product management, customer profiles, sales tracking, analytics, and offline sync.

## 🏗️ Folder Structure

```
src/
├── routes/           # API endpoints
│   ├── products.ts
│   ├── categories.ts
│   ├── customers.ts
│   ├── sales.ts
│   └── dashboard.ts
├── controllers/      # Request handlers
├── services/         # Business logic
├── middleware/       # Auth & role guards
├── db/               # Prisma schema & client
└── index.ts          # App entry point
```

## 🚀 Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Setup `.env` with database and email credentials
4. Generate Prisma client: `npx prisma generate`
5. Seed data: `npx prisma db seed`
6. Start server: `npm run dev`

## 🔌 API Endpoints

| Route         | Method | Description                  |
|---------------|--------|------------------------------|
| `/products`   | GET/POST | List or create products     |
| `/categories` | GET/POST | Manage style categories     |
| `/customers`  | GET/POST | Customer profiles           |
| `/sales`      | GET/POST | Record and view sales       |
| `/dashboard`  | GET      | Analytics overview          |
| `/promos`     | GET/POST | Promo code validation       |

## 🧠 Flow of Creation

- Modular routes → Controllers → Services → Prisma
- Each feature (e.g. POS, dashboard, loyalty) is isolated for scalability
- Offline sales stored in IndexedDB and synced via background jobs
- Email receipts sent via Nodemailer
- Promo codes and referrals tracked via schema extensions

## 🛠️ Tech Stack

- Hono.js (API framework)
- Prisma ORM + SQL Server
- Nodemailer (email receipts)
- IndexedDB (offline sync)
- JWT-ready middleware (optional)

```
## files structure 
backend/
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed script for initial data
├── src/
│   ├── index.ts              # App entry point
│   ├── db/
│   │   └── prisma.ts         # Prisma client setup
│   ├── routes/
│   │   ├── products.ts       # Product endpoints
│   │   ├── categories.ts     # Category endpoints
│   │   ├── customers.ts      # Customer endpoints
│   │   ├── sales.ts          # Sales endpoints
│   │   ├── dashboard.ts      # Analytics endpoints
│   │   └── promos.ts         # Promo code endpoints
│   ├── controllers/
│   │   ├── productController.ts
│   │   ├── categoryController.ts
│   │   ├── customerController.ts
│   │   ├── saleController.ts
│   │   ├── dashboardController.ts
│   │   └── promoController.ts
│   ├── services/
│   │   ├── productService.ts
│   │   ├── categoryService.ts
│   │   ├── customerService.ts
│   │   ├── saleService.ts
│   │   ├── dashboardService.ts
│   │   └── promoService.ts
│   ├── middleware/
│   │   ├── auth.ts           # JWT auth (optional)
│   │   └── roleGuard.ts      # Role-based access (optional)
│   └── utils/
│       └── emailService.ts   # Nodemailer receipt sender
├── .env                      # Environment variables
├── tsconfig.json
└── README.md                 # Backend documentation
---

