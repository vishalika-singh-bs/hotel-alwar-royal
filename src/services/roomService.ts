import api from '@/config/api';
import { staticRooms } from '@/data/rooms';
import type { Room } from '@/types';

// Uses live API when backend is available, falls back to static data otherwise.
export const roomService = {
  getAll: async (): Promise<Room[]> => {
    try {
      const { data } = await api.get('/rooms');
      return data;
    } catch {
      return staticRooms;
    }
  },

  getById: async (id: string): Promise<Room> => {
    try {
      const { data } = await api.get(`/rooms/${encodeURIComponent(id)}`);
      return data;
    } catch {
      const room = staticRooms.find((r) => r.id === id);
      if (!room) throw new Error('Room not found');
      return room;
    }
  },
};
