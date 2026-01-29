# Powell's Antique Shop - Technical Architecture

## 📐 System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Homepage   │  │   Products   │  │    Admin     │     │
│  │    (SSR)     │  │    (SSR)     │  │    Panel     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   NUXT 3 APPLICATION                         │
│  ┌────────────────────────────────────────────────────┐    │
│  │              FRONTEND (Vue 3 + SSR)                 │    │
│  │  • Pages (File-based routing)                      │    │
│  │  • Components (Reusable UI)                        │    │
│  │  • Layouts (Default, Admin)                        │    │
│  │  • Pinia Stores (State Management)                 │    │
│  └────────────────────────────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │           NUXT SERVER (Nitro Engine)                │    │
│  │  • API Routes (RESTful endpoints)                  │    │
│  │  • Server Middleware                               │    │
│  │  • Authentication Logic                            │    │
│  └────────────────────────────────────────────────────┘    │
└────────────────────────┬────────────────────────────────────┘
                         │ Prisma ORM
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              POSTGRESQL DATABASE                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Products │ │Categories│ │  Orders  │ │  Admins  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Layer-by-Layer Breakdown

### 1. Frontend Layer (Client-Side)

**Technology:** Vue 3 + Composition API + TypeScript

**Responsibilities:**
- Render UI components
- Handle user interactions
- Manage client-side state (shopping cart)
- Form validation
- Responsive design

**Key Features:**
- Server-Side Rendering (SSR) for SEO
- Client-side hydration for interactivity
- Mobile-first responsive design
- Optimized images with lazy loading

**File Structure:**
```
pages/
├── index.vue                 # Homepage (SSR)
├── products/
│   ├── index.vue            # Product listing (SSR)
│   └── [slug].vue           # Product detail (SSR)
├── cart.vue                 # Shopping cart
├── checkout.vue             # Checkout form
├── order-confirmation.vue   # Order success page
├── about.vue                # About page
├── contact.vue              # Contact page
└── admin/                   # Admin section
    ├── index.vue            # Dashboard
    ├── login.vue            # Admin login
    ├── products/
    ├── orders/
    └── categories/

layouts/
├── default.vue              # Customer layout (header, footer)
└── admin.vue                # Admin layout (sidebar, header)

components/
├── ProductCard.vue
├── ProductGallery.vue
├── CartItem.vue
├── FilterSidebar.vue
└── admin/
    ├── ProductForm.vue
    ├── OrderTable.vue
    └── StatusBadge.vue
```

---

### 2. API Layer (Server-Side)

**Technology:** Nuxt Server Routes (Nitro) + Prisma

**Responsibilities:**
- Handle HTTP requests
- Business logic
- Data validation (Zod)
- Authentication & authorization
- Database operations via Prisma

**RESTful API Endpoints:**

#### Public Endpoints (No Auth Required)
```
GET    /api/products              # List products with filters
GET    /api/products/:slug        # Get single product
GET    /api/categories            # List categories
POST   /api/orders                # Create order (checkout)
```

#### Admin Endpoints (Auth Required)
```
POST   /api/auth/login            # Admin login
GET    /api/admin/orders          # List all orders
PUT    /api/admin/orders/:id      # Update order status
POST   /api/admin/products        # Create product
PUT    /api/admin/products/:id    # Update product
DELETE /api/admin/products/:id    # Delete product
GET    /api/admin/categories      # Manage categories
POST   /api/admin/categories      # Create category
```

**File Structure:**
```
server/
├── api/
│   ├── products/
│   │   ├── index.get.ts         # GET /api/products
│   │   └── [slug].get.ts        # GET /api/products/:slug
│   ├── categories/
│   │   └── index.get.ts         # GET /api/categories
│   ├── orders/
│   │   └── index.post.ts        # POST /api/orders
│   ├── auth/
│   │   └── login.post.ts        # POST /api/auth/login
│   └── admin/
│       ├── products/
│       │   ├── index.get.ts     # List products (admin)
│       │   ├── index.post.ts    # Create product
│       │   ├── [id].put.ts      # Update product
│       │   └── [id].delete.ts   # Delete product
│       └── orders/
│           ├── index.get.ts     # List orders
│           └── [id].put.ts      # Update order
├── middleware/
│   └── auth.ts                  # JWT verification
└── utils/
    ├── prisma.ts                # Prisma client instance
    └── jwt.ts                   # JWT helpers
```

---

### 3. Data Layer (Database)

**Technology:** PostgreSQL + Prisma ORM

**Database Schema:**

#### Products Table
```sql
id              UUID (PK)
name            VARCHAR
slug            VARCHAR (UNIQUE)
description     TEXT
price           DECIMAL(10,2)
condition       VARCHAR
material        VARCHAR
history         TEXT
categoryId      UUID (FK → categories)
images          TEXT[] (JSON array of URLs)
isAvailable     BOOLEAN
isFeatured      BOOLEAN
createdAt       TIMESTAMP
updatedAt       TIMESTAMP
```

