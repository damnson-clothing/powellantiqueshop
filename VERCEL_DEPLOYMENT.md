# 🚀 Vercel Deployment Guide

## Prerequisites
- [ ] GitHub account
- [ ] Vercel account (sign up at vercel.com)
- [ ] PostgreSQL database (Neon, Supabase, etc.)

## Step 1: Prepare Repository

### 1.1 Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit - Powell's Antique Shop MVP"
```

### 1.2 Create GitHub Repository
1. Go to github.com/new
2. Create repository: `powells-antique-shop`
3. Don't initialize with README (we have files already)

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/powells-antique-shop.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Import Project
1. Go to vercel.com/new
2. Click "Import" next to your GitHub repository
3. Select the project

### 2.2 Configure Build Settings
Vercel auto-detects Nuxt projects, but verify:
- **Framework Preset:** Nuxt.js
- **Build Command:** `npm run build`
- **Output Directory:** `.output`
- **Install Command:** `npm install`

### 2.3 Add Environment Variables
Click "Environment Variables" and add:

| Name | Value | Source |
|------|-------|--------|
| `DATABASE_URL` | Your PostgreSQL connection string | Neon/Supabase dashboard |
| `JWT_SECRET` | Generate with command below | Generate new |
| `NODE_ENV` | `production` | Manual |

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output and use it as JWT_SECRET value.

### 2.4 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Get your deployment URL: `https://your-project.vercel.app`

## Step 3: Setup Production Database

### 3.1 Run Migrations
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Or use Vercel dashboard terminal
npx prisma db push
```

### 3.2 Seed Production Data
```bash
npm run db:seed
```

**⚠️ IMPORTANT:** This creates the default admin account:
- Username: `admin`
- Password: `admin123`

## Step 4: Post-Deployment

### 4.1 Test Critical Flows
1. Visit your Vercel URL
2. Browse products
3. Add to cart
4. Test checkout
5. Login to admin: `https://your-project.vercel.app/admin/login`
6. Test admin features

### 4.2 Change Admin Password
1. Login to admin panel
2. Go to profile/settings (when implemented)
3. Change password immediately

**For now (manual):**
```bash
# Connect to production database
npx prisma studio

# Or update via SQL:
# UPDATE admins SET password_hash = <new_bcrypt_hash> WHERE username = 'admin';
```

### 4.3 Configure Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

## Step 5: Monitoring & Maintenance

### 5.1 Monitor Vercel Dashboard
- View deployment logs
- Check function errors
- Monitor bandwidth usage

### 5.2 Database Monitoring
- Check Neon/Supabase dashboard
- Monitor connection pool
- Review query performance

### 5.3 Regular Updates
```bash
# Pull latest changes
git pull origin main

# Vercel auto-deploys on push
git add .
git commit -m "Update description"
git push origin main
```

---

## 🎯 Quick Deployment (Minimum Steps)

```bash
# 1. Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 2. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/powells-antique-shop.git
git push -u origin main

# 3. Deploy on Vercel
# - Go to vercel.com/new
# - Import from GitHub
# - Add environment variables (DATABASE_URL, JWT_SECRET)
# - Deploy

# 4. Run migrations (Vercel CLI or dashboard terminal)
npx prisma db push
npm run db:seed

# 5. Change admin password immediately!
```

---

## 🆘 Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify DATABASE_URL connection string
- Review Vercel build logs

### Database Connection Issues
- Verify DATABASE_URL includes `?sslmode=require`
- Check Neon/Supabase connection limits
- Ensure IP allowlist includes Vercel IPs (usually 0.0.0.0/0 for serverless)

### 500 Server Error
- Check Vercel function logs
- Verify JWT_SECRET is set
- Check database is accessible

### Admin Login Not Working
- Verify database was seeded
- Check cookies are enabled
- Try incognito/private mode
- Review browser console for errors

---

## 📞 Support
- Vercel Docs: https://vercel.com/docs
- Nuxt Docs: https://nuxt.com/docs
- Prisma Docs: https://www.prisma.io/docs
