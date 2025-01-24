import React from "react";
import NasaSidebar from "./_nasa-components/NasaSidebar";
import { ReactNode } from "react";


const NasaLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-[calc(100vh-96px)]">
            <div className="fixed left-0">
                <NasaSidebar currentIndex={1} />
            </div>

            {/* Main content area */}
            <main className="flex w-full ml-[275px]">
                {children}
            </main>
        </div>
    );
}

export default NasaLayout;
