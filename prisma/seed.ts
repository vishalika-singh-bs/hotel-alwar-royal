import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed rooms
  const rooms = [
    {
      name: 'Royal Standard',
      type: 'standard',
      price: 2500,
      description:
        'A comfortable, well-appointed room with modern amenities, perfect for solo travelers or couples seeking a budget-friendly yet luxurious stay.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
      ]),
      capacity: 2,
      amenities: JSON.stringify(['WiFi', 'AC', 'TV', 'Room Service']),
    },
    {
      name: 'Royal Deluxe',
      type: 'deluxe',
      price: 4000,
      description:
        'Spacious and elegantly designed with a sitting area and premium furnishings. Ideal for guests who appreciate extra space and refined comfort.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&auto=format&fit=crop',
      ]),
      capacity: 3,
      amenities: JSON.stringify(['WiFi', 'AC', 'TV', 'Room Service', 'Mini Bar', 'Balcony']),
    },
    {
      name: 'Royal Suite',
      type: 'suite',
      price: 6500,
      description:
        'Our flagship suite featuring a separate living room, king-size bed, and panoramic views. The ultimate luxury experience at an affordable price.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80&auto=format&fit=crop',
      ]),
      capacity: 4,
      amenities: JSON.stringify([
        'WiFi', 'AC', 'TV', 'Room Service', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Lounge',
      ]),
    },
    {
      name: 'Royal Premium',
      type: 'premium',
      price: 5000,
      description:
        'A premium room with upgraded interiors, a work desk, and complimentary breakfast. Perfect for business travelers who want comfort and productivity.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&auto=format&fit=crop',
      ]),
      capacity: 2,
      amenities: JSON.stringify(['WiFi', 'AC', 'TV', 'Room Service', 'Work Desk', 'Breakfast']),
    },
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { id: room.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: room.name.toLowerCase().replace(/\s+/g, '-'),
        ...room,
      },
    });
  }
  console.log(`✓ ${rooms.length} rooms seeded`);

  // Seed admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@hotelalwarroyal.com' },
    update: {},
    create: {
      email: 'admin@hotelalwarroyal.com',
      passwordHash,
    },
  });
  console.log('✓ Admin user seeded (admin@hotelalwarroyal.com / admin123)');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
