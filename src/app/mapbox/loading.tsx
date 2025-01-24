import React from "react";

const Loading: React.FC<{ message?: string }> = ({ message = "Loading map..." }) => {
    return (
        <div className="absolute inset-0 flex bg-slate-300 bg-opacity-20 items-center justify-center z-10">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div> {/* Spinner */}
                <p className="text-black text-lg font-semibold">{message}</p>
            </div>
        </div>
    );
};

export default Loading;



// import React from "react";

// const Loading: React.FC<{ message?: string }> = ({ message = "Loading map..." }) => {
//     return (
//         <div className="absolute inset-0 flex bg-slate-300 bg-opacity-20 items-center justify-center z-10">
//             <div className="flex flex-col items-center">
//                 {/* Spinner */}
//                 <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
//                 {/* Progress Bar */}
//                 <div className="w-64 h-2 bg-gray-300 mb-4">
//                     <div className="h-full bg-blue-500 animate-pulse w-full"></div>
//                 </div>
//                 <p className="text-black text-lg font-semibold">{message}</p>
//             </div>
//         </div>
//     );
// };

// export default Loading;




// import React from "react";


// const Loading: React.FC<{ message?: string }> = ({ message = "Loading map..." }) => {
//     return (
//         <div className="absolute inset-0 flex bg-blue-300 bg-opacity-50 items-center justify-center z-10">
//             <p className="text-black text-lg font-semibold">
//                 {message}
//             </p>
//         </div>
//     );
// };

// export default Loading;