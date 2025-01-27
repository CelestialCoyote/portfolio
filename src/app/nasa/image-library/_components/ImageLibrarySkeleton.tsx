"use client";

const ImageLibrarySkeleton: React.FC = () => {
    return (
        <div className="w-full min-h-screen p-4 space-y-8">
            {/* Skeleton for Search */}
            <div className="flex items-center gap-4 animate-pulse">
                <div className="w-full h-14 bg-gray-800 rounded-lg"></div>

                <div className="w-24 h-14 bg-gray-800 rounded-lg"></div>
            </div>

            {/* Skeleton for Search Results Label */}
            <div className="h-8 w-1/2 mx-auto bg-gray-800 rounded-lg animate-pulse"></div>

            {/* Skeleton for Gallery */}
            <div className="flex flex-wrap justify-center gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col w-72 h-96 bg-gray-800 rounded-lg animate-pulse"
                    >
                        {/* Image placeholder */}
                        <div className="h-48 bg-gray-600 rounded-t-lg"></div>
                        
                        {/* Text placeholders */}
                        <div className="flex flex-col justify-between h-48 p-4">
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-600 rounded"></div>

                                <div className="h-6 bg-gray-600 rounded"></div>
                            </div>
                            
                            <div className="w-32 h-10 bg-gray-600 rounded mx-auto"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageLibrarySkeleton;
