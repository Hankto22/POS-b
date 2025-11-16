import * as PrismaPkg from '@prisma/client';
const PrismaClientClass = (PrismaPkg as any).PrismaClient || (PrismaPkg as any).default || PrismaPkg;
const prisma: any = new (PrismaClientClass as any)();

async function main() {
  // Categories
  const bohoCategory = await prisma.category.create({
    data: { name: 'Boho' },
  });
  const formalCategory = await prisma.category.create({
    data: { name: 'Formal' },
  });
  const casualCategory = await prisma.category.create({
    data: { name: 'Casual' },
  });
  const eveningCategory = await prisma.category.create({
    data: { name: 'Evening Wear' },
  });
  const accessoriesCategory = await prisma.category.create({
    data: { name: 'Accessories' },
  });

  // Wholesalers
  const wholesaler1 = await prisma.wholesaler.create({
    data: {
      name: 'Fashion Wholesale Co',
      contact: '+254700000000',
      email: 'contact@fashionwholesale.com'
    },
  });
  const wholesaler2 = await prisma.wholesaler.create({
    data: {
      name: 'Premium Accessories Ltd',
      contact: '+254711111111',
      email: 'sales@premiumacc.com'
    },
  });

  // Products
  await prisma.product.createMany({
    data: [
      {
        name: 'Floral Maxi Dress',
        categoryId: bohoCategory.id,
        sellingPrice: 4500,
        buyingCost: 3000,
        brand: 'Local Designer',
        wholesalerId: wholesaler1.id,
        stock: 12,
        imageUrl: '/assets/maxi.jpg',
      },
      {
        name: 'Black Blazer',
        categoryId: formalCategory.id,
        sellingPrice: 6200,
        buyingCost: 4000,
        brand: 'Premium Brand',
        wholesalerId: wholesaler1.id,
        stock: 8,
        imageUrl: '/assets/blazer.jpg',
      },
      {
        name: 'Denim Jacket',
        categoryId: casualCategory.id,
        sellingPrice: 3800,
        buyingCost: 2500,
        brand: 'Casual Wear',
        wholesalerId: wholesaler2.id,
        stock: 15,
        imageUrl: '/assets/denim.jpg',
      },
      {
        name: 'Gold Hoop Earrings',
        categoryId: accessoriesCategory.id,
        sellingPrice: 1200,
        buyingCost: 800,
        brand: 'Jewelry Co',
        wholesalerId: wholesaler2.id,
        stock: 25,
        imageUrl: '/assets/hoops.jpg',
      },
    ],
  });

  // Customers
  await prisma.customer.createMany({
    data: [
      {
        name: 'Zawadi M.',
        phone: '+254712345678',
        email: 'zawadi@gibs.com',
        preferences: 'Boho, Accessories',
      },
      {
        name: 'Faith K.',
        phone: '+254798765432',
        email: 'faith@gibs.com',
        preferences: 'Formal, Evening Wear',
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
