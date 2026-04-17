import { Helmet } from 'react-helmet-async';
import SectionHeading from '@/components/SectionHeading';
import RoomCard from '@/components/RoomCard';
import Loader from '@/components/Loader';
import { useRooms } from '@/hooks/useRooms';

export default function Rooms() {
  const { data: rooms, isLoading, error } = useRooms();

  return (
    <>
      <Helmet>
        <title>Rooms & Suites — Hotel Alwar Royal</title>
        <meta
          name="description"
          content="Browse our luxury rooms and suites at Hotel Alwar Royal. From standard rooms to premium suites, find the perfect accommodation for your stay."
        />
      </Helmet>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Rooms & Suites"
          subtitle="Each room is designed to offer a unique experience of comfort, luxury, and relaxation."
        />

        {isLoading && <Loader />}

        {error && (
          <div className="text-center text-red-500 py-10">
            Failed to load rooms. Please try again later.
          </div>
        )}

        {rooms && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
