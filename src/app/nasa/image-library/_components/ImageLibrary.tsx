"use client";

import { useEffect, useState } from "react";
import Search from "./Search";
import Gallery from "./Gallery";
import ImageLibrarySkeleton from "./ImageLibrarySkeleton";
// import { baseURL } from "@/app/api/baseURL";
import { NasaItem, NasaApiResponse } from "../types/nasa";
import { generateRandomTopic } from "../utils/generateTopic";


const ImageLibraryPage: React.FC = () => {
    const [images, setImages] = useState<NasaItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const fetchImages = async (query: string) => {
        setLoading(true);

        try {
            // const res = await fetch(`${baseURL}/api/nasa/image-library?q=${encodeURIComponent(query)}`);
            const res = await fetch(`/api/nasa/image-library?q=${encodeURIComponent(query)}`);
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to fetch images");
            }
    
            const data: NasaApiResponse = await res.json();
    
            setImages(data.collection?.items || []);
            setSearchTerm(query);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false); // End loading
        }
    }

    useEffect(() => {
        const topic = generateRandomTopic(); // Generate a random topic
        
        fetchImages(topic); // Fetch images for the random topic
    }, []);

    return (
        <div className="w-full min-h-screen">
            <h1 className="text-3xl text-center mt-4 mb-6">
                Image Library
            </h1>

            {loading ? (
                <ImageLibrarySkeleton />
            ) : (
                <>
                    <Search onSearch={fetchImages} />
                    {searchTerm && (
                        <label className="text-2xl text-purple-500 mt-4 mb-8 block text-center">
                            {`Showing results of search for "${searchTerm}"`}
                        </label>
                    )}
                    {images.length > 0 ? (
                        <Gallery images={images} />
                    ) : (
                        <p className="p-4 text-center text-gray-600">
                            No images found. Try searching for something else!
                        </p>
                    )}
                </>
            )}
        </div>
    );
}

export default ImageLibraryPage;
