import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";


// Define the structure of a single navigation link.
interface LinkType {
    id: number; // Unique identifier for the link
    label: string; // The text displayed for the link
    link: string; // The URL the link points to
    submenu?: boolean; // Indicates if the link has a submenu
    sublinks?: LinkType[]; // Array of sublinks, if it has a submenu
}

// Define the props that the NavLinksItem component accepts.
interface NavLinksItemProps {
    link: LinkType; // The link data for this item
    heading: string; // The current open heading in the navigation
    setHeading: Dispatch<SetStateAction<string>>; // Function to update the open heading
    closeMobile: () => void; // Function to close the mobile navigation menu
}

// Functional component for rendering a single navigation link.
const NavLinksItem: React.FC<NavLinksItemProps> = ({
    link,
    heading,
    setHeading,
    closeMobile,
}) => {
    return (
        <div className="">
            {/* Wrapper for each navigation item */}
            <div className="py-5 cursor-pointer group">
                {/* Main link or submenu trigger */}
                <div
                    className="flex justify-between items-center md:pr-0 group"
                    onClick={() => setHeading(heading !== link.label ? link.label : "")}
                >
                    {/* Render a simple link if no submenu */}
                    {!link.submenu && (
                        <Link href={link.link} className="w-full">
                            <div
                                className="w-full py-4 hover:text-blue-500"
                                onClick={closeMobile} // Close mobile menu on link click
                            >
                                {link.label}
                            </div>
                        </Link>
                    )}

                    {/* Render a submenu trigger if there are sublinks */}
                    {link.submenu && (
                        <div className="flex justify-between w-full py-4 hover:text-blue-500">
                            {link.label}
                            {/* Arrow icon for desktop */}
                            <span className="text-xl md:mt-1 md:ml-2 md:block hidden duration-300 group-hover:rotate-180 group-hover:-mt-2">
                                <IoIosArrowDown />
                            </span>
                            
                            {/* Arrow icon for mobile */}
                            <span className="text-xl md:hidden">
                                <IoIosArrowDown />
                            </span>
                        </div>
                    )}
                </div>

                {/* Desktop submenu dropdown */}
                {link.submenu && (
                    <div className="absolute top-16 hidden group-hover:md:block hover:md:block">
                        <div className="flex flex-col bg-gray-800 gap-y-2">
                            {/* Render each sublink */}
                            {link.sublinks?.map((item) => (
                                <Link href={item.link} key={item.id}>
                                    <div className="text-white hover:bg-gray-700 hover:text-blue-500 w-full p-5">
                                        {item.label}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile submenu */}
            <div className={`${heading === link.label ? "md:hidden" : "hidden"}`}>
                {link.sublinks?.map((item) => (
                    <div key={item.id}>
                        <Link
                            href={item.link}
                            className="w-full"
                            onClick={closeMobile} // Close mobile menu on sublink click
                        >
                            <div className="font-semibold py-4 pl-8 hover:bg-slate-700 hover:text-blue-500 w-full">
                                {item.label}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavLinksItem;
