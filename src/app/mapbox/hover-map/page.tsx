import React from "react";
import TitleDescription from "@/components/TitleDescription/TitleDescription";
import HoverMap from "./HoverMap";


export const metadata = {
    title: "Military Housing Allowance Map",
    description: "Housing allowance rates for 2025 by zip code."
}

const MilitaryBases: React.FC = () => {
    return (
        <main className="flex flex-col w-full h-[calc(100vh-96px)] p-[1%]">
            <TitleDescription
                title="Hover Map Example"
                description={
                    <div>
                        <p>This map displays current military installations in the U.S.</p>
                        
                        <p>Click on Select Military Service dropdown to choose a branch of service.</p>
                    </div>
                }
            />

            <div className="flex-1 min-h-0">
                <HoverMap />
            </div>
        </main>
    );
}


export default MilitaryBases;
