"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ApodData {
    title: string;
    explanation: string;
    url: string;
    hdurl?: string;
    date: string;
    media_type: string;
}

export default function ApodPage() {
    const [apod, setApod] = useState<ApodData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApod = async () => {
            try {
                console.log("Fetching APOD...");
                const res = await fetch("/api/nasa/apod");
                console.log("Response Status:", res.status);

                if (!res.ok) {
                    throw new Error(`Failed to fetch APOD. Status: ${res.status}`);
                }

                const data = await res.json();
                console.log("Fetched Data:", data); // Check API response format

                setApod(data); // Ensure `data.data` is correct
            } catch (err) {
                if (err instanceof Error) {
                    console.error("Fetch error:", err.message);
                    setError(err.message);
                } else {
                    console.error("Unknown error:", err);
                    setError("An unknown error occurred.");
                }
            }
        };

        fetchApod();
    }, []);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold mb-4">Astronomy Picture of the Day</h1>

            {error && <p className="text-red-500">{error}</p>}

            {apod ? (
                <div className="max-w-2xl text-center">
                    <h2 className="text-2xl font-semibold mb-2">{apod.title}</h2>
                    <p className="text-sm text-gray-400 mb-4">{apod.date}</p>

                    {apod.media_type === "image" ? (
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
                        // <div className="w-[400px] h-[400px]">
                        //     <Image
                        //         className="w-full rounded-lg shadow-lg mb-4"
                        //         src={apod.url}
                        //         alt={apod.title}
                        //     />
                        // </div>
                    ) : (
                        <iframe
                            src={apod.url}
                            title={apod.title}
                            className="w-full h-64 mb-4"
                            allowFullScreen
                        ></iframe>
                    )}

                    <p className="text-lg">{apod.explanation}</p>
                </div>
            ) : (
                <p className="text-gray-400">Loading...</p>
            )}
        </div>
    );
}
