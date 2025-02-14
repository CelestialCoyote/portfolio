"use client";

import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";


interface TitleProps {
    title: string;
    description: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ title, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex items-center gap-6 text-3xl font-bold mb-2">
                {title}

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-500 transition-transform transform hover:scale-125 hover:text-blue-300"
                    aria-label="Toggle information"
                >
                    <FaInfoCircle size={24} />
                </button>
            </div>

            <div
                className={
                    `overflow-hidden transition-all duration-1000 ease-in-out
                    ${isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`
                }
            >
                <div className="text-gray-200 text-center px-4 pb-6">
                    {description}
                </div>
            </div>
        </div>
    );
}

export default Title;
