import api from '@/config/api';
import type { Booking, BookingFormData } from '@/types';

export const bookingService = {
  create: async (data: BookingFormData): Promise<Booking> => {
    const { data: booking } = await api.post('/bookings', data);
    return booking;
  },

  getAll: async (): Promise<Booking[]> => {
    const { data } = await api.get('/bookings');
    return data;
  },

  updateStatus: async (
    id: string,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED',
  ): Promise<Booking> => {
    const { data } = await api.patch(`/bookings/${encodeURIComponent(id)}/status`, { status });
    return data;
  },
};
