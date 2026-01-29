import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@powellsantique.com',
      passwordHash: hashedPassword,
      fullName: 'Powell Admin',
      isActive: true
    }
  })

  console.log('✅ Admin user created:', admin.username)

  // Create categories
  const vintageBags = await prisma.category.upsert({
    where: { slug: 'vintage-bags' },
    update: {},
    create: {
      name: 'Vintage Bags',
      slug: 'vintage-bags',
      description: 'Curated collection of vintage and antique bags from around the world'
    }
  })

  const collectibles = await prisma.category.upsert({
    where: { slug: 'collectibles' },
    update: {},
    create: {
      name: 'Collectibles',
      slug: 'collectibles',
      description: 'Rare and unique collectible items with historical significance'
    }
  })

  const accessories = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Vintage accessories to complement your collection'
    }
  })

  console.log('✅ Categories created')

  // Create sample products
  const products = [
    {
      name: '1950s Leather Handbag',
      slug: '1950s-leather-handbag',
      description: 'Authentic 1950s leather handbag in excellent condition. Features original brass hardware and silk interior lining.',
      price: 4500,
      condition: 'Excellent',
      material: 'Genuine Leather',
      history: 'Originally from a private collection in Paris. Restored with care to preserve its authentic vintage character.',
      categoryId: vintageBags.id,
      images: ['/images/sample-bag-1.jpg'],
      isAvailable: true,
      isFeatured: true
    },
    {
      name: 'Victorian Era Coin Purse',
      slug: 'victorian-coin-purse',
      description: 'Rare Victorian-era coin purse with intricate metalwork and velvet interior.',
      price: 2800,
      condition: 'Good',
      material: 'Metal & Velvet',
      history: 'Circa 1880s, typical of the Victorian era craftsmanship.',
      categoryId: collectibles.id,
      images: ['/images/sample-collectible-1.jpg'],
      isAvailable: true,
      isFeatured: false
    },
    {
      name: 'Art Deco Clutch',
      slug: 'art-deco-clutch',
      description: 'Stunning Art Deco clutch with geometric patterns and beaded details.',
      price: 3200,
      condition: 'Excellent',
      material: 'Satin & Beads',
      history: '1920s Art Deco period piece, perfect for special occasions.',
      categoryId: vintageBags.id,
      images: ['/images/sample-bag-2.jpg'],
      isAvailable: true,
      isFeatured: true
    }
  ]

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData
    })
  }

  console.log('✅ Sample products created')
  console.log('\n🎉 Database seed completed!')
  console.log('\n📝 Default admin credentials:')
  console.log('   Username: admin')
  console.log('   Password: admin123')
  console.log('   ⚠️  Please change these credentials in production!\n')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
