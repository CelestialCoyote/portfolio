import React from "react";

// Define the props interface to accept a message prop
interface SkeletonProps {
    message: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ message }) => {
    return (
        <div className="absolute inset-0 flex bg-slate-300 bg-opacity-20 items-center justify-center z-10">
            <div className="flex flex-col items-center space-y-4">
                {/* Skeleton map container */}
                <div className="w-full h-72 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
                
                {/* Skeleton controls */}
                <div className="w-24 h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="w-24 h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                
                {/* Display dynamic message */}
                <p className="text-black text-lg font-semibold">{message}</p>
            </div>
        </div>
    );
};

export default Skeleton;