#### Categories Table
```sql
id              UUID (PK)
name            VARCHAR (UNIQUE)
slug            VARCHAR (UNIQUE)
description     TEXT
createdAt       TIMESTAMP
updatedAt       TIMESTAMP
```

#### Orders Table
```sql
id              UUID (PK)
orderNumber     VARCHAR (UNIQUE)
customerName    VARCHAR
customerEmail   VARCHAR
customerPhone   VARCHAR
shippingAddress TEXT
subtotal        DECIMAL(10,2)
total           DECIMAL(10,2)
status          ENUM (PENDING, PROCESSING, SHIPPED, COMPLETED, CANCELLED)
paymentStatus   ENUM (PENDING, PAID, REFUNDED)
customerNotes   TEXT
adminNotes      TEXT
createdAt       TIMESTAMP
updatedAt       TIMESTAMP
```

#### OrderItems Table
```sql
id              UUID (PK)
orderId         UUID (FK → orders)
productId       UUID (FK → products)
productName     VARCHAR (snapshot)
productPrice    DECIMAL(10,2) (snapshot)
quantity        INTEGER
createdAt       TIMESTAMP
```

#### OrderStatusHistory Table
```sql
id              UUID (PK)
orderId         UUID (FK → orders)
status          ENUM
notes           TEXT
createdAt       TIMESTAMP
```

#### Admins Table
```sql
id              UUID (PK)
username        VARCHAR (UNIQUE)
email           VARCHAR (UNIQUE)
passwordHash    VARCHAR (bcrypt)
fullName        VARCHAR
isActive        BOOLEAN
lastLogin       TIMESTAMP
createdAt       TIMESTAMP
updatedAt       TIMESTAMP
```

**Relationships:**
- Products ← → Category (Many-to-One)
- Orders ← → OrderItems (One-to-Many)
- OrderItems ← → Product (Many-to-One)
- Orders ← → OrderStatusHistory (One-to-Many)

---

## 🔐 Authentication & Security

### Admin Authentication Flow

```
1. Admin enters username/password
2. POST /api/auth/login
3. Server validates credentials (bcrypt)
4. Server generates JWT token (24h expiry)
5. Client stores token in localStorage
6. Protected requests include: Authorization: Bearer <token>
7. Server middleware validates JWT
8. If valid → Allow access
   If invalid → 401 Unauthorized
```

**Security Measures:**
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 24h expiration
- HTTP-only cookies option for token storage
- HTTPS enforced in production (Vercel)
- Input validation with Zod
- SQL injection prevention (Prisma parameterized queries)
- XSS protection (Vue auto-escaping)
- CORS configuration

---

## 🌐 Deployment Architecture

### Vercel Deployment

```
┌────────────────────────────────────────────────┐
│             GITHUB REPOSITORY                   │
│          (Source Code + Version Control)        │
└──────────────────┬─────────────────────────────┘
                   │ Git Push
                   ▼
┌────────────────────────────────────────────────┐
│              VERCEL PLATFORM                    │
│  ┌─────────────────────────────────────────┐  │
│  │  1. Build Process                       │  │
│  │     • npm install                       │  │
│  │     • npm run build                     │  │
│  │     • Prisma generate                   │  │
│  └─────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────┐  │
│  │  2. Serverless Functions                │  │
│  │     • API routes → AWS Lambda           │  │
│  │     • Edge Functions (optional)         │  │
│  └─────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────┐  │
│  │  3. Static Assets                       │  │
│  │     • CDN (Global Edge Network)         │  │
│  │     • Image Optimization                │  │
│  └─────────────────────────────────────────┘  │
└──────────────────┬─────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────┐
│        POSTGRESQL DATABASE (Neon/Supabase)     │
│  • Hosted separately                           │
│  • Connection via DATABASE_URL                 │
│  • SSL enforced                                │
└────────────────────────────────────────────────┘
```

**Environment Variables (Vercel):**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=production
```

**Deployment Process:**
1. Push code to GitHub
2. Vercel auto-detects Nuxt 3 project
3. Builds application
4. Deploys to global CDN
5. Routes traffic to serverless functions
6. Zero-downtime deployments
7. Automatic HTTPS

---

## 📊 Data Flow Examples

### Example 1: Customer Views Product Listing

```
1. User navigates to /products
   ↓
2. Nuxt SSR renders page on server
   ↓
3. Server calls GET /api/products internally
   ↓
4. API handler queries Prisma:
   prisma.product.findMany({ include: { category: true } })
   ↓
5. Prisma executes SQL query on PostgreSQL
   ↓
6. Products data returned to API
   ↓
7. API formats response JSON
   ↓
8. SSR renders HTML with data
   ↓
9. Full HTML page sent to browser
   ↓
