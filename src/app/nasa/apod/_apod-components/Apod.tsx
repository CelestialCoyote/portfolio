"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import ApodSkeleton from "./ApodSkeleton";
import { getApodData } from "../_apod-utils/getApodData";
import { ApodData } from "../types/apodTypes";
import CustomDatePicker from "../../_nasa-components/CustomDatePicker/CustomDatePicker";


const Apod: React.FC = () => {
    const [apod, setApod] = useState<ApodData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Optional minDate and maxDate (can be null)
    const minDate = new Date("1995-06-20");  // Replace or set to null for unrestricted dates
    const maxDate = new Date(); // Set to null for no max restriction

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
                    {showCalendar ? "Hide Calendar" : "Show Calendar" }
                    <FaRegCalendarDays className="text-purple-500 w-[20px] h-[20px]" />
                </button>

                {showCalendar && (
                    <div className="flex justify-center items-center mt-2 mb-2 space-x-2">
                        <div className="flex justify-center w-[225px]">
                            <CustomDatePicker
                                selectedDate={selectedDate}
                                onChange={handleDateChange}
                                minDate={minDate}
                                maxDate={maxDate}
                            />
                        </div>

                        <button
                            className="bg-black text-white font-bold text-center w-[100px] border-purple-500 border-2 rounded-[10px] px-2 py-2 hover:bg-purple-700"
                            onClick={handleFetchForDate}
                        >
                            Get Image
                        </button>
                    </div>
                )}
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
                        <p className="text-primary">{apod.date}</p>

                        <h2 className="text-2xl font-semibold text-gray-200">
                            {apod.title}
                        </h2>

                        {apod.copyright && (
                            <p className="text-sm text-gray-400">
                                {`Credit: ${apod.copyright}`}
                            </p>
                        )}

                        <p className="text-gray-300">{apod.explanation}</p>
                    </div>
                </div>
            ) : (
                <ApodSkeleton />
            )}
        </div>
    );
}

export default Apod;
