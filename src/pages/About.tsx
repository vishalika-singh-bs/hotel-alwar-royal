import { Helmet } from 'react-helmet-async';
import SectionHeading from '@/components/SectionHeading';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — Hotel Alwar Royal</title>
        <meta
          name="description"
          content="Learn about Hotel Alwar Royal's story, values, and commitment to providing luxury yet affordable hospitality in Alwar, Rajasthan."
        />
      </Helmet>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Hotel Alwar Royal"
          subtitle="Where comfort meets affordability in the heart of Alwar"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-heading text-2xl font-bold text-primary mb-4">Our Story</h3>
            <p className="text-neutral-600 mb-4 leading-relaxed">
              Hotel Alwar Royal is a modern luxury hotel in Alwar that blends comfort,
              affordability, and contemporary design. Established with a vision to provide a premium
              experience without excessive pricing, we cater to both leisure and business travelers.
            </p>
            <p className="text-neutral-600 mb-4 leading-relaxed">
              Our hotel emphasizes comfort, privacy, and personalized hospitality. Every detail —
              from the carefully designed rooms to the warm service — is crafted to make your stay
              memorable.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Located in the historic city of Alwar, Rajasthan, we serve as the perfect base for
              exploring the region&apos;s rich heritage while enjoying all the comforts of a modern
              hotel.
            </p>
          </div>
          <div className="rounded-lg h-80 overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop"
              alt="Hotel Alwar Royal interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <p className="text-4xl font-bold text-accent mb-2">100+</p>
            <p className="text-neutral-500">Happy Guests</p>
          </div>
          <div className="p-6">
            <p className="text-4xl font-bold text-accent mb-2">20+</p>
            <p className="text-neutral-500">Luxury Rooms</p>
          </div>
          <div className="p-6">
            <p className="text-4xl font-bold text-accent mb-2">4.8</p>
            <p className="text-neutral-500">Guest Rating</p>
          </div>
        </div>
      </section>
    </>
  );
}
