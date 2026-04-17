import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import FeaturedRooms from '@/components/FeaturedRooms';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import CTABanner from '@/components/CTABanner';
import AmenityCard from '@/components/AmenityCard';
import SectionHeading from '@/components/SectionHeading';

const highlights = [
  { icon: '🏨', title: 'Luxury Rooms', description: 'Spacious, well-designed rooms with modern amenities' },
  { icon: '🍽️', title: 'Fine Dining', description: 'Multi-cuisine restaurant with authentic Rajasthani flavors' },
  { icon: '📶', title: 'Free WiFi', description: 'High-speed internet throughout the hotel' },
  { icon: '🅿️', title: 'Free Parking', description: 'Secure parking space for all guests' },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Hotel Alwar Royal — Luxury Yet Affordable Stay in Alwar</title>
        <meta
          name="description"
          content="Hotel Alwar Royal offers luxury accommodation at affordable prices in Alwar, Rajasthan. Modern rooms, fine dining, and personalized hospitality."
        />
      </Helmet>
      <HeroSection />

      <section className="py-16 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose Us"
            subtitle="We blend luxury with affordability to give you the best stay experience."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <AmenityCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <FeaturedRooms />
      <TestimonialCarousel />
      <CTABanner />
    </>
  );
}
