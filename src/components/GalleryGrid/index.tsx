import { useState } from 'react';

interface GalleryGridProps {
  images: { src: string; alt: string }[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="overflow-hidden rounded-lg aspect-square focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-label="Image viewer"
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-accent"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close"
          >
            &times;
          </button>

          <button
            className="absolute left-4 text-white text-3xl hover:text-accent"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
            }}
            aria-label="Previous image"
          >
            &#8249;
          </button>

          <img
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 text-white text-3xl hover:text-accent"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
            }}
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
