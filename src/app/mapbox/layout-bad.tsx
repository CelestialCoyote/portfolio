import React, { ReactNode } from "react";
import SideBar from "@/components/SideBar/SideBar";


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar />

            {/* Main content */}
            <div className="flex-1 p-2">
                {children}
            </div>
        </div>
    );
};

export default Layout;
