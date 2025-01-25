"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";


type NasaItem = {
    data: {
        title: string;
        description: string;
        nasa_id: string;
    }[];
    links: {
        href: string;
        rel: string;
        render: string;
    }[];
}

type NasaApiResponse = {
    collection: {
        items: NasaItem[];
    }
}

const ImageLibraryPage: React.FC = () => {
    const [images, setImages] = useState<{ href: string; title: string }[]>([]);

    const fetchImages = async (query: string) => {
        try {
            const res = await fetch(
                `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`
            );
            const data: NasaApiResponse = await res.json();

            const imageResults =
                data.collection?.items?.map((item: NasaItem) => ({
                    href: item.links?.[0]?.href || "",
                    title: item.data?.[0]?.title || "Untitled",
                })) || [];

            setImages(imageResults);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <SearchBar onSearch={fetchImages} />

            {images.length > 0 ? (
                <ImageGallery images={images} />
            ) : (
                <p className="p-4 text-center text-gray-600">
                    No images found. Try searching for something else!
                </p>
            )}
        </div>
    );
}

export default ImageLibraryPage;
