import React from "react";
import Link from "next/link";


const nasaApis = [
    {
        href: "/nasa/apod",
        label: "Astronomy Picture of the Day",
        description:
            "Each day a different image or video of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.",
    },
    {
        href: "/nasa/image-library",
        label: "NASA Image and Video Library",
        description:
            "Search NASA's official database of over 140,000 photos. Browse stunning images of outer space, astronauts, rocket launches, and much more.",
    },
    {
        href: "/nasa/epic",
        label: "EPIC: Earth Polychromatic Imaging Camera",
        description:
            "Daily imagery and data collected by the DSCOVR satellite's Earth Polychromatic Imaging Camera (EPIC) instrument.",
    },
];

const Nasa: React.FC = () => {
    return (
        <div className="flex flex-col w-full p-6">
            <h1 className="text-4xl mb-10">About NASA API</h1>

            <div className="space-y-10">
                {nasaApis.map((api) => (
                    <section key={api.href}>
                        <Link
                            href={api.href}
                            className="text-2xl mb-2 hover:text-purple-400"
                        >
                            {api.label}
                        </Link>

                        <p>{api.description}</p>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default Nasa;
