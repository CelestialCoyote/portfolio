import React from "react";
import Epic from "./_components/Epic";


const EpicPage: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Epic />
        </div>
        // <main className="flex flex-col w-full">
        //     <h1 className="text-3xl text-center mt-4 mb-6">
        //         EPIC: Earth Polychromatic Imaging Camera
        //     </h1>

        //     <Epic />
        // </main>
    );
}

export default EpicPage;
