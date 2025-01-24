"use client";

import React, { useState } from "react";
import Link from "next/link";


const SideBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="">
            {/* Button to toggle sidebar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 fixed top-[64px] left-2 z-50"
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

            {/* Sidebar */}
            <div
                className={`fixed top-[32px] left-0 h-full bg-gray-800 p-4 transform transition-transform
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} z-40 md:w-64 w-48`}
                // style={{ top: "128px" }}  // Adjust the top position to be below the navbar
            >
                <div className="text-white mt-[64px]">
                    <h2 className="text-xl font-bold mb-4">Map Options</h2>

                    <ul>
                        <li>
                            <Link href="/mapbox/earthquakes">
                                <p className="block py-2 px-4 hover:bg-gray-700">Earthquakes</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/mapbox/military-bases">
                                <p className="block py-2 px-4 hover:bg-gray-700">Military Bases</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBar;



// import React, { useState } from "react";
// import Link from "next/link";

// const SideBar: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleSidebar = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className="relative">
//             {/* Sidebar Hamburger Button */}
//             <button
//                 onClick={toggleSidebar}
//                 className="md:hidden fixed top-4 left-4 p-3 bg-gray-800 text-white rounded-md focus:outline-none"
//             >
//                 <svg
//                     className="w-6 h-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                 >
//                     {isOpen ? (
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                         />
//                     ) : (
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M4 6h16M4 12h16m-7 6h7"
//                         />
//                     )}
//                 </svg>
//             </button>

//             {/* Sidebar (on mobile and desktop) */}
//             <div
//                 className={`${
//                     isOpen ? "translate-x-0" : "-translate-x-full"
//                 } md:translate-x-0 fixed inset-0 z-40 transition-all transform bg-gray-800 bg-opacity-75 md:relative md:bg-transparent md:opacity-100`}
//             >
//                 <div
//                     className={`${
//                         isOpen ? "w-64" : "w-0"
//                     } transition-all md:w-64 bg-gray-800 h-full p-4 text-white`}
//                 >
//                     {/* Sidebar links */}
//                     <ul className="space-y-4">
//                         <li>
//                             <Link href="/mapbox/earthquakes">
//                                 <p className="text-lg hover:text-gray-400">Earthquakes</p>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/mapbox/military-bases">
//                                 <p className="text-lg hover:text-gray-400">Military Bases</p>
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SideBar;
