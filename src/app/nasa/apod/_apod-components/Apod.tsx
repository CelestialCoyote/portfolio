"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardDoubleArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowRight } from "react-icons/md";
import ApodSkeleton from "./ApodSkeleton";
import { getApodData } from "../_apod-utils/getApodData";
import { ApodData } from "../types/apodTypes";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";


const Apod: React.FC = () => {
    const [apod, setApod] = useState<ApodData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        fetchApod();
    }, []);

    const fetchApod = async (date?: string) => {
        setApod(null);
        setError(null);

        const { data, message } = await getApodData(date);
        if (message) {
            setError(message);
        } else {
            setApod(data);
        }
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    }

    const handleFetchForDate = () => {
        if (selectedDate) {
            console.log(selectedDate)
            const formattedDate = selectedDate.toISOString().split("T")[0];

            fetchApod(formattedDate);
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl text-center mb-6">
                Astronomy Picture of the Day
            </h1>

            <div className="flex flex-col items-center h-[100px] mt-2">
                <button
                    className="flex justify-center items-center bg-black text-white font-bold w-[170px] gap-x-2 border-purple-500 border-2 rounded-lg p-2 hover:bg-purple-700"
                    onClick={() => setShowCalendar(prev => !prev)}
                >
                    {showCalendar ? "Hide Calendar" : "Show Calendar"}
                    {!showCalendar && <FaRegCalendarDays className="text-purple-500 w-[20px] h-[20px]" />}
                </button>

                {showCalendar &&
                    <div className="flex justify-center items-center mt-2 mb-2 space-x-2">
                        <div className="flex justify-center w-[225px]">
                            {/* <DatePicker
                                className="custom-datepicker"
                                minDate={new Date("1995-06-20")}
                                maxDate={new Date()}
                                isClearable
                                showYearDropdown
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Choose a date"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                
                            /> */}
                            <DatePicker
                                className="custom-datepicker"
                                minDate={new Date("1995-06-20")}
                                maxDate={new Date()}
                                isClearable
                                showYearDropdown
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Choose a date"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                renderCustomHeader={({
                                    date,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                    decreaseYear,
                                    increaseYear
                                }) => (
                                    <div className="flex justify-between items-center bg-purple-400 text-black px-4 py-2">
                                        {/* << Button (Previous Year) */}
                                        <button
                                            onClick={decreaseYear}
                                            disabled={prevMonthButtonDisabled}
                                            className="text-2xl font-bold"
                                        >
                                            <MdKeyboardDoubleArrowLeft />
                                        </button>

                                        {/* < Button (Previous Month) */}
                                        <button
                                            onClick={decreaseMonth}
                                            disabled={prevMonthButtonDisabled}
                                            className="text-2xl font-bold"
                                        >
                                            <MdKeyboardArrowLeft />
                                        </button>

                                        {/* Current Month & Year */}
                                        <span className="font-semibold">
                                            {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
                                        </span>

                                        {/* > Button (Next Month) */}
                                        <button
                                            onClick={increaseMonth}
                                            disabled={nextMonthButtonDisabled}
                                            className="text-2xl font-bold"
                                        >
                                            <MdKeyboardArrowRight />
                                        </button>

                                        {/* >> Button (Next Year) */}
                                        <button
                                            onClick={increaseYear}
                                            disabled={nextMonthButtonDisabled}
                                            className="text-2xl font-bold"
                                        >
                                            <MdKeyboardDoubleArrowRight />
                                        </button>
                                    </div>
                                )}
                            />
                        </div>

                        <button
                            className="bg-black text-white font-bold text-center w-[100px] border-purple-500 border-2 rounded-[10px] px-2 py-2 hover:bg-purple-700"
                            onClick={handleFetchForDate}
                        >
                            Get Image
                        </button>
                    </div>
                }
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {apod ? (
                <div className="grid lg:grid-cols-2 lg:gap-4 p-8">
                    {apod.media_type === "video" ? (
                        <div className="relative h-[50vh] mb-4 lg:mb-0">
                            <iframe
                                className="absolute top-0 left-0 w-full border-0 rounded-lg"
                                src={apod.url}
                                title={apod.title}
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Image
                                className="w-full h-full object-contain rounded-lg"
                                src={apod.url}
                                alt={apod.title}
                                width={500}
                                height={500}
                                priority
                            />
                        </div>
                    )}

                    <div className="p-4 bg-black rounded-lg">
                        <p className="text-primary">
                            {apod.date}
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-200">
                            {apod.title}
                        </h2>

                        {apod.copyright && (
                            <p className="text-sm text-gray-400">
                                {`Credit: ${apod.copyright}`}
                            </p>
                        )}

                        <p className="text-gray-300">
                            {apod.explanation}
                        </p>
                    </div>
                </div>
            ) : (
                <ApodSkeleton />
            )}
        </div>
    );
};

export default Apod;




// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import ApodSkeleton from "./ApodSkeleton";
// import { getApodData } from "../_apod-utils/getApodData";
// import { ApodData } from "../types/apodTypes";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


// const Apod: React.FC = () => {
//     const [apod, setApod] = useState<ApodData | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//     useEffect(() => {
//         fetchApod(); // Fetch today's APOD on load
//     }, []);

//     const fetchApod = async (date?: Date) => {
//         setApod(null); // Show loading state
//         setError(null); // Reset error

