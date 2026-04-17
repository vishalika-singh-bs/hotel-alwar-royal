import { useQuery } from '@tanstack/react-query';
import { roomService } from '@/services/roomService';

export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: roomService.getAll,
  });
}

export function useRoom(id: string) {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: () => roomService.getById(id),
    enabled: !!id,
  });
}
