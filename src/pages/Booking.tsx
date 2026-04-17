import { Helmet } from 'react-helmet-async';
import SectionHeading from '@/components/SectionHeading';
import BookingForm from '@/components/BookingForm';

export default function Booking() {
  return (
    <>
      <Helmet>
        <title>Book Your Stay — Hotel Alwar Royal</title>
        <meta
          name="description"
          content="Reserve your room at Hotel Alwar Royal. Easy online booking for luxury rooms at affordable prices."
        />
      </Helmet>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Book Your Stay"
          subtitle="Fill in the details below and we'll confirm your reservation."
        />
        <BookingForm />
      </section>
    </>
  );
}
