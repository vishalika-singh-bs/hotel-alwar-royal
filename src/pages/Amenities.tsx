import { Helmet } from 'react-helmet-async';
import SectionHeading from '@/components/SectionHeading';
import AmenityCard from '@/components/AmenityCard';

const amenities = [
  { icon: '🏊', title: 'Swimming Pool', description: 'Refreshing pool with lounging area' },
  { icon: '🍽️', title: 'Restaurant', description: 'Multi-cuisine dining with Rajasthani specialties' },
  { icon: '📶', title: 'Free WiFi', description: 'High-speed internet in all rooms and common areas' },
  { icon: '🅿️', title: 'Free Parking', description: 'Secure covered parking for guests' },
  { icon: '🏋️', title: 'Fitness Center', description: 'Fully equipped gym with modern equipment' },
  { icon: '🧹', title: 'Housekeeping', description: 'Daily room cleaning and laundry service' },
  { icon: '🛎️', title: 'Room Service', description: '24/7 in-room dining and concierge' },
  { icon: '❄️', title: 'Air Conditioning', description: 'Climate-controlled rooms for year-round comfort' },
  { icon: '📺', title: 'Smart TV', description: 'LED TVs with satellite channels in every room' },
  { icon: '🔒', title: 'Safe & Security', description: 'In-room safe and 24-hour security' },
  { icon: '☕', title: 'Tea & Coffee', description: 'Complimentary tea and coffee making facilities' },
  { icon: '🚐', title: 'Airport Transfer', description: 'Pickup and drop service on request' },
];

export default function Amenities() {
  return (
    <>
      <Helmet>
        <title>Amenities — Hotel Alwar Royal</title>
        <meta
          name="description"
          content="Discover the premium amenities at Hotel Alwar Royal — pool, restaurant, fitness center, free WiFi, and more."
        />
      </Helmet>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Hotel Amenities"
          subtitle="Everything you need for a comfortable and memorable stay."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity) => (
            <AmenityCard key={amenity.title} {...amenity} />
          ))}
        </div>
      </section>
    </>
  );
}
