const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding products...');
  
  const products = [

    {
      name: 'Americano',
      description: 'Hot water poured over a double shot of espresso for a rich, deep flavor.',
      price: 4.00,
      stock: 100,
      category_id: 1, // Espresso Series
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Caramel Macchiato',
      description: 'Vanilla syrup, steamed milk, espresso, and caramel drizzle.',
      price: 5.50,
      stock: 50,
      category_id: 2, // Latte Blends
      image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Matcha Green Tea Latte',
      description: 'Smooth and creamy matcha green tea blended with steamed milk.',
      price: 5.00,
      stock: 60,
      category_id: 3, // Non-Coffee Drinks
      image_url: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Butter Croissant',
      description: 'Flaky, buttery, and perfectly golden brown croissant baked fresh daily.',
      price: 3.75,
      stock: 30,
      category_id: 4, // Pastries
      image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Chocolate Chip Cookie',
      description: 'Chewy cookie packed with rich chocolate chips and served warm.',
      price: 2.50,
      stock: 45,
      category_id: 4, // Pastries
      image_url: 'https://images.unsplash.com/photo-1558961363-a0e241775a6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
    console.log(`Created: ${product.name}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
