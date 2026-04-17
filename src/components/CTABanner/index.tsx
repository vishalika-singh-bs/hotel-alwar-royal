import { Link } from 'react-router-dom';
import Button from '@/components/Button';

export default function CTABanner() {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=80&auto=format&fit=crop"
        alt="Luxury hotel ambience"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-primary-dark/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for a Royal Experience?</h2>
        <p className="text-lg mb-8 text-neutral-200">
          Book your stay today and discover why guests keep coming back to Hotel Alwar Royal.
        </p>
        <Link to="/booking">
          <Button size="lg">Reserve Your Room</Button>
        </Link>
      </div>
    </section>
  );
}
