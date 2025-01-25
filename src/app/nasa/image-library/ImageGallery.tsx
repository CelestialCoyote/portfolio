import Image from "next/image";

interface ImageGalleryProps {
  images: { href: string; title: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((img, idx) => (
        <div key={idx} className="relative shadow-lg">
          <Image
            src={img.href}
            alt={img.title}
            width={300}
            height={200}
            className="rounded-lg"
            style={{ objectFit: "cover" }}
          />
          <p className="mt-2 text-sm text-center text-gray-600">{img.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
