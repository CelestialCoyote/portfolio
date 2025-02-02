"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { sidebarNavItems } from "./sidebarNavItems";


const NasaSidebar: React.FC = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLinkClick = () => setIsOpen(false);

    return (
        <div className="relative">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-20 w-[275px] h-[calc(100vh-96px)] mt-[64px] bg-black transition-transform transform
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center p-4">
                        <div className="flex justify-center h-[100px]">
                            <Image
                                className="w-full h-full object-contain"
                                src="/images/NASA-logo.svg"
                                alt="NASA logo"
                                placeholder="blur"
                                blurDataURL="/images/NASA-logo.svg"
                                width="0"
                                height="0"
                                sizes="100vh"
                            />
                        </div>

                        <span className="text-xl font-bold text-white">NASA API Explorer</span>
                    </div>

                    <nav className="flex-1 mt-5" aria-label="Sidebar">
                        <div className="px-2 space-y-1">
                            {sidebarNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={
                                        `flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-purple-300
                                        ${pathname === item.href ? "bg-purple-600 text-white" : "text-white"}`
                                    }
                                    onClick={handleLinkClick}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Hamburger button for mobile */}
            <button
                className="absolute top-2 left-2 z-30 p-2 text-white bg-black rounded-md lg:hidden"
                onClick={toggleSidebar}
            >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
        </div>
    );
}

export default NasaSidebar;
