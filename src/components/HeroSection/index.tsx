import { Link } from 'react-router-dom';
import Button from '@/components/Button';

export default function HeroSection() {
  return (
    <section className="relative bg-primary-dark text-white min-h-[80vh] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80&auto=format&fit=crop"
        alt="Luxury hotel interior"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary/60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-accent font-medium tracking-wider uppercase mb-4">
            Welcome to Hotel Alwar Royal
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Luxury Stays at
            <br />
            <span className="text-accent">Affordable Prices</span>
          </h1>
          <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
            Experience the perfect blend of comfort, privacy, and personalized hospitality in the
            heart of Alwar, Rajasthan. Your premium getaway awaits.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/booking">
              <Button size="lg">Book Your Stay</Button>
            </Link>
            <Link to="/rooms">
              <Button variant="outline" size="lg">
                Explore Rooms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
