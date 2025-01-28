import React from "react";
import NasaSidebar from "./_nasa-components/NasaSidebar";
import { ReactNode } from "react";


const NasaLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-[calc(100vh-96px)]">
            <NasaSidebar />

            {/* Main content area */}
            <main className="flex w-full lg:ml-[275px] mt-[64px]">
                {children}
            </main>
        </div>
    );
}

export default NasaLayout;
