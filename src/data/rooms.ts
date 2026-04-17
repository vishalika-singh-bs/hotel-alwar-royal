import type { Room } from '@/types';

export const staticRooms: Room[] = [
  {
    id: '1',
    name: 'Royal Standard',
    type: 'standard',
    price: 2500,
    description:
      'A comfortable, well-appointed room with modern amenities, perfect for solo travelers or couples seeking a budget-friendly yet luxurious stay.',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
    ],
    capacity: 2,
    amenities: ['WiFi', 'AC', 'TV', 'Room Service'],
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Royal Deluxe',
    type: 'deluxe',
    price: 4000,
    description:
      'Spacious and elegantly designed with a sitting area and premium furnishings. Ideal for guests who appreciate extra space and refined comfort.',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&auto=format&fit=crop',
    ],
    capacity: 3,
    amenities: ['WiFi', 'AC', 'TV', 'Room Service', 'Mini Bar', 'Balcony'],
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Royal Suite',
    type: 'suite',
    price: 6500,
    description:
      'Our flagship suite featuring a separate living room, king-size bed, and panoramic views. The ultimate luxury experience at an affordable price.',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80&auto=format&fit=crop',
    ],
    capacity: 4,
    amenities: ['WiFi', 'AC', 'TV', 'Room Service', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Lounge'],
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Royal Premium',
    type: 'premium',
    price: 5000,
    description:
      'A premium room with upgraded interiors, a work desk, and complimentary breakfast. Perfect for business travelers who want comfort and productivity.',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&auto=format&fit=crop',
    ],
    capacity: 2,
    amenities: ['WiFi', 'AC', 'TV', 'Room Service', 'Work Desk', 'Breakfast'],
    isAvailable: true,
  },
];
