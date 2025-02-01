"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ApodSkeleton from "./ApodSkeleton";


interface ApodData {
    copyright: string;
    date: string;
    explanation: string;
    hdurl?: string;
    media_type: string;
    service_version: string,
    title: string;
    url: string;
}

const Apod: React.FC = () => {
    const [apod, setApod] = useState<ApodData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApod = async () => {
            try {
                const res = await fetch("/api/nasa/apod");
                // console.log("Response Status:", res.status);

                if (!res.ok) {
                    throw new Error(`Failed to fetch APOD. Status: ${res.status}`);
                }

                const data = await res.json();

                // console.log("Fetched Data:", data);
                setApod(data);
            } catch (err) {
                if (err instanceof Error) {
                    console.error("Fetch error:", err.message);
                    setError(err.message);
                } else {
                    console.error("Unknown error:", err);
                    setError("An unknown error occurred.");
                }
            }
        }

        fetchApod();
    }, []);


    return (
        <div className="">
            <h1 className="text-3xl text-center mt-4 mb-6">
                Astronomy Picture of the Day
            </h1>

            {error && <p className="text-red-500">{error}</p>}

            {apod ? (
                <div className="grid lg:grid-cols-2 lg:gap-4 p-8">
                    {apod.media_type === "video" ? (
                        <div className="relative h-[50vh] mb-4 lg:mb-0">
                            <iframe
                                className="absolute top-0 left-0 w-full border-0 rounded-t-lg lg:rounded-lg"
                                src={apod.url || "/images/NASA-logo.svg"}
                                title={apod.title || "NASA APOD Video"}
                                width="560"
                                height="349"
                                allowFullScreen
                            />
                        </div>
                    ) : apod.media_type === "image" ? (
                        <div className="flex items-center justify-center rounded-lg mb-4 lg:mb-0">
                            <Image
                                className="w-full h-full object-contain object-center rounded-lg"
                                src={apod.url || "/images/NASA-logo.svg"}
                                alt={apod.title || "NASA APOD Image"}
                                width={500}
                                height={500}
                                priority
                            />
                        </div>
                    ) : apod.media_type === "other" ? (
                        <div className="flex items-center justify-center rounded-lg mb-4 lg:mb-0">
                            <Image
                                className="w-full h-full object-contain object-center rounded-lg"
                                src={"/images/NASA-logo.svg"}
                                alt={apod.title || "NASA APOD Image"}
                                width={500}
                                height={500}
                                priority
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center rounded-lg mb-4 lg:mb-0">
                            <p>
                                Unsupported content type.
                            </p>
                        </div>
                    )}

                    <div className="p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg">
                        <p className="pt-2 text-primary lg:pt-0">{apod.date}</p>

                        <h1 className="py-2 text-4xl font-medium text-gray-200 glow">
                            {apod.title}
                        </h1>

                        {apod.copyright ? (
                            <h2 className="text-lg text-gray-400">
                                {`Credit: ${apod.copyright}`}
                            </h2>
                        ) : null}
                        <p className="pt-2 text-xl leading-relaxed text-gray-300">
                            {apod.explanation}
                        </p>
                    </div>
                </div>

            ) : (
                <ApodSkeleton />
            )}
        </div >
    );
}

export default Apod;
