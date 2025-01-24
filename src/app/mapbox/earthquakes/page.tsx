import React from "react";
import EarthquakesMap from "./EarthquakesMap";


export const metadata = {
    title: "Military Housing Allowance Map",
    description: "Housing allowance rates for 2025 by zip code."
};

const Earthquakes = async () => {
    return (
        <main className="flex flex-col w-full h-screen px-[2%] pt-[60px] pb-[40px]">
            <div className="flex justify-center items-center text-3xl font-bold my-2">
                Earthquakes Map
            </div>

            <div className="h-[85%] max-h-[85%]">
                <EarthquakesMap />
            </div>
        </main>
    );
}


export default Earthquakes;
