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

### 🛍️ Core POS Functions for a Boutique

#### 1. **Sales & Checkout**
- Barcode scanning or manual item lookup
- Multiple payment methods (cash, card, mobile money, gift cards)
- Split payments and partial payments
- Discount and promo code application
- Receipt generation (print, email, SMS)

#### 2. **Inventory Management**
- Real-time stock tracking
- Low-stock alerts and restock reminders
- Product variants (size, color, style)
- Batch and serial number tracking (for limited editions)
- Supplier management and purchase orders

#### 3. **Customer Relationship Management (CRM)**
- Customer profiles with purchase history
- Loyalty programs and points tracking
- Birthday or VIP offers
- SMS/email marketing integration
- Feedback and review collection

#### 4. **Employee & Role Management**
- Staff login with role-based access
- Sales performance tracking per employee
- Shift scheduling and time tracking
- Commission and incentive tracking

#### 5. **Analytics & Reporting**
- Daily/weekly/monthly sales reports
- Best-selling products and categories
- Profit margins and cost analysis
- Inventory turnover and shrinkage reports
- Customer behavior insights

#### 6. **Boutique-Specific Features**
- Visual product catalog with images
- Appointment booking (for styling or fittings)
- Custom order tracking (e.g., pre-orders, tailoring)
- Gift packaging options
- Tag printing and label customization

#### 7. **Omnichannel & Integration**
- E-commerce sync (Shopify, WooCommerce, etc.)
- Social media selling integration
- Mobile POS for pop-up shops or events
- Integration with accounting tools (QuickBooks, Xero)
- API access for custom extensions

#### 8. **Security & Compliance**
- Secure login and data encryption
- Audit logs and transaction history
- Tax calculation and compliance (e.g., VAT)
- Backup and recovery options

---

### ⚙️ Optional Enhancements
- Dark mode or visual theme toggles for branding
- Offline mode for unstable internet
- QR code-based product lookup or payment
- Multi-location support (if expanding)
- Custom dashboard widgets for boutique KPIs

---

## 🧩 Modular Architecture Overview

### 1. **Sales & Checkout Module**
#### Backend (Hono.js)
- `POST /sales/checkout` – process sale
- `GET /sales/receipt/:id` – fetch receipt
- `POST /sales/apply-discount` – validate and apply promo code

#### Frontend (React + Tailwind)
- `CheckoutPage.tsx` – cart, payment options, discount input
- `ReceiptModal.tsx` – receipt preview (print/email/SMS)
- `DiscountBadge.tsx` – promo code UI

---

### 2. **Inventory Management**
#### Backend
- `GET /inventory` – list products
- `POST /inventory/add` – add new item
- `PATCH /inventory/update/:id` – update stock
- `GET /inventory/low-stock` – alert trigger

#### Frontend
- `InventoryDashboard.tsx` – stock overview
- `ProductForm.tsx` – add/edit product with variants
- `LowStockAlert.tsx` – visual alert component

---

### 3. **Customer Relationship Management (CRM)**
#### Backend
- `GET /customers` – list customers
- `POST /customers/register` – add new customer
- `GET /customers/:id/history` – purchase history
- `POST /customers/send-offer` – trigger SMS/email

#### Frontend
- `CustomerList.tsx` – searchable customer table
- `CustomerProfile.tsx` – history, loyalty points
- `OfferComposer.tsx` – send birthday/VIP offers

---

### 4. **Employee & Role Management**
#### Backend
- `POST /staff/login` – role-based auth
- `GET /staff/performance` – sales metrics
- `POST /staff/clock-in` – shift tracking

#### Frontend
- `LoginPage.tsx` – role-aware login
- `StaffMetrics.tsx` – sales leaderboard
- `ShiftTracker.tsx` – clock-in/out UI

---

### 5. **Analytics & Reporting**
#### Backend
- `GET /reports/sales` – time-based sales
- `GET /reports/products` – top sellers
- `GET /reports/customers` – behavior insights

#### Frontend
- `SalesChart.tsx` – Chart.js line/bar chart
- `ProductTrends.tsx` – bestsellers
- `CustomerInsights.tsx` – loyalty and frequency

---

### 6. **Boutique-Specific Features**
#### Backend
- `POST /orders/custom` – track custom orders
- `GET /appointments` – styling/fitting bookings
- `POST /gift-packaging` – add packaging option

#### Frontend
- `VisualCatalog.tsx` – image-rich product grid
- `BookingPage.tsx` – appointment scheduler
- `GiftWrapSelector.tsx` – toggle packaging options

---

### 7. **Omnichannel & Integration**
#### Backend
- `GET /sync/shopify` – fetch Shopify products
- `POST /sync/social` – push to Instagram/Facebook
- `GET /accounting/export` – QuickBooks/Xero sync

#### Frontend
- `SyncDashboard.tsx` – integration status
- `SocialPush.tsx` – post product to social
- `AccountingExport.tsx` – download reports

---

### 8. **Security & Compliance**
#### Backend
- `POST /auth/login` – secure login
- `GET /audit/logs` – transaction history
- `GET /tax/calculate` – VAT computation

#### Frontend
- `AuditTrail.tsx` – searchable logs
- `TaxSummary.tsx` – VAT breakdown
- `SecureLogin.tsx` – encrypted login UI

---

## 🎯 Demo-Ready Enhancements
- **Visual toggles**: dark mode, frosted overlay, background fit
- **Responsive polish**: Tailwind breakpoints + image fitting
- **Client-facing microsite**: onboarding + live demo
- **Deployment**: Vercel (frontend) + Railway (backend)

