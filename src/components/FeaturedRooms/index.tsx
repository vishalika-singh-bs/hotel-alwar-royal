import SectionHeading from '@/components/SectionHeading';
import RoomCard from '@/components/RoomCard';
import Loader from '@/components/Loader';
import { useRooms } from '@/hooks/useRooms';

export default function FeaturedRooms() {
  const { data: rooms, isLoading, error } = useRooms();

  if (isLoading) return <Loader />;
  if (error) return null;

  const featured = rooms?.slice(0, 3) ?? [];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Our Rooms & Suites"
        subtitle="Choose from our carefully designed rooms, each offering a unique experience of comfort and luxury."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}
