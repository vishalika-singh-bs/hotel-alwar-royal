import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Loader from '@/components/Loader';
import Button from '@/components/Button';
import { useRoom } from '@/hooks/useRooms';
import { formatCurrency } from '@/utils/validators';

export default function RoomDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: room, isLoading, error } = useRoom(id!);

  if (isLoading) return <Loader />;

  if (error || !room) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-700 mb-4">Room not found</h2>
        <Link to="/rooms" className="text-accent hover:underline">
          &larr; Back to Rooms
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{room.name} — Hotel Alwar Royal</title>
        <meta name="description" content={room.description} />
      </Helmet>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/rooms" className="text-accent hover:underline text-sm mb-6 inline-block">
          &larr; Back to Rooms
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-neutral-200 rounded-lg h-96 overflow-hidden">
            {room.images[0] ? (
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                No Image
              </div>
            )}
          </div>

          <div>
            <span className="text-sm text-accent font-medium uppercase tracking-wider">
              {room.type} Room
            </span>
            <h1 className="font-heading text-3xl font-bold text-primary mt-2 mb-4">{room.name}</h1>
            <p className="text-neutral-600 leading-relaxed mb-6">{room.description}</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-accent">{formatCurrency(room.price)}</span>
              <span className="text-neutral-400">/ night</span>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-neutral-700 mb-2">
                Capacity: Up to {room.capacity} guests
              </p>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <Link to={`/booking?room=${room.id}`}>
              <Button size="lg" className="w-full">
                Book This Room
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
