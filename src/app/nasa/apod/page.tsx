import Image from "next/image";


// const baseURL = process.env.BASE_API_URL;

const getAPODData = async () => {
    try {
        // Simulate a delay for development
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch(
            // `${baseURL}/nasa/apod`,
            `/api/nasa/apod`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch APOD data");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default async function Apod() {
    const data = await getAPODData();

    if (!data) return (
        <div className="text-2xl text-center pt-24">
            No photo data
        </div>
    );

    return (
        <div className="">
            <h1 className="text-3xl text-center mt-4 mb-6">
                Astronomy Photo of the Day
            </h1>

            <div className="grid lg:grid-cols-2 lg:gap-4 p-8">
                {data.media_type === "video" ? (
                    <div className="relative h-[50vh] mb-4 lg:mb-0">
                        <iframe
                            className="absolute top-0 left-0 w-full rounded-t-lg lg:rounded-lg"
                            src={data.url || "/images/NASA-logo.svg"}
                            title={data.title || "NASA APOD Video"}
                            width="560"
                            height="349"
                            frameBorder="0"
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
                        <p>
                            Unsupported content type.
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
