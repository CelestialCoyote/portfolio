import React from "react";


// Define the props interface to accept a message prop
interface SkeletonProps {
    message: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ message }) => {
    return (
        <div className="relative inset-0 flex bg-gray-300 bg-opacity-20 w-full h-full rounded-xl z-10">
            {/* Skeleton map container */}
            <div className="flex bg-gray-400 justify-center items-center w-full h-[90%] animate-pulse rounded-lg m-4">
                <p className="text-black text-lg font-semibold">
                    {message}
                </p>
            </div>
        </div>
    );
}

export default Skeleton;
