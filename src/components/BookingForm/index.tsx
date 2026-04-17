import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { bookingSchema } from '@/utils/validators';
import { useCreateBooking } from '@/hooks/useBooking';
import { useRooms } from '@/hooks/useRooms';
import type { BookingFormData } from '@/types';

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    roomId: '',
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const { data: rooms } = useRooms();
  const { mutate: createBooking, isPending } = useCreateBooking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    createBooking(formData, {
      onSuccess: () => {
        setSuccess(true);
        setFormData({ roomId: '', guestName: '', email: '', phone: '', checkIn: '', checkOut: '' });
      },
      onError: () => {
        setErrors({ form: 'Something went wrong. Please try again.' });
      },
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto" noValidate>
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
          Booking submitted successfully! We will confirm your reservation shortly.
        </div>
      )}
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {errors.form}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1">Room Type</label>
        <select
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
        >
          <option value="">Select a room</option>
          {rooms?.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} - {room.type}
            </option>
          ))}
        </select>
        {errors.roomId && <p className="mt-1 text-sm text-red-500">{errors.roomId}</p>}
      </div>

      <Input
        label="Full Name"
        name="guestName"
        value={formData.guestName}
        onChange={handleChange}
        error={errors.guestName}
        placeholder="Enter your full name"
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="your@email.com"
        required
      />
      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="+91 XXXXX XXXXX"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Check-in Date"
          name="checkIn"
          type="date"
          value={formData.checkIn}
          onChange={handleChange}
          error={errors.checkIn}
          min={today}
          required
        />
        <Input
          label="Check-out Date"
          name="checkOut"
          type="date"
          value={formData.checkOut}
          onChange={handleChange}
          error={errors.checkOut}
          min={formData.checkIn || today}
          required
        />
      </div>

      <Button type="submit" className="w-full mt-4" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Book Now'}
      </Button>
    </form>
  );
}