10. Client-side Vue hydrates for interactivity
```

### Example 2: Customer Places Order

```
1. User fills checkout form
   ↓
2. Client validates form (Vue)
   ↓
3. POST /api/orders with:
   { customerName, email, phone, address, items[] }
   ↓
4. Server validates with Zod schema
   ↓
5. Check product availability in DB
   ↓
6. Calculate totals
   ↓
7. Create order transaction:
   - Insert into orders table
   - Insert into order_items table
   - Insert into order_status_history
   ↓
8. Generate order number
   ↓
9. Return order confirmation
   ↓
10. Redirect to /order-confirmation/:orderNumber
```

### Example 3: Admin Updates Product

```
1. Admin logs in (JWT stored)
   ↓
2. Admin edits product form
   ↓
3. PUT /api/admin/products/:id
   Authorization: Bearer <token>
   ↓
4. Middleware verifies JWT
   ↓
5. Validate request body (Zod)
   ↓
6. Prisma update:
   prisma.product.update({ where: { id }, data: { ... } })
   ↓
7. Return updated product
   ↓
8. UI updates reactively
```

---

## 🎨 Frontend State Management

### Pinia Store Architecture

```javascript
// stores/cart.ts
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] // { productId, name, price, quantity, image }
  }),
  
  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },
  
  actions: {
    addItem(product) { /* ... */ },
    removeItem(productId) { /* ... */ },
    updateQuantity(productId, quantity) { /* ... */ },
    clearCart() { /* ... */ }
  }
})

// stores/admin.ts
export const useAdminStore = defineStore('admin', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),
  
  actions: {
    async login(username, password) { /* ... */ },
    logout() { /* ... */ },
    checkAuth() { /* ... */ }
  }
})
```

---

## 🚀 Performance Optimizations

### 1. Image Optimization
- Nuxt Image module auto-generates WebP
- Lazy loading below the fold
- Responsive image srcsets
- CDN delivery via Vercel

### 2. Code Splitting
- Automatic route-based code splitting
- Dynamic imports for heavy components
- Vendor chunk separation

### 3. Caching Strategy
```javascript
// API route caching example
export default defineEventHandler(async (event) => {
  const cached = await useStorage().getItem('products')
  if (cached) return cached
  
  const products = await prisma.product.findMany()
  await useStorage().setItem('products', products, { ttl: 300 }) // 5 min
  
  return products
})
```

### 4. Database Optimization
- Indexes on: slug, categoryId, status, createdAt
- Prisma query optimization (select only needed fields)
- Connection pooling
- Prepared statements

---

## 🧪 Testing Strategy (Future)

```
Unit Tests (Vitest)
├── Components
├── Composables
└── Utility functions

Integration Tests
├── API endpoints
└── Database operations

E2E Tests (Playwright)
├── Customer journey
├── Admin workflows
└── Checkout process
```

---

## 📈 Scaling Considerations

### Immediate Capacity
- **Products:** 10,000+
- **Orders:** 100,000+
- **Concurrent Users:** 1,000+
- **Page Load:** < 2 seconds

### Future Scaling Options
1. **Database:** Read replicas, connection pooling
2. **Caching:** Redis for sessions, product catalog
3. **CDN:** Cloudflare for global distribution
4. **Search:** Algolia/Meilisearch for fast search
5. **Images:** Cloudinary for advanced image management

---

## 🔄 CI/CD Pipeline

```
Developer → Git Push → GitHub
                 ↓
         GitHub Actions (optional)
         • Run tests
         • Lint code
         • Type check
                 ↓
              Vercel
         • Auto build
         • Auto deploy
         • Preview URLs for PRs
                 ↓
         Production (main branch)
         Development (dev branch)
```

---

## 📞 Monitoring & Logging

### Production Monitoring
- **Vercel Analytics:** Page views, performance
- **Error Tracking:** Sentry integration (recommended)
- **Database:** Prisma slow query logging
- **Uptime:** Vercel status page

### Logging Strategy
```javascript
// server/utils/logger.ts
export const logger = {
  info: (msg, data) => console.log(`[INFO] ${msg}`, data),
  error: (msg, error) => console.error(`[ERROR] ${msg}`, error),
  warn: (msg, data) => console.warn(`[WARN] ${msg}`, data)
}
```

---

## 🎯 Summary

This architecture provides:
- ✅ **Scalable** - Handles small business to medium growth
- ✅ **Maintainable** - Clear separation of concerns
- ✅ **Secure** - Industry-standard authentication
- ✅ **Fast** - SSR + CDN + optimized assets
- ✅ **SEO-friendly** - Server-side rendering
- ✅ **Cost-effective** - Free tier available (Vercel + Neon)
- ✅ **Modern** - Latest Vue 3 + Nuxt 3 + TypeScript

**Next Steps:**
1. Set up PostgreSQL database
2. Install dependencies
3. Run database migrations
4. Seed sample data
5. Start development
6. Deploy to Vercel
