import React from "react";
import Link from "next/link";
import EarthquakesMap from "./EarthquakesMap";
import Title from "../_mapbox-components/TitleDescription";


export const metadata = {
    title: "Earthquakes Map",
    description: "Showing earthquake locations around the globe."
};

const Earthquakes = async () => {
    return (
        <main className="flex flex-col w-full h-[calc(100vh-96px)] p-[1%]">
            <Title
                title="Earthquakes Map"
                description={
                    <div>
                        <p>This map displays real-time earthquake activity worldwide.</p>

                        <p>Click on markers to view details.</p>

                        <div>
                            For more information, visit the{" "}
                            <Link
                                href="https://earthquake.usgs.gov"
                                className="text-blue-500 hover:underline"
                            >
                                USGS Earthquake Portal
                            </Link>.
                        </div>
                    </div>
                }
            />

            <div className="flex-1 min-h-0">
                <EarthquakesMap />
            </div>
        </main>
    );
}

export default Earthquakes;
