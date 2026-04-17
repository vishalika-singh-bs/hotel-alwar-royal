import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    text: 'An amazing experience! The rooms were spotless, the staff was incredibly friendly, and the food was delicious. Best value for money in Alwar.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    text: 'We had a wonderful family stay. The hotel offers great amenities and the location is perfect for exploring Alwar. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Patel',
    text: 'Perfect for business travelers. Clean rooms, fast WiFi, and excellent room service. Will definitely stay here again on my next visit.',
    rating: 4,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-16 bg-primary-dark text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What Our Guests Say" subtitle="" />
        <div className="text-center">
          <div className="mb-4">
            {'★'.repeat(testimonials[current].rating)}
            {'☆'.repeat(5 - testimonials[current].rating)}
          </div>
          <blockquote className="text-lg italic text-neutral-300 mb-6 leading-relaxed">
            &ldquo;{testimonials[current].text}&rdquo;
          </blockquote>
          <p className="text-accent font-semibold">{testimonials[current].name}</p>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === current ? 'bg-accent' : 'bg-neutral-500'
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
