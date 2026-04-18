import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { bookingService } from '@/services/bookingService';
import { contactService } from '@/services/contactService';
import { loginSchema, formatDate } from '@/utils/validators';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import type { Booking, ContactMessage } from '@/types';

// ─── Login Form ────────────────────────────────────────────────────────────────

function LoginForm() {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { user, token } = await authService.login(email, password);
      dispatch({ type: 'LOGIN', payload: { user, token } });
    } catch {
      setErrors({ form: 'Invalid email or password.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary">Admin Login</h2>
          <p className="text-neutral-500 text-sm mt-1">Sign in to manage bookings & messages</p>
        </div>

        {errors.form && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Enter your password"
            required
          />
          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>


      </div>
    </div>
  );
}

// ─── Shared helpers ────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-6 py-16 text-center text-neutral-400">
      <p className="text-4xl mb-3">📭</p>
      <p className="text-lg font-medium mb-1">{message}</p>
      <p className="text-sm">Items submitted through the website will appear here.</p>
    </div>
  );
}

function ErrorState({ entity }: { entity: string }) {
  return (
    <div className="px-6 py-10 text-center text-red-500 text-sm">
      Failed to load {entity}. Make sure the backend server is running (
      <code className="bg-red-50 px-1 rounded">npm run dev:server</code>).
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`rounded-lg p-6 text-white ${color}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm mt-1 opacity-90">{label}</p>
    </div>
  );
}

// ─── Bookings Tab ──────────────────────────────────────────────────────────────

const statusStyles: Record<Booking['status'], string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

function StatusBadge({ status }: { status: Booking['status'] }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutate: updateStatus } = useMutation({
    mutationFn: (status: Booking['status']) => bookingService.updateStatus(booking.id, status),
    onMutate: () => setIsUpdating(true),
    onSettled: () => setIsUpdating(false),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-bookings'] }),
  });

  return (
    <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-neutral-700">#{booking.id}</td>
      <td className="px-4 py-3">
        <p className="text-sm font-semibold text-neutral-800">{booking.guestName}</p>
        <p className="text-xs text-neutral-400">{booking.email}</p>
      </td>
      <td className="px-4 py-3 text-sm text-neutral-600">{booking.phone}</td>
      <td className="px-4 py-3 text-sm text-neutral-600">Room {booking.roomId}</td>
      <td className="px-4 py-3 text-sm text-neutral-600">{formatDate(booking.checkIn)}</td>
      <td className="px-4 py-3 text-sm text-neutral-600">{formatDate(booking.checkOut)}</td>
      <td className="px-4 py-3"><StatusBadge status={booking.status} /></td>
      <td className="px-4 py-3">
        <div className="flex gap-1 flex-wrap">
          {booking.status !== 'CONFIRMED' && (
            <button onClick={() => updateStatus('CONFIRMED')} disabled={isUpdating}
              className="text-xs bg-green-600 text-white px-2.5 py-1 rounded hover:bg-green-700 disabled:opacity-50 transition-colors">
              Confirm
            </button>
          )}
          {booking.status !== 'CANCELLED' && (
            <button onClick={() => updateStatus('CANCELLED')} disabled={isUpdating}
              className="text-xs bg-red-500 text-white px-2.5 py-1 rounded hover:bg-red-600 disabled:opacity-50 transition-colors">
              Cancel
            </button>
          )}
          {booking.status !== 'PENDING' && (
            <button onClick={() => updateStatus('PENDING')} disabled={isUpdating}
              className="text-xs bg-yellow-500 text-white px-2.5 py-1 rounded hover:bg-yellow-600 disabled:opacity-50 transition-colors">
              Pending
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function BookingsTab() {
  const [statusFilter, setStatusFilter] = useState<Booking['status'] | 'ALL'>('ALL');

  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: bookingService.getAll,
    refetchInterval: 30_000,
  });

  const total     = bookings?.length ?? 0;
  const pending   = bookings?.filter((b) => b.status === 'PENDING').length   ?? 0;
  const confirmed = bookings?.filter((b) => b.status === 'CONFIRMED').length ?? 0;
  const cancelled = bookings?.filter((b) => b.status === 'CANCELLED').length ?? 0;

  const filtered = statusFilter === 'ALL'
    ? bookings
    : bookings?.filter((b) => b.status === statusFilter);

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Bookings" value={total}     color="bg-primary"    />
        <StatCard label="Pending"        value={pending}   color="bg-yellow-500" />
        <StatCard label="Confirmed"      value={confirmed} color="bg-green-600"  />
        <StatCard label="Cancelled"      value={cancelled} color="bg-red-500"    />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-100">
        {/* Filter row */}
        <div className="px-6 py-4 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-semibold text-neutral-800">All Bookings</h3>
          <div className="flex gap-2 flex-wrap">
            {(['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'] as const).map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {isLoading && <Loader />}
        {error    && <ErrorState entity="bookings" />}
        {!isLoading && !error && (!filtered || filtered.length === 0) && (
          <EmptyState message="No bookings yet" />
        )}

        {filtered && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Room</th>
                  <th className="px-4 py-3">Check-in</th>
                  <th className="px-4 py-3">Check-out</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <BookingRow key={booking.id} booking={booking} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Messages Tab ──────────────────────────────────────────────────────────────

function MessageCard({ msg }: { msg: ContactMessage }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-neutral-100 rounded-lg p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <p className="font-semibold text-neutral-800">{msg.name}</p>
            <a href={`mailto:${msg.email}`}
              className="text-accent text-sm hover:underline truncate">
              {msg.email}
            </a>
          </div>
          <p className="text-xs text-neutral-400 mb-3">
            Received {new Date(msg.createdAt).toLocaleString('en-IN')}
          </p>
          <p className={`text-neutral-600 text-sm leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}>
            {msg.message}
          </p>
          {msg.message.length > 120 && (
            <button onClick={() => setExpanded(!expanded)}
              className="text-accent text-xs mt-1 hover:underline">
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        <a href={`mailto:${msg.email}?subject=Re: Your enquiry at Hotel Alwar Royal`}
          className="shrink-0 text-xs bg-primary text-white px-3 py-1.5 rounded hover:bg-primary-light transition-colors whitespace-nowrap">
          Reply
        </a>
      </div>
    </div>
  );
}

function MessagesTab() {
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: contactService.getAll,
    refetchInterval: 30_000,
  });

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Messages" value={messages?.length ?? 0} color="bg-primary" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-100">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h3 className="font-semibold text-neutral-800">Contact Messages</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Messages submitted via the Contact page. Click Reply to respond by email.
          </p>
        </div>

        {isLoading && <Loader />}
        {error     && <ErrorState entity="messages" />}
        {!isLoading && !error && (!messages || messages.length === 0) && (
          <EmptyState message="No messages yet" />
        )}

        {messages && messages.length > 0 && (
          <div className="p-4 space-y-3">
            {messages.map((msg) => (
              <MessageCard key={msg.id} msg={msg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard shell ───────────────────────────────────────────────────────────

type Tab = 'bookings' | 'messages';

function Dashboard() {
  const { dispatch } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('bookings');

  const handleLogout = () => {
    authService.logout().catch(() => {});
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-primary">Admin Dashboard</h2>
          <p className="text-neutral-500 text-sm">Hotel Alwar Royal — Management Panel</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg w-fit mb-6">
        {([
          { id: 'bookings', label: '🛏 Bookings' },
          { id: 'messages', label: '✉️ Messages' },
        ] as { id: Tab; label: string }[]).map(({ id, label }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-white text-primary shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'bookings' && <BookingsTab />}
      {activeTab === 'messages' && <MessagesTab />}

      <p className="text-xs text-neutral-400 mt-4 text-center">
        Data is stored in memory — connect PostgreSQL via <code>DATABASE_URL</code> to persist across restarts.
      </p>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { state } = useAuth();

  return (
    <>
      <Helmet>
        <title>Admin — Hotel Alwar Royal</title>
      </Helmet>
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {state.isAuthenticated ? <Dashboard /> : <LoginForm />}
      </section>
    </>
  );
}
