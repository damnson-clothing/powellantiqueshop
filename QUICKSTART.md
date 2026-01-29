# Quick Start Guide - Powell's Antique Shop

## 🚀 Get Started in 10 Minutes

### Step 1: Verify Prerequisites

Open PowerShell and check:

```powershell
# Check Node.js version (need 18+)
node --version

# Check npm
npm --version

# If not installed, download from: https://nodejs.org/
```

### Step 2: Install Dependencies

```powershell
cd C:\Users\alcab\Documents\onlineshop

npm install
```

This will install:
- Nuxt 3 framework
- Vue 3
- Tailwind CSS
- Prisma ORM
- All required dependencies

**Expected time:** 2-3 minutes

---

### Step 3: Set Up Database

#### Option A: Local PostgreSQL (Development)

1. **Install PostgreSQL:**
   - Download from: https://www.postgresql.org/download/windows/
   - Install with default settings
   - Remember your password!

2. **Create Database:**
   ```powershell
   # Open psql (PostgreSQL terminal)
   psql -U postgres

   # In psql, create database
   CREATE DATABASE powells_antique_shop;
   \q
   ```

3. **Configure Environment:**
   ```powershell
   # Copy example env file
   cp .env.example .env

   # Edit .env file (use notepad or VS Code)
   notepad .env
   ```

   Update `.env` with your database credentials:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/powells_antique_shop"
   JWT_SECRET="your-secret-key-change-me"
   ```

#### Option B: Cloud Database (Easier - Recommended)

1. **Create Free Database on Neon:**
   - Visit: https://neon.tech
   - Sign up (free tier)
   - Create new project
   - Copy connection string

2. **Configure Environment:**
   ```powershell
   cp .env.example .env
   notepad .env
   ```

   Paste Neon connection string:
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require"
   JWT_SECRET="your-secret-key-change-me"
   ```

---

### Step 4: Initialize Database

```powershell
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

**Expected output:**
```
✅ Admin user created: admin
✅ Categories created
✅ Sample products created

📝 Default admin credentials:
   Username: admin
   Password: admin123
```

---

### Step 5: Start Development Server

```powershell
npm run dev
```

**Expected output:**
```
Nuxt 3.13.0 with Nitro 2.9.0
  > Local:    http://localhost:3000/
  > Network:  http://192.168.x.x:3000/

✔ Nuxt is ready!
```

**Open browser:** http://localhost:3000

---

## ✅ Verify Everything Works

### Test Customer Site

1. **Homepage** - http://localhost:3000
   - Should see hero section
   - Should see featured products (if any)

2. **Products Page** - http://localhost:3000/products
   - Should see product grid
   - Should see search and filters
   - Try filtering by category

3. **Product Detail** - Click any product
   - Should see product details
   - Should see images and description

### Test Admin Panel

1. **Login** - http://localhost:3000/admin/login
   - Username: `admin`
   - Password: `admin123`

2. **Dashboard** - Should redirect after login

3. **Products Management** - Create, edit, delete test products

---

## 🎯 Next Steps

### Immediate Tasks

1. **Change Admin Password:**
   ```powershell
   npm run db:studio
   ```
   - Opens Prisma Studio (GUI for database)
   - Navigate to `admins` table
   - Update password (will need to hash it)

2. **Add Your Products:**
   - Login to admin panel
   - Add real product information
   - Upload product images

3. **Customize Branding:**
   - Update colors in `tailwind.config.js`
   - Add logo to `public/` folder
   - Update company info in layouts

### Development Workflow

```powershell
# Start development
npm run dev

# Open Prisma Studio (database GUI)
npm run db:studio

# Build for production (test)
npm run build
npm run preview
```

---

## 🐛 Troubleshooting

### Problem: Database connection error

**Solution:**
```powershell
# Check DATABASE_URL in .env
# Make sure PostgreSQL is running
# Test connection:
npm run db:studio
```

### Problem: Port 3000 already in use

**Solution:**
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port:
PORT=3001 npm run dev
```

### Problem: Prisma errors

**Solution:**
```powershell
# Regenerate Prisma Client
npm run db:generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
npm run db:seed
```

### Problem: npm install fails

**Solution:**
```powershell
# Clear cache
npm cache clean --force

# Delete node_modules and reinstall
rm -r node_modules
rm package-lock.json
npm install
```

---

## 📁 Important Files

### Configuration Files
- `nuxt.config.ts` - Nuxt configuration
- `tailwind.config.js` - Tailwind CSS styles
- `prisma/schema.prisma` - Database schema
- `.env` - Environment variables (don't commit!)

### Main Folders
- `pages/` - All routes/pages
- `components/` - Reusable Vue components
- `server/api/` - API endpoints
- `layouts/` - Page layouts
- `assets/css/` - Global CSS

### Entry Points
- `app.vue` - Root component
- `pages/index.vue` - Homepage
- `layouts/default.vue` - Customer layout
- `layouts/admin.vue` - Admin layout

---

## 🎨 Customization Guide

### Change Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#YOUR_COLOR', // Main color
    700: '#DARKER_SHADE',
    // ...
  }
}
```

### Change Logo

1. Add logo file to `public/logo.png`
2. Update in `layouts/default.vue`:
   ```vue
   <img src="/logo.png" alt="Powell's" />
   ```

### Update Company Info

Edit these files:
- `layouts/default.vue` - Footer
- `pages/about.vue` - About page
- `pages/index.vue` - Homepage

---

## 📚 Useful Commands

```powershell
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Update database schema
npm run db:studio        # Open database GUI
npm run db:seed          # Seed sample data

# Code Quality (after setup)
npm run lint             # Lint code
npm run type-check       # Check TypeScript types
```

---

## 🚀 Deploy to Vercel (When Ready)

### 1. Push to GitHub

```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/powells-antique-shop.git
git push -u origin main
```

### 2. Deploy

1. Visit https://vercel.com
2. Sign in with GitHub
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
6. Click "Deploy"

**Done!** Your site will be live at `https://your-project.vercel.app`

---

## 💡 Tips

### Development Best Practices

1. **Use Git for version control:**
   ```powershell
   git add .
   git commit -m "Add feature X"
   git push
   ```

2. **Test before committing:**
   - Test on mobile view
   - Test all forms
   - Check console for errors

3. **Keep dependencies updated:**
   ```powershell
   npm outdated
   npm update
   ```

4. **Backup database regularly:**
   ```powershell
   pg_dump powells_antique_shop > backup.sql
   ```

### Performance Tips

- Optimize images before uploading (use WebP format)
- Keep database queries efficient
- Use Nuxt Image component for images
- Enable caching in production

---

## 📞 Need Help?

### Resources
- **Nuxt Docs:** https://nuxt.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Vue Docs:** https://vuejs.org/

### Common Issues
- Check [GitHub Issues](https://github.com/nuxt/nuxt/issues)
- Ask on [Nuxt Discord](https://discord.com/invite/nuxt)

---

**Ready to build?** Run `npm run dev` and start developing! 🎉
