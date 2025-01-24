"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";


const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <nav className="fixed top-0 left-0 bg-gray-800 text-white w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="">
                        <div className="flex justify-center h-[100px] mr-4">
                            <Image
                                className="w-full h-full object-contain"
                                src="/images/celestial-coyote.svg"
                                alt="celestial coyote logo"
                                placeholder="blur"
                                blurDataURL="/images/celestial-coyote.svg"
                                width="0"
                                height="0"
                                sizes="100vh"
                            />
                        </div>
                    </Link>

                    {/* Centered Navigation Links */}
                    <div className="flex-1 hidden md:flex justify-center space-x-6">
                        <Link href="/" className="hover:text-gray-300">
                            Home
                        </Link>

                        <Link href="/about" className="hover:text-gray-300">
                            About
                        </Link>

                        <Link href="/mapbox/military-bases" className="hover:text-gray-300">
                            Map
                        </Link>
                    </div>


                    {/* Hamburger Menu (Mobile) */}
                    <div className="md:hidden">
                        <button
                            className="text-gray-400 hover:text-white focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/" className="block px-3 py-2 hover:text-gray-300">
                            Home
                        </Link>

                        <Link href="/about" className="block px-3 py-2 hover:text-gray-300">
                            About
                        </Link>

                        <Link href="/map" className="block px-3 py-2 hover:text-gray-300">
                            Map
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
