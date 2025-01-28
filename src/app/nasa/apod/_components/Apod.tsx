import React from "react";
import Image from "next/image";
import ApodSkeleton from "./ApodSkeleton";
import { getApodData } from "../utils/getApodData";


const Apod: React.FC = async () => {
    const { rateLimitExceeded, data, message } = await getApodData();

    if (rateLimitExceeded) {
        return (
            <div className="text-2xl text-center pt-24">
                <p className="text-red-500">{message}</p>
            </div>
        );
    }

    if (!data) return (
        <div className="text-2xl text-center pt-24">
            No photo data
        </div>
    );

    if (!data) return <ApodSkeleton />;

    return (
        <div className="">
            <h1 className="text-3xl text-center mt-4 mb-6">
                Astronomy Photo of the Day
            </h1>

            <div className="grid lg:grid-cols-2 lg:gap-4 p-8">
                {data.media_type === "video" ? (
                    <div className="relative h-[50vh] mb-4 lg:mb-0">
                        <iframe
                            className="absolute top-0 left-0 w-full border-0 rounded-t-lg lg:rounded-lg"
                            src={data.url || "/images/NASA-logo.svg"}
                            title={data.title || "NASA APOD Video"}
                            width="560"
                            height="349"
                            allowFullScreen
                        />
                    </div>
                ) : data.media_type === "image" ? (
                    <div className="flex items-center justify-center rounded-lg mb-4 lg:mb-0">
                        <Image
                            className="w-full h-full object-contain object-center rounded-lg"
                            src={data.url || "/images/NASA-logo.svg"}
                            alt={data.title || "NASA APOD Image"}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                ) : data.media_type === "other" ? (
                    <div className="flex items-center justify-center rounded-lg mb-4 lg:mb-0">
                        <Image
                            className="w-full h-full object-contain object-center rounded-lg"
                            src={"/images/NASA-logo.svg"}
                            alt={data.title || "NASA APOD Image"}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center rounded-lg mb-4 lg:mb-0">
                        {/* <p>
                            Unsupported content type.
                        </p> */}
                        <p>
                            {JSON.stringify(data.data.title)}
                        </p>
                    </div>
                )}

                <div className="p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg">
                    <p className="pt-2 text-primary lg:pt-0">{data.date}</p>

                    <h1 className="py-2 text-4xl font-medium text-gray-200 glow">
                        {data.title}
                    </h1>

                    {data.copyright ? (
                        <h2 className="text-lg text-gray-400">
                            {`Credit: ${data.copyright}`}
                        </h2>
                    ) : null}
                    <p className="pt-2 text-xl leading-relaxed text-gray-300">
                        {data.explanation}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Apod;
