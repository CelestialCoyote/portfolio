import React from "react"; // Import React for React.ReactNode
import { FiCamera, FiGlobe, FiHome, FiImage, FiInfo } from "react-icons/fi";


// Define the type for each navigation item
export interface SidebarNavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
}

// Define the nav items array
export const sidebarNavItems: SidebarNavItem[] = [
    {
        href: "/",
        label: "Home",
        icon: <FiHome className="flex-shrink-0 w-6 h-6 mr-3" />
    },
    {
        href: "/nasa",
        label: "About the APIs",
        icon: <FiInfo className="flex-shrink-0 w-6 h-6 mr-3" />
    },
    {
        href: "/nasa/apod",
        label: "Astronomy Picture of the Day",
        icon: <FiCamera className="flex-shrink-0 w-6 h-6 mr-3" />
    },
    {
        href: "/nasa/image-library",
        label: "Image Library",
        icon: <FiImage className="flex-shrink-0 w-6 h-6 mr-3" />
    },
    {
        href: "/nasa/epic",
        label: "Earth Polychromatic Imaging Camera",
        icon: <FiGlobe className="flex-shrink-0 w-6 h-6 mr-3" />
    },
];
