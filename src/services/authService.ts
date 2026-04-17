import api from '@/config/api';
import type { AdminUser } from '@/types';

export const authService = {
  login: async (email: string, password: string): Promise<{ user: AdminUser; token: string }> => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
