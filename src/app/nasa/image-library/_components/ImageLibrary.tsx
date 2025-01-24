import React from "react";
import NasaImageResults from "./NasaImageResults";
import { NasaApiResponse } from "../interfaces/NasaImageInterfaces";


const baseURL = process.env.BASE_API_URL;

const getLibraryData = async (query: string): Promise<NasaApiResponse> => {
    try {
        const response = await fetch(
            `${baseURL}/nasa/image-library?q=${query}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data from the local API");
        }

        return response.json();
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to handle it in the caller
    }
}


const ImageLibrary: React.FC = async () => {
    const generateRandomTopic = (): string => {
        const topics = [
            "neil armstrong",
            "apollo",
            "space shuttle",
            "artemis",
            "voyager",
            "pluto",
            "supernova",
        ];

        return topics[Math.floor(Math.random() * topics.length)];
    }

    const query = generateRandomTopic();
    let data: NasaApiResponse;

    try {
        data = await getLibraryData(query);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return <p>Error fetching data: {errorMessage}</p>;
    }

    const items = data.collection.items;

    if (!items || items.length === 0) return <p>No photo data</p>;

    return (
        <div>
            <h1 className="text-3xl text-center mt-4 mb-6">
                Image Library
            </h1>

            <div className="flex flex-col items-center overflow-y-auto no-scrollbar mb-6">
                <NasaImageResults
                    items={items}
                    search={query}
                />
            </div>
        </div>
    );
}

export default ImageLibrary;
