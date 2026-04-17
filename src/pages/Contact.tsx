import { Helmet } from 'react-helmet-async';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us — Hotel Alwar Royal</title>
        <meta
          name="description"
          content="Get in touch with Hotel Alwar Royal. Contact us for reservations, inquiries, or feedback."
        />
      </Helmet>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact Us"
          subtitle="Have a question or want to make a reservation? We'd love to hear from you."
        />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-heading text-xl font-bold text-primary mb-6">Get in Touch</h3>

            <div className="space-y-4 mb-8">
              <div>
                <p className="font-semibold text-neutral-700">Address</p>
                <p className="text-neutral-500">Alwar, Rajasthan, India</p>
              </div>
              <div>
                <p className="font-semibold text-neutral-700">Phone</p>
                <p className="text-neutral-500">+91 XXXXX XXXXX</p>
              </div>
              <div>
                <p className="font-semibold text-neutral-700">Email</p>
                <p className="text-neutral-500">info@hotelalwarroyal.com</p>
              </div>
              <div>
                <p className="font-semibold text-neutral-700">Hours</p>
                <p className="text-neutral-500">24/7 — We never close</p>
              </div>
            </div>

            <div className="rounded-lg h-64 overflow-hidden shadow-md">
              <iframe
                title="Hotel Alwar Royal location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=76.5800%2C27.5400%2C76.6400%2C27.5900&layer=mapnik&marker=27.5650%2C76.6100"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-primary mb-6">Send a Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
