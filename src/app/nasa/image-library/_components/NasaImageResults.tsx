"use client";

import React, { useState } from "react";
import Image from "next/image";
import NasaLibrarySearch from "./NasaLibraryISearch";
import NasaImageDetails from "./NasaImageDetails";
import { NasaItem } from "../interfaces/NasaImageInterfaces";


interface NasaImageResultsProps {
    items: NasaItem[];
    search: string;
}

const NasaImageResults: React.FC<NasaImageResultsProps> = ({ items, search }) => {
    const [details, setDetails] = useState(false);
    const [image, setImage] = useState<NasaItem | null>(null); // Properly type the image state

    return (
        <div className="flex flex-col h-[calc(100vh-5rem)] w-full items-center">
            {!details && <NasaLibrarySearch />}

            <label className="text-2xl text-purple-500 mt-4 mb-8">
                {`Showing results of search for "${search}"`}
            </label>

            <div className="flex flex-wrap justify-center gap-8 overflow-y-auto no-scrollbar mb-6">
                {!details &&
                    items &&
                    items
                        .filter((item) => item.links && item.links.length > 0) // Filter items to ensure links are defined
                        .map((item) => (
                            <div
                                key={item.links?.[0].href} // Use optional chaining for safety
                                className="flex flex-col w-72 overflow-hidden rounded-lg border-purple-400 border-2"
                            >
                                <div className="flex justify-center w-full h-48">
                                    <Image
                                        className="w-auto h-full rounded-2xl p-2"
                                        src={item.links?.[0].href || ""}
                                        alt={item.data[0].title}
                                        placeholder="blur"
                                        blurDataURL={item.links?.[0].href || ""}
                                        width="0"
                                        height="0"
                                        sizes="100vh"
                                    />
                                </div>

                                <div className="flex flex-col justify-between items-center h-48 p-4">
                                    <div>
                                        <p className="text-sm font-medium text-cyan-700">
                                            {item.data[0].date_created.slice(0, 10)}
                                        </p>

                                        <p className="mt-2 line-clamp-3">{item.data[0].title}</p>
                                    </div>

                                    <button
                                        className="w-32 rounded-lg cursor-pointer hover:underline border-purple-500 border-2 p-2"
                                        onClick={() => {
                                            setDetails(true);
                                            setImage(item); // Set the selected item as the image
                                        }}
                                    >
                                        DETAILS
                                    </button>
                                </div>
                            </div>
                        ))}

                {details && image && (
                    <NasaImageDetails
                        image={{
                            links: image.links || [], // Ensure links is defined
                            data: image.data,
                            keywords: image.keywords,
                        }}
                        setDetails={setDetails}
                    />
                )}
            </div>
        </div>
    );
}

export default NasaImageResults;
