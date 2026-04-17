import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Rooms = lazy(() => import('@/pages/Rooms'));
const RoomDetail = lazy(() => import('@/pages/RoomDetail'));
const Amenities = lazy(() => import('@/pages/Amenities'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Contact = lazy(() => import('@/pages/Contact'));
const Booking = lazy(() => import('@/pages/Booking'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <SuspenseWrapper><Home /></SuspenseWrapper> },
      { path: 'about', element: <SuspenseWrapper><About /></SuspenseWrapper> },
      { path: 'rooms', element: <SuspenseWrapper><Rooms /></SuspenseWrapper> },
      { path: 'rooms/:id', element: <SuspenseWrapper><RoomDetail /></SuspenseWrapper> },
      { path: 'amenities', element: <SuspenseWrapper><Amenities /></SuspenseWrapper> },
      { path: 'gallery', element: <SuspenseWrapper><Gallery /></SuspenseWrapper> },
      { path: 'contact', element: <SuspenseWrapper><Contact /></SuspenseWrapper> },
      { path: 'booking', element: <SuspenseWrapper><Booking /></SuspenseWrapper> },
      { path: 'admin', element: <SuspenseWrapper><AdminDashboard /></SuspenseWrapper> },
    ],
  },
]);
