import * as PrismaPkg from '@prisma/client';
const PrismaClientClass = (PrismaPkg as any).PrismaClient || (PrismaPkg as any).default || PrismaPkg;
const prisma: any = new (PrismaClientClass as any)();

async function main() {
  // Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Boho' },
      { name: 'Formal' },
      { name: 'Casual' },
      { name: 'Evening Wear' },
      { name: 'Accessories' },
    ],
  });

  // Products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Floral Maxi Dress',
        categoryId: 'cat-boho',
        price: 4500,
        stock: 12,
        imageUrl: '/assets/maxi.jpg',
      },
      {
        name: 'Black Blazer',
        categoryId: 'cat-formal',
        price: 6200,
        stock: 8,
        imageUrl: '/assets/blazer.jpg',
      },
      {
        name: 'Denim Jacket',
        categoryId: 'cat-casual',
        price: 3800,
        stock: 15,
        imageUrl: '/assets/denim.jpg',
      },
      {
        name: 'Gold Hoop Earrings',
        categoryId: 'cat-accessories',
        price: 1200,
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
