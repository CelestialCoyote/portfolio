import React from "react";
import Title from "../_mapbox-components/TitleDescription";
import MilitaryBasesMap from "./MilitaryBasesMap";


export const metadata = {
    title: "Military Housing Allowance Map",
    description: "Housing allowance rates for 2025 by zip code."
}

const MilitaryBases = async () => {
    return (
        <main className="w-full h-[calc(100vh-96px)] p-[1%]">
            <Title
                title="US Military Base"
                description={
                    <div>
                        <p>This map displays current military installations in the U.S.</p>
                        
                        <p>Click on Select Military Service dropdown to choose a branch of service.</p>
                    </div>
                }
            />

            <div className="h-[93%] max-h-[93%]">
                <MilitaryBasesMap />
            </div>
        </main>
    );
}


export default MilitaryBases;
