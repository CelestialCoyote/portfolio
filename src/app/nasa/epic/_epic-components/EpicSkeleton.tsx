import React from "react";


const EpicSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col">
            <div className="flex px-[10px]">
                <div className="relative flex items-center justify-center w-1/2">
                    {/* Left Button Skeleton */}
                    <div className="absolute left-0 z-10 mx-[10px] p-2 bg-gray-500 rounded-full animate-pulse w-10 h-10"></div>

                    {/* Image Skeleton */}
                    <div className="flex w-full h-full justify-center items-center border-2 border-gray-500 rounded-lg">
                        <div className="w-[80%] h-[100%] bg-gray-600 animate-pulse rounded-lg"></div>
                    </div>

                    {/* Right Button Skeleton */}
                    <div className="absolute right-0 z-10 mx-[10px] p-2 bg-gray-500 rounded-full animate-pulse w-10 h-10"></div>
                </div>

                <div className="flex flex-col justify-between w-1/2 px-4">
                    <div>
                        {/* Date Header Skeleton */}
                        <div className="flex justify-center items-center h-[40px] bg-gray-500 animate-pulse rounded mb-4"></div>

                        {/* Calendar Skeleton */}
                        <div className="h-40 bg-gray-500 animate-pulse rounded mb-4"></div>

                        {/* Image Data Section Skeleton */}
                        <div className="h-8 w-1/2 bg-gray-500 animate-pulse rounded mx-auto mb-4"></div>

                        <div className="mt-4 space-y-4">
                            {/* Distance Metrics Skeleton */}
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="h-5 w-32 bg-gray-500 animate-pulse rounded"></div>
                                    <div className="h-5 w-24 bg-gray-500 animate-pulse rounded mt-2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thumbnail Skeletons */}
            <div className="flex justify-center mt-6 space-x-4 overflow-x-auto">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-20 h-20 rounded-md bg-gray-600 animate-pulse border-2 border-gray-500"
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default EpicSkeleton;
