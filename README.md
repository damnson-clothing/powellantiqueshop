# Powell's Antique Shop - Online Marketplace

A modern e-commerce platform for vintage bags and collectibles built with Nuxt 3, Prisma, and PostgreSQL.

## 🚀 Tech Stack

### Frontend
- **Nuxt 3** - Vue.js framework with server-side rendering
- **Vue 3** - Progressive JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **TypeScript** - Type-safe development

### Backend
- **Nuxt Server Routes** - Built-in API endpoints
- **Prisma ORM** - Modern database toolkit
- **PostgreSQL** - Relational database
- **Zod** - Schema validation
- **bcrypt** - Password hashing
- **JWT** - Authentication tokens

### Deployment
- **Vercel** - Serverless deployment platform
- **Neon/Supabase** - PostgreSQL hosting (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (local or cloud)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
```bash
cd onlineshop
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/powells_antique_shop"
JWT_SECRET="your-super-secret-jwt-key"
```

4. **Generate Prisma Client**
```bash
npm run db:generate
```

5. **Push database schema**
```bash
npm run db:push
```

6. **Seed the database**
```bash
npm run db:seed
```

7. **Run development server**
```bash
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
onlineshop/
├── assets/              # CSS, images, fonts
│   └── css/
│       └── tailwind.css
├── components/          # Vue components
├── layouts/             # Layout templates
│   ├── default.vue      # Customer-facing layout
│   └── admin.vue        # Admin panel layout
├── pages/               # File-based routing
│   ├── index.vue        # Homepage
│   ├── products/        # Product pages
│   ├── cart.vue         # Shopping cart
│   ├── checkout.vue     # Checkout process
│   └── admin/           # Admin pages
├── server/              # Server-side code
│   └── api/             # API endpoints
│       ├── products/    # Product APIs
│       ├── orders/      # Order APIs
│       ├── categories/  # Category APIs
│       └── auth/        # Authentication APIs
├── prisma/              # Database schema
│   ├── schema.prisma    # Prisma schema
│   └── seed.ts          # Database seeder
├── public/              # Static files
├── stores/              # Pinia stores
├── nuxt.config.ts       # Nuxt configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json
```

## 🔑 Default Admin Credentials

After seeding the database:
- **Username:** admin
- **Password:** admin123
- ⚠️ **Change these credentials in production!**

## 🎯 Features Implemented

### Customer Features
- ✅ Browse products with pagination
- ✅ Product detail pages with image galleries
- ✅ Search functionality
- ✅ Filter by category, price, condition
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Order confirmation
- ✅ Responsive design (mobile & desktop)

### Admin Features
- ✅ Secure admin login
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Category management
- ✅ Order status tracking

## 🚀 Deployment to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
- Visit [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables:
  - `DATABASE_URL`
  - `JWT_SECRET`
- Deploy!

3. **Set up PostgreSQL**
- Use [Neon](https://neon.tech) or [Supabase](https://supabase.com) for free PostgreSQL
- Copy connection string to Vercel environment variables

4. **Run migrations on Vercel**
```bash
npx prisma db push
```

## 📚 API Endpoints

### Public APIs
- `GET /api/products` - List all products (with filters)
- `GET /api/products/[slug]` - Get single product
- `GET /api/categories` - List all categories
- `POST /api/orders` - Create new order

### Admin APIs (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `GET /api/admin/orders` - List all orders
- `PUT /api/admin/orders/[id]` - Update order status

## 🗄️ Database Schema

### Models
- **Product** - Product information with images, pricing, and category
- **Category** - Product categories
- **Order** - Customer orders with status tracking
- **OrderItem** - Individual items in an order
- **OrderStatusHistory** - Audit trail for order status changes
- **Admin** - Admin user accounts

## 🎨 Customization

### Branding
- Edit colors in `tailwind.config.js`
- Update company info in layouts and pages
- Replace logo in `public/` directory

### Database
- Modify `prisma/schema.prisma` for schema changes
- Run `npm run db:generate && npm run db:push`

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio (GUI)
npm run db:seed      # Seed database with sample data
```

## 🔐 Security Notes

1. Change default admin credentials immediately
2. Use strong JWT_SECRET in production
3. Enable HTTPS (automatic on Vercel)
4. Implement rate limiting for APIs
5. Validate all user inputs
6. Use environment variables for sensitive data

## 🌟 Future Enhancements (Phase 2)

- Payment integration (PayMongo, Stripe)
- Customer accounts and order history
- Email notifications
- Automated shipping calculation
- Inventory management
- Product reviews and ratings
- Wishlist functionality
- Social media integration

## 📞 Support

For questions or issues:
- Email: info@powellsantique.com
- Location: Skyworld, Session Road, Baguio City

## 📄 License

Proprietary - Powell's Antique Shop © 2026

---

**Built with ❤️ using Nuxt 3 & Vue.js**
