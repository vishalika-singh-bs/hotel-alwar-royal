import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/validators';
import type { Room } from '@/types';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-56 bg-neutral-200 overflow-hidden">
        {room.images[0] ? (
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading text-xl font-bold text-primary">{room.name}</h3>
          <span className="text-accent font-bold text-lg">{formatCurrency(room.price)}</span>
        </div>
        <p className="text-sm text-neutral-500 capitalize mb-2">{room.type} Room</p>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{room.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400">Up to {room.capacity} guests</span>
          <Link
            to={`/rooms/${room.id}`}
            className="text-accent font-semibold text-sm hover:text-accent-dark transition-colors"
          >
            View Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
