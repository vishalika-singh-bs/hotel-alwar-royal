import api from '@/config/api';
import type { ContactFormData, ContactMessage } from '@/types';

export const contactService = {
  send: async (data: ContactFormData): Promise<{ message: string }> => {
    const { data: response } = await api.post('/contact', data);
    return response;
  },

  getAll: async (): Promise<ContactMessage[]> => {
    const { data } = await api.get('/contact');
    return data;
  },
};
