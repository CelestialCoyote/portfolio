import React from "react";
import MilitaryBasesMap from "./MilitaryBasesMap";


export const metadata = {
    title: "Military Housing Allowance Map",
    description: "Housing allowance rates for 2025 by zip code."
};

const MilitaryBases = async () => {
    return (
        // <main className="flex flex-col w-full h-screen px-[2%] pt-[60px] pb-[40px]">
        <main className="w-full h-[calc(100vh-96px)] p-[1%]">
            <div className="flex justify-center items-center text-3xl font-bold my-2">
                Miltary Bases Map
            </div>

            <div className="h-[93%] max-h-[93%]">
                <MilitaryBasesMap />
            </div>
        </main>
    );
}


export default MilitaryBases;
