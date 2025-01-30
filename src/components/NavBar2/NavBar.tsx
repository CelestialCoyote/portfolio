"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import NavLinks from "./_navbar-components/NavLinks";


const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);    // State to toggle the visibility of the mobile menu

    return (
        <nav className="fixed top-0 left-0 flex items-center justify-between bg-gray-800 text-white w-full h-[64px] font-medium px-4 z-50">
            {/* Left Section: Logo and Menu Icon */}
            <div className="flex justify-between items-center w-full px-5 z-20 md:w-auto">
                {/* Logo linking back to the homepage */}
                <Link href="/" className="">
                    <div className="flex justify-center w-[64px] h-[64px]">
                        <Image
                            className="w-full h-auto object-contain"
                            src="/images/celestial-coyote.png"
                            alt="celestial coyote logo"
                            placeholder="blur"
                            blurDataURL="/images/celestial-coyote.png"
                            width="0"
                            height="0"
                            sizes="100vh"
                        />
                    </div>
                </Link>

                {/* Mobile Menu Toggle Icon */}
                {open ? (
                    // Close icon, shown when the mobile menu is open
                    <AiOutlineClose
                        onClick={() => setOpen(!open)} // Toggles the mobile menu
                        className="w-[40px] h-[40px] text-red-500 md:hidden cursor-pointer" // Red close icon for mobile
                    />
                ) : (
                    // Menu icon, shown when the mobile menu is closed
                    <FiMenu
                        onClick={() => setOpen(!open)} // Toggles the mobile menu
                        className="w-[40px] h-[40px] md:hidden cursor-pointer" // White menu icon for mobile
                    />
                )}
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden gap-x-8 md:flex">
                <NavLinks open={open} setOpen={setOpen} /> {/* Render NavLinks component */}
            </div>

            {/* Render spaceholder component */}
            <div className="w-[100px] hidden gap-x-8 md:flex">
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={
                    `fixed top-16 bottom-0 bg-black w-full overflow-y-auto px-4 py-6 duration-500 md:hidden
                    ${open ? "right-0" : "right-[-100%]"}`
                } // Slide-in animation for mobile menu
            >
                <NavLinks open={open} setOpen={setOpen} /> {/* Render NavLinks for mobile */}
            </div>
        </nav>
    );
}

export default Navbar;
