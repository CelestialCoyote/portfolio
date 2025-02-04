"use client";

import React, { useState } from "react";
import Image from "next/image";
import Details from "./Details";
import { NasaItem } from "../types/nasa";


interface GalleryProps {
    images: NasaItem[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [details, setDetails] = useState(false);
    const [image, setImage] = useState<NasaItem | null>(null); // Properly type the image state

    return (
        <div className="flex flex-wrap justify-center gap-8 overflow-y-auto no-scrollbar mb-6">
            {!details &&
                images.map((item) => {
                    const data = item.data[0]; // Access the first data object
                    const link = item.links?.[0]; // Access the first link object

                    return (
                        <div
                            key={data.nasa_id}
                            className="flex flex-col w-72 overflow-hidden rounded-lg border-purple-400 border-2"
                        >
                            <div className="flex justify-center w-full h-48">
                                <Image
                                    className="w-auto h-full rounded-2xl p-2"
                                    src={link?.href || ""}
                                    alt={data.title}
                                    placeholder="blur"
                                    blurDataURL={link?.href || ""}
                                    width="0"
                                    height="0"
                                    sizes="100vh"
                                />
                            </div>

                            <div className="flex flex-col justify-between h-48 p-4">
                                <div className="flex flex-col items-center">
                                    <p className="text-sm font-medium text-cyan-700">
                                        {data.date_created.slice(0, 10)}
                                    </p>

                                    <p className="text-center text-purple-700 font-semibold mt-2">
                                        {data.title}
                                    </p>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        className="flex justify-center items-center bg-black text-white font-bold w-[150px] gap-x-2 border-purple-500 border-2 rounded-lg p-2 hover:bg-purple-700"
                                        onClick={() => {
                                            setDetails(true);
                                            setImage(item); // Set the selected item as the image
                                        }}
                                    >
                                        DETAILS
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

            {details && image && (
                <Details
                    image={image}
                    setDetails={setDetails}
                />
            )}
        </div>
    );
}

export default Gallery;
