import React from "react";


const ApodSkeleton: React.FC = () => {
    return (
        <div className="">
            <div className="grid lg:grid-cols-2 lg:gap-4 p-8">
                {/* Media Skeleton */}
                <div className="relative h-[50vh] mb-4 lg:mb-0 animate-pulse bg-gray-800 rounded-lg"></div>

                {/* Info Skeleton */}
                <div className="p-4 bg-black rounded-lg sm:p-8">
                    <div className="h-5 w-24 bg-gray-800 rounded animate-pulse mb-4"></div>
                    <div className="h-8 w-3/4 bg-gray-800 rounded animate-pulse mb-4"></div>
                    <div className="h-5 w-1/2 bg-gray-800 rounded animate-pulse mb-4"></div>
                    <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}

export default ApodSkeleton;
