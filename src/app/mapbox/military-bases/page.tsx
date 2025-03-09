import React from "react";
import TitleDescription from "@/components/TitleDescription/TitleDescription";
import MilitaryBasesMap from "./MilitaryBasesMap";


export const metadata = {
    title: "Military Housing Allowance Map",
    description: "Housing allowance rates for 2025 by zip code."
}

const MilitaryBases: React.FC = () => {
    return (
        <main className="flex flex-col w-full h-[calc(100vh-96px)] p-[1%]">
            <TitleDescription
                title="US Military Bases"
                description={
                    <div>
                        <p>This map displays current military installations in the U.S. and can display the 2025 Basic Allowance for Housing based on zip code and pay grade of military personnel.</p>
                        
                        <p>Click on Select Military Service dropdown to choose a branch of service, select a military installation, and then click on zip code to see housing allowance.</p>

                        <p>Housing allowance data is fetched from MongoDB collection. Zip code boundaries appear at zoom level 6.00.</p>
                    </div>
                }
            />

            <div className="flex-1 min-h-0">
                <MilitaryBasesMap />
            </div>
        </main>
    );
}


export default MilitaryBases;
