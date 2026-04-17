import { Helmet } from 'react-helmet-async';
import SectionHeading from '@/components/SectionHeading';
import GalleryGrid from '@/components/GalleryGrid';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&auto=format&fit=crop',
    alt: 'Hotel Lobby',
  },
  {
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80&auto=format&fit=crop',
    alt: 'Deluxe Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop',
    alt: 'Restaurant',
  },
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&auto=format&fit=crop',
    alt: 'Swimming Pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80&auto=format&fit=crop',
    alt: 'Suite Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80&auto=format&fit=crop',
    alt: 'Garden View',
  },
  {
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80&auto=format&fit=crop',
    alt: 'Conference Hall',
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80&auto=format&fit=crop',
    alt: 'Hotel Exterior',
  },
];

export default function Gallery() {
  return (
    <>
      <Helmet>
        <title>Gallery — Hotel Alwar Royal</title>
        <meta
          name="description"
          content="Browse photos of Hotel Alwar Royal — rooms, amenities, dining, and more."
        />
      </Helmet>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Gallery"
          subtitle="Take a visual tour of our hotel and discover the experience that awaits you."
        />
        <GalleryGrid images={galleryImages} />
      </section>
    </>
  );
}