//         const { data, message } = await getApodData(date);
//         if (message) {
//             setError(message);
//         } else {
//             setApod(data);
//         }
//     };

//     const handleDateChange = (date: Date | null) => {
//         setSelectedDate(date);
//     };

//     const handleFetchForDate = () => {
//         if (selectedDate) {
//             const formattedDate = selectedDate.toISOString().split("T")[0];
//             fetchApod(formattedDate);
//         }
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-3xl text-center mt-4 mb-6">
//                 Astronomy Picture of the Day
//             </h1>

//             {/* Date Picker */}
//             <div className="flex justify-center mb-2 space-x-2">
//                 {/* <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={handleDateChange}
//                     className="bg-red-300 text-green-500 border-2 border-purple-500 rounded-lg px-3 py-2 focus:outline-none"
//                 /> */}

//                 <DatePicker
//                     showIcon
//                     selected={selectedDate}
//                     onChange={handleDateChange}
//                     className="bg-black text-purple-500 border-2 border-purple-500 rounded-lg px-3 py-2 w-[150px]"
//                     calendarClassName="bg-black border-2 border-purple-500 shadow-lg rounded-lg p-2"
//                 />

//                 <button
//                     className="bg-black text-white font-bold text-center w-[100px] border-purple-500 border-2 rounded-lg px-2 py-2 hover:bg-purple-700"
//                     onClick={handleFetchForDate}
//                 >
//                     Get Image
//                 </button>
//             </div>

//             {error && <p className="text-red-500 text-center">{error}</p>}

//             {apod ? (
//                 <div className="grid lg:grid-cols-2 lg:gap-4 p-8">
//                     {apod.media_type === "video" ? (
//                         <div className="relative h-[50vh] mb-4 lg:mb-0">
//                             <iframe
//                                 className="absolute top-0 left-0 w-full border-0 rounded-lg"
//                                 src={apod.url}
//                                 title={apod.title}
//                                 allowFullScreen
//                             />
//                         </div>
//                     ) : (
//                         <div className="flex items-center justify-center">
//                             <Image
//                                 className="w-full h-full object-contain rounded-lg"
//                                 src={apod.url}
//                                 alt={apod.title}
//                                 width={500}
//                                 height={500}
//                                 priority
//                             />
//                         </div>
//                     )}

//                     <div className="p-4 bg-black rounded-lg">
//                         <p className="text-primary">{apod.date}</p>
//                         <h2 className="text-2xl font-semibold text-gray-200">{apod.title}</h2>
//                         {apod.copyright && (
//                             <p className="text-sm text-gray-400">{`Credit: ${apod.copyright}`}</p>
//                         )}
//                         <p className="text-gray-300">{apod.explanation}</p>
//                     </div>
//                 </div>
//             ) : (
//                 <ApodSkeleton />
//             )}
//         </div>
//     );
// };

// export default Apod;





// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import ApodSkeleton from "./ApodSkeleton";
// import { getApodData } from "../_apod-utils/getApodData";
// import { ApodData } from "../types/apodTypes";


// const Apod: React.FC = () => {
//     const [apod, setApod] = useState<ApodData | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchApod = async () => {
//             const { data, message } = await getApodData();

//             if (!data) {
//                 setError(message);

//                 return;
//             }

//             setApod(data);
//         }

//         fetchApod();
//     }, []);

//     return (
//         <div className="">
//             <h1 className="text-3xl text-center mt-4 mb-6">
//                 Astronomy Picture of the Day
//             </h1>

//             {error && <p className="text-red-500">{error}</p>}

//             {apod ? (
//                 <div className="grid lg:grid-cols-2 lg:gap-4 p-8">
//                     {apod.media_type === "video" ? (
//                         <div className="relative h-[50vh] mb-4 lg:mb-0">
//                             <iframe
//                                 className="absolute top-0 left-0 w-full border-0 rounded-t-lg lg:rounded-lg"
//                                 src={apod.url || "/images/NASA-logo.svg"}
//                                 title={apod.title || "NASA APOD Video"}
//                                 width="560"
//                                 height="349"
//                                 allowFullScreen
//                             />
//                         </div>
//                     ) : (
//                         <div className="flex items-center justify-center rounded-lg mb-4 lg:mb-0">
//                             <Image
//                                 className="w-full h-full object-contain object-center rounded-lg"
//                                 src={apod.url || "/images/NASA-logo.svg"}
//                                 alt={apod.title || "NASA APOD Image"}
//                                 width={500}
//                                 height={500}
//                                 priority
//                             />
//                         </div>
//                     )}

//                     <div className="p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg">
//                         <p className="pt-2 text-primary lg:pt-0">{apod.date}</p>

//                         <h1 className="py-2 text-4xl font-medium text-gray-200 glow">
//                             {apod.title}
//                         </h1>

//                         {apod.copyright && (
//                             <h2 className="text-lg text-gray-400">
//                                 {`Credit: ${apod.copyright}`}
//                             </h2>
//                         )}
//                         <p className="pt-2 text-xl leading-relaxed text-gray-300">
//                             {apod.explanation}
//                         </p>
//                     </div>
//                 </div>
//             ) : (
//                 <ApodSkeleton />
//             )}
//         </div>
//     );
// }

// export default Apod;
