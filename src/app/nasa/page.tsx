import React from "react";


const Nasa: React.FC = () => {
    return (
        <div className="flex flex-col w-full p-6">
            <h1 className="text-4xl mb-10">
                About NASA API
            </h1>

            <div className="space-y-10">
                <section>
                    <h2 className="text-2xl mb-2">
                        Astronomy Picture of the Day
                    </h2>

                    <p>
                        Each day a different image or video of our fascinating universe is
                        featured, along with a brief explanation written by a professional
                        astronomer.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl mb-2">
                        NASA Image and Video Library
                    </h2>

                    <p>
                        Search NASA&apos;s official database of over 140,000 photos. Browse
                        stunning images of outer space, astronauts, rocket launches, and
                        much more.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl mb-2">
                        EPIC: Earth Polychromatic Imaging Camera
                    </h2>

                    <p>
                        Daily imagery and data collected by the DSCOVR satellite&apos;s Earth
                        Polychromatic Imaging Camera (EPIC) instrument.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Nasa;
