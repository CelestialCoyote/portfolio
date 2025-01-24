"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { navData } from "./navData"; // Import navigation data
import NavLinksItem from "./NavLinksItem"; // Import the NavLinksItem component


// Define the props that the NavLinks component accepts.
interface NavLinksProps {
    open: boolean; // Indicates if the mobile menu is open
    setOpen: Dispatch<SetStateAction<boolean>>; // Function to toggle the mobile menu's state
}

// Functional component for rendering a list of navigation links.
const NavLinks: React.FC<NavLinksProps> = ({ open, setOpen }) => {
    // State to keep track of the currently active/open heading
    const [heading, setHeading] = useState("");

    // Function to close the mobile menu and reset the active heading
    const closeMobile = () => {
        if (open) {
            setOpen(false); // Close the mobile menu
            setHeading(""); // Reset the active heading
        }
    }

    return (
        <>
            {/* Filter out links that require authentication and render them */}
            {navData
                .filter((link) => !link.auth) // Exclude links that require authentication
                .map((link) => (
                    <NavLinksItem
                        key={link.id} // Unique key for each navigation item
                        link={link} // Pass the link data to the NavLinksItem component
                        heading={heading} // Pass the current active heading
                        setHeading={setHeading} // Function to update the active heading
                        closeMobile={closeMobile} // Function to handle closing the mobile menu
                    />
                ))}
        </>
    );
}

export default NavLinks;
