import React, { useState } from 'react';

const images = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/seed/aigallery${i + 1}/600/600`,
  alt: `AI Generated Artwork ${i + 1}`,
}));

const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-super-light">AI Art Gallery</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-light">
          A collection of artworks generated using various AI models. This gallery is a hobby, showcasing a passion for the creative potential of artificial intelligence.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="aspect-square bg-secondary rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImg(img.src)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
