const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating database...');
  
  // Delete Classic Espresso
  try {
    await prisma.product.deleteMany({
      where: { name: 'Classic Espresso' }
    });
    console.log('Deleted Classic Espresso');
  } catch(e) {
    console.log('Classic Espresso not found or already deleted');
  }

  // Update pictures to something "indieast" (dark, edgy, blue-themed)
  const updates = [
    { name: 'Americano', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }, // Dark coffee
    { name: 'Caramel Macchiato', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }, // Edgy latte art
    { name: 'Matcha Green Tea Latte', url: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }, // Dark matcha
    { name: 'Butter Croissant', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }, // Dark pastry
    { name: 'Chocolate Chip Cookie', url: 'https://images.unsplash.com/photo-1558961363-a0e241775a6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' } // Edgy cookie
  ];

  for (const update of updates) {
    await prisma.product.updateMany({
      where: { name: update.name },
      data: { image_url: update.url }
    });
    console.log(`Updated image for ${update.name}`);
  }
  
  console.log('Database updated.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
