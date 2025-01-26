"use client";

import { useState } from "react";
import Search from "./Search";
import Gallery from "./Gallery";


type NasaItem = {
    data: {
        title: string;
        description: string;
        nasa_id: string;
    }[];
    links: {
        href: string; // Image URL
        rel: string;  // Relation type (e.g., preview)
        render: string; // Media type (e.g., image)
    }[];
}

type NasaApiResponse = {
    collection: {
        items: NasaItem[];
    };
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
        <div className="min-h-screen">
            <Search onSearch={fetchImages} />
            {images.length > 0 ? (
                <Gallery images={images} />
            ) : (
                <p className="p-4 text-center text-gray-600">
                    No images found. Try searching for something else!
                </p>
            )}
        </div>
    );
}

export default ImageLibraryPage;
